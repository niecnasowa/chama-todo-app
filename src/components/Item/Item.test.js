import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Item from './Item';

const mockUpdate = jest.fn();
const mockRemove = jest.fn();

jest.mock('react-redux-firebase', () => ({
  useFirebase: () => ({
    update: mockUpdate,
    remove: mockRemove,
  }),
}));

const testTodoItem = {
  id: '1',
  name: 'testName',
  completed: false,
  priority: 1,
  time: moment().format(),
};

const wrapper = shallow(<Item item={testTodoItem} />);

describe('Item', () => {
  it('should have all provided data', () => {
    expect(wrapper.find('.name').text()).toBe(testTodoItem.name);
    expect(wrapper.find('.priority').text()).toBe('P: 1');
    expect(wrapper.find('.time').text()).toBe('⏰ a few seconds ago');
  });

  it('Complete button', () => {
    expect(wrapper.find('.button').first().text()).toBe('Complete');

    expect(mockUpdate).not.toHaveBeenCalled();

    wrapper.find('.button').first().prop('onClick')();

    expect(mockUpdate).toHaveBeenCalledWith('todos/1', { completed: true });
  });

  it('Delete button', () => {
    expect(wrapper.find('.button').last().text()).toBe('Delete');

    expect(mockRemove).not.toHaveBeenCalled();

    wrapper.find('.button').last().prop('onClick')();

    expect(mockRemove).toHaveBeenCalledWith('todos/1');
  });
});
