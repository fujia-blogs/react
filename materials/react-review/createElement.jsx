export function createElement(type, config, children) {
  // propName 变量⽤于储存后⾯需要⽤到的元素属性
  let propName;
  // props 变量⽤于储存元素属性的键值对集合
  const props = {};
  // key、ref、self、source 均为 React 元素的属性，此处不必深究
  let key = null;
  let ref = null;
  let self = null;
  let source = null;
  // config 对象中存储的是元素的属性
  if (config != null) {
    // 进来之后做的第⼀件事，是依次对 ref、key、self和 source 属性赋值
    if (hasValidRef(config)) {
      ref = config.ref;
    } // 此处将 key 值字符串化
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // 接着就是要把 config ⾥⾯的属性都⼀个⼀个挪到 props 这个之前声明好的对象⾥⾯
    for (propName in config) {
      if (
        // 筛选出可以提进 props 对象⾥的属性
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }
  // childrenLength 指的是当前元素的⼦元素的个数，减去的 2 是type 和 config 两个参数占⽤的⻓度
  const childrenLength = arguments.length - 2;
  // 如果抛去type和config，就只剩下⼀个参数，⼀般意味着⽂本节点出现了
  if (childrenLength === 1) {
    // 直接把这个参数的值赋给props.children
    props.children = children;
    // 处理嵌套多个⼦元素的情况
  } else if (childrenLength > 1) {
    // 声明⼀个⼦元素数组
    const childArray = Array(childrenLength); // 把⼦元素推进数组⾥
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    } // 最后把这个数组赋值给props.children
    props.children = childArray;
  }
  // 处理 defaultProps
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  // 最后返回⼀个调⽤ReactElement执⾏⽅法，并传⼊刚才处理过的参数
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
}
