export function addClass(el, className) {
    if (!el.classList.contains(className)) {
        el.classList.add(className)
    }
}
export function removeClass(el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className)
    }
}