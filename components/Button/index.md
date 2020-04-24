# Button 按钮


## 基本用法

```jsx
import { Button } from 'zbui';

ReactDOM.render(
  <>
    <Button>default</Button>
    <Button type="primary">primary</Button>
  </>
, mountNode);
```

## 尺寸

```jsx
import { Button } from 'zbui';

ReactDOM.render(
  <>
    <Button size="lg">default</Button>
    <Button size="small">primary</Button>
  </>
, mountNode);
```


## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'default' | 设置主题，可选值为 `default`、`primary`、`danger` |
| size | string | 'md' | 设置大小，可选值为 `md`、`lg`、`sm`、`xs` |
| shape | string | 'radius' | 设置形状，可选值为 `rect`、`radius`、`round`、`circle` |
| block | boolean | false | 是否块级元素 |
| ghost | boolean | false | 是否幽灵按钮 |
| shadow | boolean | false | 是否带阴影 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否加载中状态 |
| icon | ReactNode | - | 设置图标 |
| onClick | MouseEventHandler&lt;HTMLAnchorElement&gt; \| MouseEventHandler&lt;HTMLButtonElement&gt; | - | 点击后触发的回调函数 | 
| htmlType | string | 'button' | 设置`button`原生的`type`值，可选值为 `button`、`submit`、`reset` |
| href | string | - | 点击跳转的地址，指定此属性`button`的行为和`a`链接一致 |
| target | string | - | 相当于 a 链接的 target 属性，href 存在时生效 |

