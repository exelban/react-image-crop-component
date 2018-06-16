// @flow

import React from 'react'
import GetCursorPosition from 'cursor-position'

type Props = {
  src: string,
  maxWidth?: string,
  maxHeight?: string,

  square?: boolean,

  watch?: Function,
  onCrop?: Function,
  onReset?: Function,
}
type State = {
  DEBUG: boolean,

  image: any,

  moveAction: boolean,
  activateCursorPosition: {
    x: number,
    y: number,
    xInCrop: number,
    yInCrop: number,
  },
  cropSize: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  cropVisibility: boolean,
  needToHide: boolean,
}

class ImageCrop extends React.Component<Props, State> {
  static defaultProps = {
    src: '',
    square: false,
    watch: false,

    onCrop: () => {},
    onReset: () => {},
  }

  constructor () {
    super()

    this.state = {
      DEBUG: false,

      image: null,
      activateCursorPosition: {
        x: 0,
        y: 0,
        xInCrop: 0,
        yInCrop: 0,
      },
      cropSize: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      moveAction: false,
      cropVisibility: false,
      needToHide: false,
    }
  }

  response = () => {
    const RICC = document.getElementsByClassName('RICC')[0]
    if (!RICC) throw new Error('[ImageCrio] ImageCrop component not found.')

    const img = this.state.image
    const canvas = document.createElement('canvas')
    const preview = RICC.getElementsByClassName('preview')[0].getElementsByTagName('img')[0]

    let ratioW = img.width / RICC.offsetWidth
    let ratioH = img.height / RICC.offsetHeight

    if (ratioW < 1) ratioW = 1
    if (ratioH < 1) ratioH = 1

    canvas.width = this.state.cropSize.width * ratioW
    canvas.height = this.state.cropSize.height * ratioH

    canvas.getContext('2d').drawImage(
      preview,
      -this.state.cropSize.x * ratioW,
      -this.state.cropSize.y * ratioH,
      img.width,
      img.height,
    )

    return {
      image: canvas.toDataURL(),
      data: {
        x: -this.state.cropSize.x * ratioW,
        y: -this.state.cropSize.y * ratioH,
        width: this.state.cropSize.width * ratioW,
        height: this.state.cropSize.height * ratioH,
      },
    }
  }

  mouseDown = (e: Object) => {
    const RICC = document.getElementsByClassName('RICC')[0]
    if (!RICC) throw new Error('[ImageCrio] ImageCrop component not found.')
    if (this.state.DEBUG) console.log('%c[RICC] Mouse down ↡', 'color:#fff; background-color:#0097A7')
    e.preventDefault()

    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('touchmove', this.mouseMove)
    document.addEventListener('touchend', this.mouseUp)

    const moveAction = e.target.className === 'crop'
    let posInCrop = {
      x: 0,
      y: 0,
    }

    const { x, y } = GetCursorPosition({
      event: e,
      element: RICC,
    })
    if (moveAction) {
      posInCrop = GetCursorPosition({
        event: e,
        element: RICC.getElementsByClassName('crop')[0],
      })
    }

    this.setState({
      activateCursorPosition: {
        x,
        y,
        xInCrop: posInCrop.x,
        yInCrop: posInCrop.y,
      },
      cropVisibility: true,
      moveAction,
      needToHide: true,
    })
  }
  mouseMove = (e: Object) => {
    e.preventDefault()

    let width = 0
    let height = 0
    const RICC = document.getElementsByClassName('RICC')[0]
    let { x, y } = GetCursorPosition({
      event: e,
      element: RICC,
    })
    const dX = x - this.state.activateCursorPosition.x
    const dY = y - this.state.activateCursorPosition.y
    const direction = {
      rightBottom: false,
      rightTop: false,
      leftBottom: false,
      leftTop: false,
    }

    if (this.state.moveAction) {
      x -= this.state.activateCursorPosition.xInCrop
      y -= this.state.activateCursorPosition.yInCrop

      if (x + this.state.cropSize.width >= RICC.offsetWidth) {
        x = RICC.offsetWidth - this.state.cropSize.width
      }
      if (y + this.state.cropSize.height >= RICC.offsetHeight) {
        y = RICC.offsetHeight - this.state.cropSize.height
      }
      if (x < 0) x = 0
      if (y < 0) y = 0
      this.setState({
        cropSize: {
          x,
          y,
          width: this.state.cropSize.width,
          height: this.state.cropSize.height,
        },
        needToHide: false,
      })
      if (this.props.watch) {
        this.props.watch(this.response())
      }
      return
    }

    if (dX > 0 && dY > 0) direction.rightBottom = true
    if (dX > 0 && dY < 0) direction.rightTop = true
    if (dX < 0 && dY > 0) direction.leftBottom = true
    if (dX < 0 && dY < 0) direction.leftTop = true

    if (direction.rightBottom) {
      if (this.state.DEBUG) console.log('%c[RICC] Mouse move ↘', 'color:#fff; background-color:#0097A7')

      width = dX
      height = dY;
      ({ x, y } = this.state.activateCursorPosition)

      if (this.props.square) height = width
      if (this.state.activateCursorPosition.x + width > RICC.offsetWidth) {
        width = RICC.offsetWidth - this.state.activateCursorPosition.x
        if (this.props.square) height = width
      }
      if (this.state.activateCursorPosition.y + height > RICC.offsetHeight) {
        height = RICC.offsetHeight - this.state.activateCursorPosition.y
        if (this.props.square) width = height
      }
    } else if (direction.rightTop) {
      if (this.state.DEBUG) console.log('%c[RICC] Mouse move ↗', 'color:#fff; background-color:#0097A7')
      if (y < 0) y = 0

      width = dX
      height = this.state.activateCursorPosition.y - y;
      ({ x } = this.state.activateCursorPosition)

      if (this.props.square) width = height
      if (this.state.activateCursorPosition.x + width > RICC.offsetWidth) {
        width = RICC.offsetWidth - this.state.activateCursorPosition.x
        if (this.props.square) {
          height = width
          y = this.state.activateCursorPosition.y - width
        }
      }
    } else if (direction.leftBottom) {
      if (this.state.DEBUG) console.log('%c[RICC] Mouse move ↙', 'color:#fff; background-color:#0097A7')
      if (x < 0) x = 0

      width = this.state.activateCursorPosition.x - x
      height = dY;
      ({ y } = this.state.activateCursorPosition)

      if (this.props.square) height = width
      if (this.state.activateCursorPosition.y + height > RICC.offsetHeight) {
        height = RICC.offsetHeight - this.state.activateCursorPosition.y
        if (this.props.square) width = height
        x = this.state.activateCursorPosition.x - height
      }
    } else if (direction.leftTop) {
      if (this.state.DEBUG) console.log('%c[RICC] Mouse move ↖', 'color:#fff; background-color:#0097A7')
      if (y < 0) y = 0
      if (x < 0) x = 0

      width = this.state.activateCursorPosition.x - x
      height = this.state.activateCursorPosition.y - y

      if (this.props.square) {
        if (-dX <= -dY) {
          width = height
          x = this.state.activateCursorPosition.x - width
        } else {
          height = width
          y = this.state.activateCursorPosition.y - height
        }
      }
    }

    this.setState({
      cropSize: {
        x,
        y,
        width,
        height,
      },
      needToHide: false,
    })
    if (this.props.watch) {
      this.props.watch(this.response())
    }
  }
  mouseUp = (e: Object) => {
    if (this.state.DEBUG) console.log('%c[RICC] Mouse up ↑', 'color:#fff; background-color:#0097A7')
    e.preventDefault()

    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('touchmove', this.mouseMove)
    document.removeEventListener('touchend', this.mouseUp)

    let { cropSize, cropVisibility } = this.state

    if (this.state.needToHide) {
      if (this.props.onReset) {
        this.props.onReset(true)
      }
      cropVisibility = false
      cropSize = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }
    }

