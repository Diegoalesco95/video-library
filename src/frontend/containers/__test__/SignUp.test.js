import React from 'react';
import { create } from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProviderMock from '../../__mocks__/ProviderMock';
import SignUp from '../Signup';

configure({ adapter: new Adapter() });

describe('Header component', () => {
  test('Match Snapshot', () => {
    const signup = create(
      <ProviderMock>
        <SignUp />
      </ProviderMock>,
    );
    expect(signup.toJSON()).toMatchSnapshot();
  });

  it('Calls and executes preventDefault function onSubmit form', () => {
    const preventDefault = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <SignUp />
      </ProviderMock>,
    );
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
