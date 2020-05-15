# 记录组件开发补充知识

## event.taregt跟event.currentTaget区别

[event.target 和 event.currentTarget 的区别](https://www.cnblogs.com/yzhihao/p/9398917.html)

- event.target指向引起触发事件的元素
- 为event.currentTaget指向事件绑定的元素

## [常用ts泛型](https://blog.csdn.net/weixin_43902189/article/details/99706223)

### MutableRefObject泛型接口，接收一个参数，作为useRef的类型定义,参数可以为T类型，即任意类型

```js

const prctureRef: React.MutableRefObject<any> = useRef();

```

### 合成事件包装器SyntheticEvent


`SyntheticEvent<T = Element, E = Event>`泛型接口,即原生事件的集合，就是原生事件的组合体

您的事件处理程序将传递 SyntheticEvent 的实例，这是一个跨浏览器原生事件包装器。(官方介绍)


```js
  <button onClick={(e:SyntheticEvent<Element, Event>)=>{

  }}></button>
  <input onChange={(e:SyntheticEvent<Element, Event>)=>{
  }}/>
  <form
      onSubmit={(e: SyntheticEvent<Element, Event>) => {

      }}
      onBlur={(e: SyntheticEvent<Element, Event>) => {

      }}
      onKeyUp={(e: SyntheticEvent<Element, Event>) => {

      }}
  >
  </form>
```

