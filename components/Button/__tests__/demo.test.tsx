import React from 'react';
import { mount, render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '..'
import { ButtonSize, ButtonType }  from '../button'

describe('Button', () => {
it('render correctly', () => {
    const wrapper = render(<Button>hello</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('warns if size is wrong', () => {
  //   //使用jest.fn()对方法进行mock
  //   const mockWarn = jest.fn();
  //   //使用jest.spyOn()模拟跟踪某个类的方法的调用
  //   jest.spyOn(console, 'warn').mockImplementation(mockWarn);
  //   const size = ('who am I' as any) as ButtonSize;
  //   render(<Button size={size} />);
  //   expect(mockWarn).toHaveBeenCalledTimes(1);
  //   // 第一次调用时的第一个参数是0
  //   expect(mockWarn.mock.calls[0][0]).toMatchObject({
  //     message: 'unreachable case: "who am I"',
  //   });
  // });
it('should support link button', () => {
    const wrapper = mount(
      <Button target="_blank" href="http://1.com" type="link">
        link button
      </Button>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

it('disabled', () => {
    const wrapper = render(<Button disabled>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

it('onClick', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick}>foo</Button>);
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
it('onClick when disabled', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button disabled={true} onClick={onClick}>foo1</Button>);
    wrapper.simulate('click');
    expect(onClick).not.toHaveBeenCalled()
  })
})



