// @flow

import React from 'react'
import { render } from 'react-dom'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import ImageCrop from 'react-image-crop-component'
import 'react-image-crop-component/style.css'
import '../../src/style.css'
import './style.css'


type Props = {}
type State = {
  image: string,
  cropSize: Object,
  online: boolean,
  refreshStatus: boolean,
  rectangleStatus: boolean,
  resizeStatus: boolean,
}


class AppView extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      image: '',
      online: false,
      refreshStatus: false,
      rectangleStatus: false,
      resizeStatus: true,
      cropSize: {},
    }
  }

  watch = (res) => {
    if (!this.state.refreshStatus) return
    const img = document.getElementsByClassName('ResultBlock')[0].getElementsByTagName('img')[0]
    img.src = res.image
    this.setState({
      cropSize: {
        x: res.data.x.toFixed(2),
        y: res.data.y.toFixed(2),
        width: res.data.width.toFixed(2),
        height: res.data.height.toFixed(2),
      },
    })
  }
  onCrop = (res) => {
    const img = document.getElementsByClassName('ResultBlock')[0].getElementsByTagName('img')[0]
    img.src = res.image
    this.setState({
      cropSize: {
        x: res.data.x.toFixed(2),
        y: res.data.y.toFixed(2),
        width: res.data.width.toFixed(2),
        height: res.data.height.toFixed(2),
      },
    })
  }
  onReset = () => {
    const img = document.getElementsByClassName('ResultBlock')[0].getElementsByTagName('img')[0]
    img.src = 'demo.jpg'
    this.setState({
      cropSize: {},
    })
  }

  render () {
    let data = JSON.stringify(this.state.cropSize, null, 4)
    if (data.length <= 2) {
      data = 'Empty'
    }

    return (
      <div className="root">
        <div className="main">
          <div className="images">
            <div className="CropBlock">
              <ImageCrop src="src/demo.jpg"
                              maxHeight="300px"
                              square={this.state.rectangleStatus}
                              watch={this.watch}
                              onCrop={this.onCrop}
                              onReset={this.onReset}/>
            </div>
            <div className="ResultBlock">
              <img src="src/demo.jpg"/>
            </div>
          </div>
          <div className="settings">
            <div className="toggles">
              <div>
                <label>
                  <Toggle defaultChecked={this.state.refreshStatus}
                          onChange={() => this.setState({ refreshStatus: !this.state.refreshStatus })}/>
                  <p>Continuously refresh cropped image</p>
                </label>
              </div>
              <div>
                <label>
                  <Toggle defaultChecked={this.state.rectangleStatus}
                          onChange={() => this.setState({ rectangleStatus: !this.state.rectangleStatus })}/>
                  <p>Activate rectangle</p>
                </label>
              </div>
              <div>
                <label>
                  <Toggle defaultChecked={this.state.resizeStatus}
                          onChange={() => this.setState({ resizeStatus: !this.state.resizeStatus })}/>
                  <p>Resize cropped image</p>
                </label>
              </div>
            </div>
            <div className="information">
              <pre>{data}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const app = document.getElementById('app')
if (app == null) {
  throw new Error('No document')
}
render(<AppView/>, app)
