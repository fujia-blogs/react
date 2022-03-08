# JSX

Q1：jsx 本质是什么？与 JS 的关系？

jsx 是 JavaScript 的一种语法扩展，与模板语言语法类似，但它充分具备 JavaScript 的能力。

Q2：为什么要用 jsx？

jsx 语法糖允许前端使用熟悉的 HTML 标签语法来创建虚拟 DOM，实现：

- 降低学习成本
- 提升研发效率和研发体验

Q3：jsx 背后的功能模块有哪些？作用是什么？

Q4：jsx 语法是如何在 JavaScript 中生效的？

- jsx 被编译为 React.createElement()，且返回一个“React Element”的 JS 对象。

Q5：为什么 React 不直接引导用户使用 React.createElement 来创建元素？

## 基础

1. createElement 流程：

- React.createElement
- 二次处理 key, ref, self, source 四个属性值
- 遍历 config，筛出可以提进 props 的属性
- 提取子元素，推入 childArray 数组(即 props.children)
- 格式化 defaultProps
- 调用 ReactElement

2. jsx 到真实 DOM 的流程：

- JSX
- babel - 编译
- createElement()
- VDom - 传入 render
- React.DOM.render() - 渲染处理
- 真实 DOM
