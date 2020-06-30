export default {
  // eslint-disable-next-line no-unused-vars
  install: function(Vue, options) {
    Vue.prototype.$message = {
      success: function(text = '') {
        helper(text, 'success')
      },
      info: function(text = '') {
        helper(text, 'info')
      },
      error: function(text = '') {
        helper(text, 'error')
      }
    }
  }
}

function helper(text, type) {
  const node = `<div id="message" class="message message-${type}">${text}</div>`
  document.body.insertAdjacentHTML('afterbegin', node)
  const message = document.body.querySelector('#message')
  setTimeout(() => message.classList.add('close'), 3500)
  setTimeout(() => {
    message.remove()
  }, 4000)
}
