(this["webpackJsonpzbui"] = this["webpackJsonpzbui"] || []).push([[16],{

/***/ "./components/Dialog/index.md":
/*!************************************!*\
  !*** ./components/Dialog/index.md ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# Dialog 弹框\n\n\n## 基本用法\n\n```jsx\nimport { Dialog, Button } from 'zbui';\n\n\n\nconst Demo = () => {\n   const [visible, toggleDialog] = React.useState(false);\n  return  <div>\n  \n  \n      <Button\n        type=\"primary\"\n        onClick={() => {\n          toggleDialog(true);\n        }}\n      >\n        显示弹框\n      </Button>\n      <Dialog\n        visible={visible}\n        title=\"这是弹框标题\"\n        footer={\n          <Button\n            onClick={() => {\n              toggleDialog(false);\n            }}\n          >\n            关闭\n          </Button>\n        }\n        onClose={() => {\n          toggleDialog(false);\n        }}\n      >\n        <div>你总觉着自己如今正是栖栖遑遑</div>\n      </Dialog>\n  </div>\n}\n\n\nReactDOM.render(\n  <>\n   <Demo />\n  </>\n, mountNode);\n```\n\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| :--- | :--- | :--- | :--- |\n| prefixCls | string | 'zb-dialog' | dialog节点类名元素前缀 |\n| style | stObjectring | {} |  |\n| visible | boolean | false | 是否显示 |\n| title | String|React.Element |  | 标题 |\n| footer | React.Element |  | 底部显示内容 |\n| getContainer | function(): HTMLElement |  | 自定义Dialog显示节点 |\n");

/***/ })

}]);
//# sourceMappingURL=16.chunk.js.map