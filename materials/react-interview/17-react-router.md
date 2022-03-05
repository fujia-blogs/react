# React Router

Q1：React Router 的基础实现原理？

Q2：React Router 的实现方式？

Q3：React Router 内部的模块有哪些？分别采取了什么模式进行设计并运行？又是如何完成协同工作的？

Q4：如果我当前在 A 页面编辑文字内容，不小心点击了返回，可能会退回 B 页面，那如何阻断这个过程呢？

## 实现原理

### 外部：基础原理

1. 前端在路由上经历了四次变化：

- 最初的路由管理权由后端完全控制，前端页面通过在模板中插入后端语言变量的方式完成开发。如：Java 的 JSP，这样的开发方式效率很低，在工作协同上，前后端相互严重依赖。
- 当 AJAX 技术兴起后，前端网页不再与后端页面直接耦合了，工程也得以分离。这个时代最明显的特征是多个 HTML 页面，并由 Nginx 等静态文件服务完成托管，这是第二次变化。
- 第三次变化，JavaScript 成为前端开发的主角，无论是 HTML、CSS 还是路由都通过 JavaScript 来控制。在这个阶段中，最具特征的技术栈是 AngularJS。

**前端并不能真正地去控制路由，比如请求 http://example.com/a 与 http://example.com/b，一定会返回两个页面，这就需要一种方案去模拟路由，所以 Hash 路由作为一个折中的解决方案登上了舞台。**

Hash 路由在实践上非常成功，使得开发者的注意力得以从前端的繁杂信息中进一步收敛。在现代前端工程中，你会发现大部分的代码都是由 JavaScript 独立完成的，这在最初是完全不可想象的。

- 随着浏览器对 HTML5 中 History pushState 的支持，前端路由迎来了第四次变化。这次我们终于可以不再写 #a 这样的路由了，而是回归到最初的写法——http://example.com/a。

2. 为什么 History pushState 可以办到呢？它分两部分进行。

第一部分在浏览器完成，HTML5 引入了 history.pushState() 和 history.replaceState() 两个函数，它们分别可以添加和修改历史记录条目。在浏览器侧的表现行为则是：

- pushState 修改当前浏览器地址栏中的网址路径；
- replaceState 则是替换网址路径。

使用 pushState 和 replaceState 时，浏览器并不会刷新当前页面，而仅仅修改网址，此时如果用户刷新页面才会重新拉取。

第二部分是在服务端的进行配置修改，被称为 historyApiFallback。如果你了解过 webpack 的配置，那么一定看见过 historyApiFallback，它的作用就是将所有 404 请求响应到 index.html。那么同理需要在 Nginx 或者 Node 层去配置 historyApiFallback，同样是将 404 请求响应到 index.html 就可以了。至此，前端路由才算完全完成。

### 内部：实践方案

1. React Router 提供了三个库，分别是 react-router、react-router-dom 及 react-router-native，react-router 是没有 UI 层的：

- react-router-dom = react-router + Dom UI
- react-router-native = react-router + native UI

**DOM 版本与 Native 版本最大限度地复用了同一个底层路由逻辑。**

2. 真正的路由处理角色其实是 history 库：

- 在 React Router 中路由通过抽象 history 库统一管理完成，history 库支持 BrowserHistory 与 MemoryHistory 两种类型。
- BrowserHistory 实际上调用的就是浏览器的 History API，也就是基础原理的部分。
- 为什么还有 MemoryHistory 呢？ React Native 并不是运行在浏览器环境中，所以需要在内存中构建一个自己的版本，原理上就是一个数组。

## 工作方式

### 整体：设计模式

1. Monorepo 的设计

- 与 Monorepo 相对的概念是 Multirepo。Multirepo 就是我们常用的开发模式，一个仓库对应一个工程，子团队自行维护。

2. 使用 Context API 完成数据共享。

### 局部：关键模块

1. 如何梳理关键模块呢？

## 要点

1. 实现原理 - 由外到内去探索，每个库的根本原理是立足于自身生态以外的。

- 跳出 react 生态去寻求答案，只有掌握根本原理后，才能回到 react router 内部，去梳理它的实践方案。

2. 工作方式 - 从**整体到局部**，从宏观视角挖掘 react router 的架构设计模式。

3. 抓大放小，抓主要放次要。

4. 生僻冷门的知识点在面试中就算考倒了应聘者也没有什么意义。面试是为了甄别应聘者的技能熟练度，所以只要抓住常用内容就好了。

5. **梳理**可以理解为是一种通过结构化展示认知的方式，可以：

- 从整体到局部；
- 从宏观到微观；
- 从外到内。

6. 在做「梳理」时，如果没有很好的思路，那就**分类**，分类是永远不过时的梳理技巧。
