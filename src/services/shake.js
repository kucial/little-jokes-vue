const defaultOptions = {
  threshold: 16,
  stopThreshold: 3,
  timeout: 1000,
  factorX: 1,
  factorY: 1,
  factorZ: 0.2,
}
function Shake(options) {
  //   this.hasDeviceMotion = !!window.DeviceMotionEvent
  this.options = {
    ...defaultOptions,
    ...options,
  }

  this.lastTime = new Date()
  this.lastX = null
  this.lastY = null
  this.lastZ = null

  this.start = this.start.bind(this)
}

Shake.prototype.reset = function() {
  this.lastTime = new Date()
  this.lastX = null
  this.lastY = null
  this.lastZ = null
}

Shake.prototype.grantPermission = function(callback) {
  var manager = this
  if (!window.DeviceMotionEvent) {
    manager.dispatchServiceError({
      code: 'FEATURE_NOT_SUPPORTED',
    })
    return
  }
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          manager.permissionGranted = true
          callback()
        } else {
          manager.dispatchServiceError({
            code: 'PERMISSION_NOT_GRANTED',
          })
        }
      })
      .catch(err => {
        // alert(err.name);
        if (err.name === 'NotAllowedError') {
          manager.dispatchServiceError({
            code: 'FEATURE_NOT_ALLOWED',
          })
        }
      })
  } else {
    let timer = setTimeout(function() {
      manager.dispatchServiceError({
        code: 'FEATURE_DISABLED',
      })
    }, 1000)
    window.addEventListener(
      'devicemotion',
      () => {
        clearTimeout(timer)
        manager.permissionGranted = true
        callback()
      },
      { once: true }
    )
  }
}

Shake.prototype.start = function() {
  if (!this.permissionGranted) {
    setTimeout(() => {
      this.grantPermission(() => {
        this.start()
      })
    }, 500)
  } else {
    this.reset()
    window.addEventListener('devicemotion', this, false)
  }
}

Shake.prototype.stop = function() {
  window.removeEventListener('devicemotion', this, false)
  window.removeEventListener('touchend', this.start)
}

Shake.prototype.devicemotion = function(e) {
  let current = e.acceleration
  // eslint-disable-next-line no-prototype-builtins
  if (!current.hasOwnProperty('x')) {
    current = e.accelerationIncludingGravity
  }
  if (!current.x) {
    return
  }

  if (!this.lastX) {
    this.lastX = current.x
    this.lastY = current.y
    this.lastZ = current.z
    return
  }
  const deltaX = Math.abs(this.lastX - current.x)
  const deltaY = Math.abs(this.lastY - current.y)
  const deltaZ = Math.abs(this.lastZ - current.z)

  // const range = deltaX + deltaY + deltaZ

  const range =
    this.options.factorX * deltaX +
    this.options.factorY * deltaY +
    this.options.factorZ * deltaZ

  if (range > this.options.threshold) {
    // alert(`${deltaX}, ${deltaY}, ${deltaZ}`)
    this.isShaking = true
  } else if (range < this.options.stopThreshold && this.isShaking) {
    const event = this.createEvent('shake', {
      accelerationIncludingGravity: current,
    })
    if (event) {
      window.dispatchEvent(event)
    }
    this.isShaking = false
  }
  this.lastX = current.x
  this.lastY = current.y
  this.lastZ = current.z
}

Shake.prototype.createEvent = function(name, detail) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name, {
      bubbles: true,
      cancelable: true,
      detail,
    })
  }
  return false
}

Shake.prototype.dispatchServiceError = function(info) {
  const event = this.createEvent('shake_init_failed', info)
  if (event) {
    window.dispatchEvent(event)
  }
}

Shake.prototype.handleEvent = function(e) {
  if (typeof this[e.type] === 'function') {
    return this[e.type](e)
  }
}

const shake = new Shake()
window.shake = shake
export default shake
