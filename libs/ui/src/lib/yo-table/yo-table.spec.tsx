import { render } from '@testing-library/react';

import YoTable from './yo-table';

describe('YoTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<YoTable />);
    expect(baseElement).toBeTruthy();
  });
});
