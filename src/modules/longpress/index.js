/**
 * 长按过程描述
 * 当 touchstart 时，开始计时
 * 当 到达时间时，触发 longpress handler
 * 当 tounchend 时，取消计时
 */
export default {
  install(
    Vue,
    options = {
      time: 1000,
    }
  ) {
    Vue.directive('longpress', {
      bind: function(el, binding, vNode) {
        // 确保提供的表达式是函数
        if (typeof binding.value !== 'function') {
          // 获取组件名称
          const compName = vNode.context.name
          // 将警告传递给控制台
          let warn = `[longpress:] provided expression '${binding.expression}' is not afunction, but has to be `
          if (compName) {
            warn += `Found in component '${compName}' `
          }
          console.warn(warn)
        }
        // 定义变量
        let pressTimer = null

        // 重置计时器
        let reset = () => {
          if (pressTimer) {
            clearTimeout(pressTimer)
          }
          pressTimer = setTimeout(() => {
            // 执行函数
            handler()
          }, options.time)
        }

        // 创建计时器（ 1秒后执行函数 ）
        let start = e => {
          if (e.type === 'click' && e.button !== 0) {
            return
          }
          if (pressTimer === null) {
            pressTimer = setTimeout(() => {
              // 执行函数
              handler()
            }, options.time)
          }
          window.addEventListener('mousemove', reset)
          window.addEventListener('touchmove', reset)
        }
        // 取消计时器
        let cancel = () => {
          // 检查计时器是否有值
          if (pressTimer !== null) {
            clearTimeout(pressTimer)
            pressTimer = null
          }
          window.removeEventListener('mousemove', reset)
          window.removeEventListener('touchmove', reset)
        }
        // 运行函数
        const handler = e => {
          // 执行传递给指令的方法
          binding.value(e)
        }
        // 添加事件监听器
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)
        // 取消计时器
        el.addEventListener('click', cancel)
        el.addEventListener('mouseout', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
      },
    })
  },
}
