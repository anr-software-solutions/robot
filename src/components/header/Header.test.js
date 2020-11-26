import React from 'react';
import {render} from '@testing-library/react';
import Header from './Header';

describe('<Header/>', () => {
  it('should render logo image', () => {
    const title = "header-logo";
    const {getByTitle} = render(<Header/>);

    expect(getByTitle(title)).toBeInTheDocument();
  });
});