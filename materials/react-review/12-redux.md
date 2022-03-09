# redux：设计思想和工作原理

## 问题背景

Q1：双向数据流的问题？

## 架构思想

1. redux 是 flux 的一种实现形式

2. Flux 并不是⼀个具体的框架，它是⼀套由 Facebook 技术团队提出的应⽤架构，这套架构约束的是应⽤处理数据的模式。在 Flux 架构中，⼀个应⽤将被拆分为以下 4 个部分：

- view - 用户界面
- action - 可以理解为视图层发出的“消息”，它会触发应⽤状态的改变。
- dispatcher - 派发器，它负责对 action 进⾏分发。
- store - 数据层，它是存储应⽤状态的“仓库”，此外还会定义修改状态的逻辑。store 的变化最终会映射到 view 层上去。

3. flux 最核心的地方在于**严格的单向数据流**，在单向数据流下，状态的变化是可预测的。

## redux 是如何工作的？

1. createStore 方法是使用 redux 时最先调用的方法，它是整个流程的入口，**也是 redux 中最核心的 API。**

```ts
import { createStore } from 'redux';

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(mid1, mid2, ...)
)
```

### redux 工作流的核心：dispatch 动作

1. dispatch 把 action、reducer 和 store 串联起来。

2. dispatch 执行流程：

- 调用 dispatch，入参为 action 对象
- 前置校验
- 上锁 - 将 isDispatching = true
- 调用 reducer，计算新的 state
- 解锁 - 将 isDispatching = false
- 触发订阅
- 返回 action

`用 isDispatching 将 dispatch 的过程锁起来，目的是规避“套娃式”的 dispatch。更准确地说，是为了避免开发者在 reducer 中手动调用 dispatch。`

## 中间件

Q1：中间件的引入，会为 redux 工作流带来什么样的改变呢？

Q2：redux 中间件如何与 redux 主流程结合？

- action
- mid1, mid2, ...
- dispatch
- reducer
- nextState

1. 中间件的**执行时机**，即 action 被分发之后，reducer 触发之前。

2. 中间件的**执行前提**，即 applyMiddleware 将会对 dispatch 函数进行改写，使得 dispatch 在触发 reducer 之前，会首先执行对 redux 中间件的链式调用。

### 中间件与面向切面编程

Q1：为什么中间件可以流行？

Q2：为什么我们的应用需要中间件呢？

1. AOP(面向切片)的存在恰恰是为了解决 OOP 的局限性。

2. 们常说的“⽇志追溯”。这个需求的通⽤性很强、业务属性很弱，因此不适合与任何的业务逻辑耦合在⼀起。那我们就可以以 “切⾯”这种形式，把它与业务逻辑剥离开来：扩展功能在⼯作流中的执⾏节点，可以视为⼀个单独“切点”；我们把扩展功能的逻辑放到这个“切点”上来，形成的就是⼀个可以拦截前序逻辑的“切⾯”

## 要点

1. 何谓“系统”的学习？

系统的一个前提是**建立必要的学习上下文**，尝试理解事情的来龙去脉。

2. AOP 是一种典型的“非侵入式”的逻辑扩充思路。

日常开发中的应用：

- 异步⼯作流处理
- ⽇志追溯
- 性能打点

这类和业务逻辑关系不⼤的功能，我们都可以考虑把它们抽到“切⾯”中去做。

3. ⾯向切⾯思想在很⼤程度上提升了我们组织逻辑的灵活度与⼲净度，帮助我们规避掉了逻辑冗余、逻辑耦合这类问题。通过将“切⾯”与业务逻辑剥离，开发者能够专注于业务逻辑的开发，并通过“即插即⽤”的⽅式⾃由地组织⾃⼰想要的扩展功能。
