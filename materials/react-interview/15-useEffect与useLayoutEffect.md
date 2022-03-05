# useEffect & useLayoutEffect

Q1：useEffect 与 useLayoutEffect 区别在那里？

思路：

- useEffect 与 useLayoutEffect 的共性，被用于解决什么问题
- 区分各自的使用场景，设计原理与未来趋势。

Q2：useEffect 与 useLayoutEffect 内部都调用的同一个函数，为什么会有这样的区别呢？

## 基础

1. useEffect 与 useLayoutEffect 的函数签名相同

- **在源码上，它们的调用是相同的。**

从代码角度而言，虽然是两个函数，但使用方式是完全一致的，甚至一定程度上可以相互替换。

2. 什么是函数签名(Signature)？

MDN - https://developer.mozilla.org/zh-CN/docs/Glossary/Signature/Function

3. 运行效果

useEffect 与 useLayoutEffect 都是用于处理副作用，副作用包括：改变 DOM，设置订阅，操作定时器等。

4. 官方使用建议：

- 如果不能掌握 useLayoutEffect，不妨直接使用 useEffect
- 使用 useEffect 时遇到问题，再尝试使用 useLayoutEffect。

5. 社区中的最佳实践是：大多数场景下可直接使用 useEffect，但代码引起页面闪烁就推荐使用 useLayoutEffect 处理。

- 直接操作 DOM 或 DOM 样式更新的场景更推荐使用 useLayoutEffect.

### 使用场景

## 要点

1. 描述区别，就是求同存异的过程。
