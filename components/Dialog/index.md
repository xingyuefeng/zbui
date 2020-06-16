# Dialog 弹框


## 基本用法

```jsx
import { Dialog, Button } from 'zbui';



const Demo = () => {
   const [visible, toggleDialog] = React.useState(false);

  return  <div>
  
  
      <Button
        type="primary"
        onClick={() => {
          toggleDialog(true);
        }}
      >
        显示弹框
      </Button>
      <Dialog
        visible={visible}
        title="这是弹框标题"
        footer={
          <Button
            onClick={() => {
              toggleDialog(false);
            }}
          >
            关闭
          </Button>
        }
        onClose={() => {
          toggleDialog(false);
        }}
        // getContainer=
      >
        <div>你总觉着自己如今正是栖栖遑遑</div>
      </Dialog>
  </div>
}


ReactDOM.render(
  <>
   <Demo />
  </>
, mountNode);
```


## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| prefixCls | string | 'zb-dialog' | dialog节点类名元素前缀 |
| style | stObjectring | {} |  |
| visible | boolean | false | 是否显示 |
| title | String|React.Element |  | 标题 |
| footer | React.Element |  | 底部显示内容 |
| getContainer | function(): HTMLElement |  | 自定义Dialog显示节点 |
