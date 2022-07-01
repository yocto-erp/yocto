import { render } from '@testing-library/react';

import YoTable from './yo-table';

describe('YoTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <YoTable
        columns={[]}
        fetchData={() => new Promise((res) => res({ rows: [], count: 1 }))}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
