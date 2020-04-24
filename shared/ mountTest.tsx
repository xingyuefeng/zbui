import React from 'react';
import { mount } from 'enzyme';

export default function mountTest(Component: React.ComponentType) {
  describe(`mount and unmount`, () => {
    // https://github.com/ant-design/ant-design/pull/18441
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = mount(<Component />);
      expect(() => {
        // 一种设置根组件的props并重新渲染的方法。当您想测试组件随时间变化的行为时，该功能很有用。
        // 例如，调用此方法将调用componentWillReceiveProps生命周期方法。
        wrapper.setProps({});
        // 一种卸载组件的方法。这可用于模拟经历卸载/装载生命周期的组件。
        wrapper.unmount();
        // 不要抛出报错
      }).not.toThrow();
    });
  });
}