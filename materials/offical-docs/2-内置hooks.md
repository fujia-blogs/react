# 内置 hooks

## useState

1. 返回一个 state，以及更新 state 的函数。

2. React 会确保 setState 函数的标识是稳定的，并且不会在组件重新渲染时发生变化。这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 setState。

3. 函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，可以将函数传递给"setState"。

**如果你的更新函数返回值与当前 state 完全相同，则随后的重渲染会被完全跳过。**

4. useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

5. useReducer 是另一种可选方案，**更合适用于管理包含多个子值的 state 对象。**

6. 惰性初始 state

**initialState 参数只会在组件的初始渲染过程中起作用，后续渲染会被忽略。**

如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

```jsx
const [state, setState] = useState(() => {
  const value = expensiveComputation(props);

  return value;
});
```

## useEffect

1. 使用 useEffect 完成副作用操作。

2. 赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。

可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。

3. 为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除。

4. 执行时机

- 传给 useEffect 的函数会在浏览器完成布局与绘制之后，在一个延迟事件中被调用。

- 绝大多数操作不应阻塞浏览器对屏幕的更新。

- 并非所有 effect 都可以被延迟执行。例如，一个对用户可见的 DOM 变更就必须在浏览器执行下一次绘制前被同步执行，这样用户才不会感觉到视觉上的不一致。

- 与 useLayoutEffect 的结构相同，**区别是调用时机不同。**
- 即使在 useEffect 被推迟到浏览器绘制之后的情况下，它也能保证在任何新的渲染前启动。React 在开始新的更新前，总会先刷新之前的渲染的 effect。

5. **请记住，react 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得处理额外操作很方便。**

6. 建议启用 eslint-plugin-react-hooks 中的 exhaustive-deps 规则。

## useContext

1. 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 \<MyContext.Provider> 的 value prop 决定。

2. **useContext 的参数必须是 context 对象本身。**

3. 调用了 useContext 的组件总会在 context 值变化时重新渲染。

## useReducer

1. 语法：

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

2. 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。

3. 惰性初始化

将 init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)。

## useCallback

1. 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

2. useCallback(fn, deps)相当于 useMemo(() => fn, deps)

## useMemo

1. 语法

```jsx
const memoizedValue = useMemo(() => expensiveValue(a, b), [a, b]);
```

返回一个 memoized 值。

2. 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

- **记住，传入 useMemo 的函数会在渲染期间执行。**
- **不要在该函数内部执行与渲染无关的操作。**
- 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
- 可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。

## useRef

1. useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。

- useRef 会在每次渲染时返回同一个 ref 对象；
- **请记住，当 ref 对象内部发生变化时，useRef 不会通知你。变更 .current 属性不会引发组件重新渲染。**

2. 需要在 react 绑定或解绑 DOM 节点的 ref 时运行某些代码

## useImperativeHandle

1. useImperativeHandle 可以让在使用 ref 时自定义暴露给父组件的实例值。

- **大多数情况下，应该避免使用 ref 这样的命令式代码。**

2. useImperativeHandle 应当与 forwardRef 一起使用。

## useLayoutEffect

1. 函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。

2. 可以使用它来读取 DOM 布局并同步触发重渲染。

3. 在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将同步刷新。

4. 尽可能使用标准的 useEffect 以避免阻塞视觉更新。

### 最佳实践

1. 建议一开始使用 useEffect，只有当有问题时再尝试使用 useLayoutEffect.

2. 如果你使用服务端渲染，请记住，无论 useLayoutEffect 还是 useEffect 都无法在 Javascript 代码加载完成之前执行。

## useDebugValue

1. 语法：

```jsx
useDebugValue(value);
```

2. useDebugValue 可用于在 react 开发者工具中显示自定义 hook 的标签。

3. 不推荐你向每个自定义 Hook 添加 debug 值。当它作为共享库的一部分时才最有价值。

## useDeferredValue

1. 语法：

```jsx
const [deferredValue] = useDeferredValue(value);
```

## useTransition

## useId

## useSyncExternalStore

## useInsertionEffect

## 其它

1. Object.is - 方法判断两个值是否为同一个值

- 都是 undefined
- 都是 null
- 都是 true 或 false
- 都是相同长度的字符串且相同字符按相同顺序排列
- 都是相同对象（意味着每个对象有同一个引用）
- 都是数字且
  - 都是 +0
  - 都是 -0
  - 都是 NaN
  - 或都是非零而且非 NaN 且为同一个值

**与"=="运算不同，Object.is 不会强制转换两边的值。**

**与"==="运算也不相同，"==="运算符将-0 和+0 视为相等，将 Number.NaN 与 NaN 视为不相等**

examples:

```js
let n1 = +0;
let n2 = -0;

n1 === n2; // true

Object.is(n1, n2); // false

typeof Number.NaN; // 'number'
typeof NaN; // 'number'

Number.NaN === NaN; // false

NaN === NaN; // false
Number.NaN === Number.NaN; // false

Object.is(Number.NaN, Number.NaN); // true

Object.is(NaN, NaN); // true

Object.is(Number.NaN, NaN); // true
```

polyfill:

```js
if (!Object.is) {
  Object.is = function (x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };
}
```

3. NaN（Not-A-Number）

Number.NaN: 是一个静态属性。

NaN: 全局属性 NaN 的值表示不是一个数字（Not-A-Number）。

判断一个值是否是 NaN:

必须使用 Number.isNaN() 或 isNaN() 函数。在执行自比较之中：也只有 NaN 不等于它自己。

```js
function valueIsNaN(v) {
  return v !== v;
}
```

请注意 isNaN() 和 Number.isNaN() 之间的区别：如果当前值是 NaN，或者将其强制转换为数字后将是 NaN，则前者将返回 true。而后者仅当值当前为 NaN 时才为 true：

```js
isNaN('hello world'); // true
Number.isNaN('hello world'); // false
```

4. 如何判断一个数字的值为 -0 还是 +0 呢？

```js
function isNegativeZero(num) {
  return num === 0 && 1 / num < 0; // 1与+0的商为Infinite，1与-0的商为-Infinite
}
```
