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