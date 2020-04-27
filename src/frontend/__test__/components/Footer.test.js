import React from 'react';
import { create } from 'react-test-renderer';
import { render, shallow } from 'enzyme';
import Footer from '../../components/Footer';

describe('Footer testing', () => {
  test('Match Snapshot', () => {
    const footer = create(<Footer />);
    expect(footer.toJSON()).toMatchSnapshot();
  });

  test('Footer have class .footer', () => {
    const footer = shallow(<Footer />);
    const footerElem = footer.find('footer');
    expect(footerElem.hasClass('footer')).toBe(true);
  });
  test('Footer haver 3 anchor tags', () => {
    const footer = render(<Footer />);
    expect(footer.find('a')).toHaveLength(3);
  });
});
