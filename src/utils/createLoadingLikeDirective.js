import { createApp } from "vue"
import { addClass, removeClass } from '@/utils/dom'
const relativeCls = 'g-relative'
const createLoadingLikeDirectives = (Comp) => {
    const name = Comp.name
    const directive = {
        mounted(el, binding) {
            const app = createApp(Comp)
            const instance = app.mount(document.createElement('div'))
            const title = binding.arg



            if (!el[name]) {
                el[name] = {}
            }
            el[name].instance = instance
                // console.log('title1', name)
            if (typeof title !== 'undefined') {
                el[name].instance.setTitle(title)
            }

            if (binding.value) {
                append(el)
            }
        },
        updated(el, binding) {
            // const name = comp.name
            const title = binding.arg
            if (!el[name]) {
                el[name] = {}
            }
            // console.log('title2', title)
            if (typeof title !== 'undefined') {
                el[name].instance.setTitle(title)
            }
            if (binding.value !== binding.oldValue) {
                binding.value ? append(el) : remove(el)
            }
        }
    }

    function append(el) {
        const style = getComputedStyle(el)
        if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
            addClass(el, relativeCls)
        }
        el.appendChild(el[name].instance.$el)
    }

    function remove(el) {
        removeClass(el, relativeCls)
        el.removeChild(el[name].instance.$el)
    }
    return directive
}

export default createLoadingLikeDirectives

// 这段代码定义了一个工具函数，用于创建一个 Vue 自定义指令，以便能够控制一个给定的组件（例如加载指示器）的挂载、更新和移除。下面我将分析这个工具函数的主要部分。

// 引入依赖：从 Vue 和本地的 dom 文件中引入了必要的函数。

// 定义样式类：定义了一个样式类 relativeCls，可能用于调整元素的定位。

// 创建指令工厂函数：createLoadingLikeDirectives 函数接收一个组件 Comp 并返回一个自定义指令对象。这个自定义指令对象包括 mounted 和 updated 钩子。

// mounted 钩子：当元素被挂载到 DOM 时调用。在这里，它创建并挂载了组件实例，并且可以通过指令的参数设置组件的标题。如果绑定值为真，则调用 append 函数将组件添加到元素中。

// updated 钩子：当元素更新时调用。这里它会检查标题参数和绑定值的变化，并据此更新组件的标题或将组件添加/移除。

// 定义辅助函数：

// append：添加组件到元素，并且可能会添加定位的样式类。
// remove：从元素中移除组件，并移除相应的样式类。
// 返回指令对象：返回定义的指令对象，可以用于在 Vue 应用中注册。

// 缺少类型检查和错误处理：代码中没有明确的类型检查或错误处理，所以在实际使用中可能需要小心处理异常情况。

// 总的来说，这个工具函数允许你用一种声明式的方式将组件（如加载指示器）动态添加和移除到元素中，并能够根据指令的参数和绑定值进行更新。这对于根据应用状态在页面上显示或隐藏一些元素非常有用。




// User
// 可以再说细一点吗，comp el binding分别是
// ChatGPT
// 当然，让我们更深入地探讨一下 Comp, el, 和 binding 的细节。

// Comp（组件）：

// Comp 是传递给 createLoadingLikeDirectives 函数的 Vue 组件对象。
// const name = Comp.name 取得组件的名称，并在整个指令对象中用作键，来存储和检索与特定元素关联的组件实例。
// 这个组件被用于在 mounted 钩子中创建和挂载一个新的 Vue 应用实例，并在 el 元素中动态显示或隐藏。
// el（元素）：

// el 是自定义指令钩子函数的第一个参数，代表与该指令关联的 DOM 元素。
// el[name] 用于存储与该元素关联的组件实例和其他信息。
// 在 append 和 remove 函数中，el 用于添加或移除组件的 DOM 节点，并可能更改元素的类。
// binding（绑定对象）：

// binding 是自定义指令钩子函数的第二个参数，包含与该指令的绑定相关的信息。
// binding.arg 可能包含传递给指令的参数，例如标题。在代码中，它被用来设置组件的标题。
// binding.value 是指令的绑定值。在这个情况下，它似乎是一个布尔值，用于控制组件是否应该被添加到元素。
// binding.oldValue 存储了绑定值的先前值。通过比较 binding.value 和 binding.oldValue，指令可以检测绑定值何时发生变化，并据此添加或移除组件。
// 这个自定义指令提供了一种灵活的方式来控制组件的动态显示和隐藏，允许你根据与指令绑定的值和参数来更改组件的内容和可见性。通过将这个逻辑封装在自定义指令中，可以使组件的这部分行为更加模块化和可重用。




// User
// const instance = app.mount(document.createElement('div'))这句的作用是什么
// ChatGPT
// 这一行代码在自定义指令的 mounted 钩子内，它的作用是创建一个新的 Vue 应用实例并挂载到一个新创建的 div 元素上。我们可以逐步拆解来更好地理解它的作用：

// document.createElement('div')：此部分通过 DOM API 创建了一个新的 div 元素。这个元素还没有被插入到页面的主 DOM 树中，它只是在内存中创建。

// createApp(Comp)：这部分使用 Vue 的 createApp 方法，使用传入的组件 Comp 创建了一个新的 Vue 应用实例。这个应用实例还没有被挂载，所以它也没有对应的 DOM。

// app.mount(document.createElement('div'))：通过调用 mount 方法，并将新创建的 div 元素作为参数传入，Vue 应用被挂载到这个 div 元素上。这意味着 Vue 将会渲染 Comp 组件，并将渲染结果插入到这个 div 元素中。

// const instance = ...：最后，挂载的应用实例被赋值给 instance 常量。这个实例可以用于以后的引用和操作，例如在后续的代码中通过 el[name].instance = instance 存储在元素的属性中。

// 总的来说，这一行代码的作用是创建并挂载了一个新的 Vue 应用实例，并将其关联的组件渲染到一个新创建的 div 元素中。这个 div 元素在这一时刻还没有被添加到页面的主 DOM 树中，它将在后续的 append 函数中被插入。这使得自定义指令能够动态控制组件的显示和隐藏，以及其他可能的行为。