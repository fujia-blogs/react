# setState

## 异步的动机和原理 - 批量更新的艺术

1. 批量更新

在实际的 React 运行时中，setState 异步的实现方式有点类似于 Vue 的 $nextTick 和浏览器里的 Event-Loop：每来一个 setState，就把它塞进一个队列里“攒起来”。等时机成熟，再把“攒起来”的 state 结果做合并，最后只针对最新的 state 值走一次更新流程。这个过程，叫作“批量更新”

2. setTimeOut 下的 setState

setTimeout 帮助 setState “逃脱”了 React 对它的管控。只要是在 React 管控下的 setState，一定是异步的。

setTimeout 的逻辑是异步执行的

## 要点

1. setState 是异步的一个重要的动机 - 避免频繁地 re-render

2. 在 React15 中，setState 的表现会因调用场景的不同而不同：

- 在钩子函数和合成事件中，他表现为**异步**
- 在 setTimeout, setInterval 以及 DOM 原生事件中，它都表现为**同步**

3. react 16 中，整个 react 核心算法被重写，setState 也不可避免地被“Fiber 化”。
