# React Router

1. react-router 最核心也是最基本的能力 - 路由的跳转。

## 问答

Q1： react-router 是如何实现路由跳转的？

3 个核心的角色：

- 路由器，如：BrowserRouter, HashRouter，根据 Route 定义出来的映射关系，为新的路径匹配它对应的逻辑。
- 路由，如：Route, Switch，负责定义路径与组件之间的映射关系
- 导航，如：Link, NavLink, Redirect，负责触发路径的改变。

2. **路由器**负责感知路由的变化并作出反应，它是整个路由系统中最为重要的一环。

Q2：BrowserRouter 和 HashRouter 的区别？

- BrowserRouter 是使用 HTML5 的 history API 来控制路由跳转的。
- HashRouter 是通过 URL 的 hash 属性来控制跳转的。

Q3：为什么需要前端路由？

前端路由可以帮助我们在仅有⼀个⻚⾯的情况下，“记住”⽤户当前⾛到了哪⼀步⸺为 SPA 中的各个视图匹配⼀个唯⼀标识。

Q4：SPA 对于服务端来说，就是一个 URL，一套资源，那么如何做到用“不同的 URL”来映射不同的视图内容呢？

解决思路：

- 拦截⽤户的刷新操作，避免服务端盲⽬响应、返回不符合预期的资源内容，把刷新这个动作完全放到前端逻辑⾥消化掉；
- 感知 URL 变化。

## 前端路由的实践 - hash 和 history

### hash 模式

1. 通过改变 URL 后面以“#”分隔的字符串，从而让页面感知到路由变化的一种实现方式。

```js
// hash改变
window.location.hash = 'index';

// hash改变感知
window.addEventListener('hashchange', function (event) {}, false);
```

2. hash 与 history

```js
window.addEventListener('popstate', function (event) {}, false);
```

- go，forward，back 等方法的调用确实会触发 popstate，但是 pushState 和 replaceState 不会。
