import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import SignUp from '../../containers/Signup';

describe('SignUp Container', () => {
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
