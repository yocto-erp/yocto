import { API_URL } from '../constants';

const URL = `${API_URL}/image`;

export const imageUrl = (fileId: string) => `${URL}/${fileId}`;
