import { stringify } from 'qs';
import forIn from 'lodash/forIn';
import { get, STORAGE } from '../utils/storage';
import { isFunc } from '../utils/util';
import { SearchRequest } from './api.types';
import { ApiError } from './api-error';

// eslint-disable-next-line no-unused-vars
const SYSTEM_ERROR = 1;
const API_ERROR = 2;

type URL_TYPE = string | (() => string);
type ID_TYPE = string | number | (() => string);

function logError(error: ApiError) {
  // eslint-disable-next-line no-console
  console.error('Looks like there was a problem: \n', error.getMessage());

  throw error;
}

/**
 * Error: {name, code, message}
 * @param response
 * @returns {{ok}|*}
 */
async function validateResponse(response: Response) {
  if (!response.ok) {
    let errors = [];
    let type = API_ERROR;
    switch (response.status) {
      case 400:
        errors = await response.json();
        break;
      case 401:
        // window.location.reload();
        break;
      case 403:
        errors = [
          {
            name: 'path',
            code: 'ACCESS_DENIED',
            message: 'You have no right to access.',
          },
        ];
        break;
      default:
        type = SYSTEM_ERROR;
        errors = [
          {
            name: 'path',
            code: 'INTERNAL_ERROR',
            message: response.statusText,
          },
        ];
        break;
    }
    if (errors.length) {
      throw new ApiError(response.statusText, errors, type);
    } else {
      throw Error(response.statusText);
    }
  }
  return response;
}

function readResponseAsJSON(response: Response) {
  return response.json();
}

async function getAuthHeader(contentType = 'application/json') {
  const token = await get(STORAGE.JWT);
  return {
    Authorization: `Bearer ${encodeURIComponent(token || '')}`,
    'Content-Type': contentType,
    Accept: 'application/json',
  };
}

async function getFormDataAuthHeader() {
  const token = await get(STORAGE.JWT);
  return {
    Authorization: `Bearer ${encodeURIComponent(token || '')}`,
    Accept: 'application/json',
  };
}

export async function fetchWithAuth(pathToResource: string) {
  return fetch(pathToResource, { headers: await getAuthHeader() });
}

export async function fetchJSON(pathToResource: string) {
  return fetch(pathToResource, { headers: await getAuthHeader() })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError);
}

export async function postJSON<T>(pathToResource: string, body: T) {
  return fetch(pathToResource, {
    method: 'POST',
    headers: await getAuthHeader(),
    body: JSON.stringify(body),
  })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError);
}

export async function postFormData(pathToResource: never, body: never) {
  return fetch(pathToResource, {
    method: 'POST',
    headers: await getFormDataAuthHeader(),
    body,
  })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError);
}

export async function deleteRequest(pathToResource: string) {
  return fetch(pathToResource, {
    method: 'DELETE',
    headers: await getAuthHeader(),
  })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError);
}

export function createSearchApi<T>(url: string | (() => string)) {
  /**
   * Search query include page,size,filter
   * @param params: {
   *   page: number,
   *   size: number,
   *   sorts: [],
   *   filter:{
   *     search: '',
   *     id: number,
   *     ...
   *   }
   * }
   */
  return (params: SearchRequest<T>) => {
    const { page, size, sorts, filter } = params || {
      page: 1,
      size: 10,
      sorts: [],
      filter: {},
    };
    const mapSorts: string[][] = [];
    if (sorts) {
      forIn(sorts, function mapItem(val, key) {
        if (val && val.length && key && key.length) {
          mapSorts.push([`${key}:${val}`]);
        }
      });
    }

    const body = {
      page,
      size,
      sorts: mapSorts,
      ...filter,
    };
    return fetchJSON(
      `${isFunc(url) ? url() : url}?${stringify(body, {
        arrayFormat: 'repeat',
      })}`
    );
  };
}

export function createCRUDApi(url: URL_TYPE) {
  const create = (form: never) => postJSON(`${url}`, form);
  const search = createSearchApi(url);
  const read = (id: ID_TYPE) => fetchJSON(`${url}/${id}`);
  const update = (id: ID_TYPE, form: never) => postJSON(`${url}/${id}`, form);
  const remove = (id: ID_TYPE) => deleteRequest(`${url}/${id}`);
  return {
    search,
    create,
    read,
    update,
    remove,
  };
}

export const download = (url: string, name: string) =>
  fetchWithAuth(url)
    .then((response) => response.blob())
    .then((blob) => {
      const objectUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = name;
      anchor.click();

      window.URL.revokeObjectURL(objectUrl);
      return objectUrl;
    });
