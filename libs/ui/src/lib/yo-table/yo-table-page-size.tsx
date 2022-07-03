import React from "react";
import {
  LIST_PAGE_SIZE,
  useListActionContext,
  useListStateContext,
} from "./models/reducer";

export function YoTablePageSize() {
  const tableState = useListStateContext();
  const { onChangeSize } = useListActionContext();

  return (
    <div className="input-group input-group-sm w-auto me-2">
      <select
        name="pageSize"
        id="pageSize"
        className="form-select"
        onChange={(event) => {
          onChangeSize(Number(event.target.value));
        }}
        value={tableState.search.size}
      >
        {LIST_PAGE_SIZE.map((t) => (
          <option value={t} key={t}>
            {t}
          </option>
        ))}
      </select>
      <label className="input-group-text" htmlFor="pageSize">
        Page
      </label>
    </div>
  );
}

export default YoTablePageSize;
