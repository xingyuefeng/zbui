export default {
  documents: [
    {
      name: 'QuickStart',
      description: '快速上手',
      module: () => import('../README.md'),
    },
  ],
  components: {
    basicComponents: [
      {
        name: 'Button',
        description: '按钮',
        module: () => import('../components/Button/index.md'),
      },
      {
        name: 'Dialog',
        description: '弹出框',
        module: () => import('../components/Dialog/index.md'),
      },
    ]
  }

}