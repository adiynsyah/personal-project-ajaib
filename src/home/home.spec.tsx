import React from 'react';
import { shallow } from 'enzyme';
import HomeComponent from './home.component';

const setUpComp = () => {
  const wrapper = shallow(<HomeComponent/>);
  return wrapper;
};

describe('Home Component', () => {

  let component: any;
  beforeEach(() => {
    component = setUpComp();
  });

  it('should render without error', () => {
    const wrapper = component.find('.homeComponent');
    expect(wrapper.length).toBe(1);
  });

  it('should render home component must have table', () => {
    const wrapper = component.find(`[data-test='table']`);
    expect(wrapper.length).toBe(1);
  });

  it('should style order function when order column and type is same then must be return color correctly', () => {
    const classInstance = component.instance();
    classInstance.order.column = 'username';
    classInstance.order.type = 'asc';
    const result = classInstance.setStyleOrder('username', 'asc');

    expect(result).toEqual({color: "#0d6efd"});
  });

  it('should style order function when order column and type is not same then must be return object empty', () => {
    const classInstance = component.instance();
    classInstance.order.column = 'email';
    classInstance.order.type = 'desc';
    const result = classInstance.setStyleOrder('username', 'asc');

    expect(result).toEqual({});
  });
});


