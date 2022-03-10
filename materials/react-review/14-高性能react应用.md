# 性能

1. react 应用以组件的形式来组织逻辑，组件允许将 UI 拆分为独立可复用的代码片段并对每个片段进行独立构思。

## 常见的性能优化的方案

1. 使用 shouldComponentUpdate 规避冗余的更新逻辑

```jsx
shouldComponentUpdate(nextProps, nextState) {}

```

- 只要父组件发生了更新，所有的子组件都会无条件更新
- 同样的情况也适用于组件自身的更新：当组件自身调用了 setState 后，那么不管 setState 前后的状态内容是否真正发生了变化，它都会去走一遍更新流程。

**使用 shouldComponentUpdate 来调停不必要的更新，避免无意义的 re-render 发生，这是 React 组件中最基本的性能优化手段，也是最重要的手段。许多看似高级的玩法，都是基于 shouldComponentUpdate 衍生出来的。**

2. PureComponent + Immutable.js

PureComponent 与 Component 的区别点，就在于它内置了对 shouldComponentUpdate 的实现：PureComponent 将会在 shouldComponentUpdate 中对组件更新前后的 props 和 state 进行浅比较，并根据浅比较的结果，决定是否需要继续更新流程。

“浅比较”将针对值类型数据对比其值是否相等，而针对数组、对象等引用类型的数据则对比其引用是否相等。

在值类型数据这种场景下，PureComponent 可以说是战无不胜。但是如果数据类型为引用类型，那么这种基于浅比较的判断逻辑就会带来这样两个风险：

- 若数据内容没变，但是引用变了，那么浅比较仍然会认为“数据发生了变化”，进而触发一次不必要的更新，导致过度渲染；

- 若数据内容变了，但是引用没变，那么浅比较则会认为“数据没有发生变化”，进而阻断一次更新，导致不渲染。

**“不可变值”让“变化”无处遁形**

Immutable.js 是在 2014 年被 Facebook 团队推出，Facebook 给它的定位是“实现持久性数据结构的库”。所谓“持久性数据”，指的是这个数据只要被创建出来了，就不能被更改。我们对当前数据的任何修改动作，都会导致一个新的对象的返回。

3. React.memo 与 useMemo

- React.memo 是 React 导出的一个顶层函数，它本质上是一个高阶组件，负责对函数组件进行包装。
- React.memo 会帮我们“记住”函数组件的渲染结果，在组件前后两次 props 对比结果一致的情况下，它会直接复用最近一次渲染的结果。
- React.memo 接收两个参数，第一个参数是我们需要渲染的目标组件，第二个参数 areEqual 则用来承接 props 的对比逻辑。之前我们在 shouldComponentUpdate 里面做的事情，现在就可以放在 areEqual 里来做。

**shouldComponentUpdate 不同的是，React.memo 只负责对比 props，而不会去感知组件内部状态（state）的变化。**

### useMemo，更加“精细”的 memo

1. React.memo 可以实现类似于 shouldComponentUpdate 或者 PureComponent 的效果，对组件级别的 re-render 进行管控。

2. **React.memo 控制是否需要渲染一个组件，而 useMemo 控制的是否需要重复执行某一段逻辑**

3. 使用 useMemo，我们可以对函数组件的执行逻辑进行更加细粒度的管控（尤其是定向规避掉一些高开销的计算），同时也弥补了 React.memo 无法感知函数内部状态的遗憾，这对我们整体的性能提升是大有裨益的。