    this.setState({
      cropSize,
      cropVisibility,
      moveAction: false,
      activateCursorPosition: {
        x: 0,
        y: 0,
        xInCrop: 0,
        yInCrop: 0,
      },
    })

    if (this.props.onCrop && !this.state.needToHide) {
      this.props.onCrop(this.response())
    }
  }

  trackWindowResize = () => {
    const RICC = document.getElementsByClassName('RICC')[0]
    const preview = RICC.getElementsByClassName('preview')[0].getElementsByTagName('img')[0]

    preview.style.width = `${RICC.offsetWidth}px`
    preview.style.height = `${RICC.offsetHeight}px`
  }

  componentDidMount () {
    const RICC = document.getElementsByClassName('RICC')[0]
    if (!RICC) throw new Error('[ImageCrio] ImageCrop component not found.')
    const image = RICC.getElementsByClassName('image')[0]
    const preview = RICC.getElementsByClassName('preview')[0].getElementsByTagName('img')[0]

    if (this.props.maxWidth) {
      RICC.style.maxWidth = this.props.maxWidth || '0'
      image.style.maxWidth = this.props.maxWidth || '0'
    }
    if (this.props.maxHeight) {
      RICC.style.maxHeight = this.props.maxHeight || '0'
      image.style.maxHeight = this.props.maxHeight || '0'
    }

    const img = new Image()
    img.src = this.props.src
    img.onload = () => {
      preview.style.width = `${RICC.offsetWidth}px`
      preview.style.height = `${RICC.offsetHeight}px`
      this.setState({
        image: img,
      })
    }

    window.addEventListener('resize', this.trackWindowResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.trackWindowResize)
  }

  render () {
    const cropStyle = {
      display: this.state.cropVisibility ? 'block' : 'none',
      top: `${this.state.cropSize.y}px`,
      left: `${this.state.cropSize.x}px`,
      width: `${this.state.cropSize.width}px`,
      height: `${this.state.cropSize.height}px`,
    }
    const previewStyle = {
      marginTop: `-${this.state.cropSize.y}px`,
      marginLeft: `-${this.state.cropSize.x}px`,
    }

    return (
      <div className="RICC" onTouchStart={this.mouseDown} onMouseDown={this.mouseDown}>
        <div className="crop" style={cropStyle}>
          <div className="preview">
            <img className="crop" src={this.props.src} style={previewStyle}/>
          </div>
        </div>
        <div className="background"/>
        <img className="image" src={this.props.src}/>
      </div>
    )
  }
}


export default ImageCrop
