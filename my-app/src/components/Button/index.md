# Button 按钮


## 基本用法

```jsx
import { Button } from 'zbui';

ReactDOM.render(
  <>
    <Button>default</Button>
    <Button type="primary">primary</Button>
     <Button type="danger">danger</Button>
     <Button type="link">link</Button>
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
| type | string | 'default' | 设置主题，可选值为 `default`、`primary`、`danger`、 `link` |
| size | string | -' | 设置大小，可选值为 `lg`、`sm` |
| disabled | boolean | false | 是否禁用 |
支持原生button其他属性