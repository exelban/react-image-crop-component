# react-image-crop-component
[![build status](https://img.shields.io/wercker/ci/wercker/docs.svg)](http://www.npmjs.com/package/react-image-crop-component)
[![npm version](https://badge.fury.io/js/react-image-crop-component.svg)](http://www.npmjs.com/package/react-image-crop-component)
[![Download Count](http://img.shields.io/npm/dt/react-image-crop-component.svg)](http://www.npmjs.com/package/react-image-crop-component)

![](https://psv4.vk.me/c812432/u24186162/docs/b8143a59c5a9/crop.gif?extra=0441mptz3a6q3V4rTTrLB4tRwreOLWF2nMbN4uGBJ2W2Wrb7VWB9x28slE7fvHcm0cag3GUx_BxurIOv_zf2e6MM3KC3B_HlZuVhiIoh_yip0yUzIXElSw)

Component for easy image cropping in react

##Install
```javascript
npm install react-image-crop-component
```

##Usage
Include the main js module, e.g.:
```javascript
var ReactImageCrop = require('react-image-crop-component');
// or es6:
import ReactImageCrop from 'react-image-crop-component';
```

###Example
```javascript
var React = require('react');
var ReactDOM = require('react-dom');
var ReactImageCrop = require('react-image-crop-component');

var Demo = React.createClass({
    render(){
        return (<div style={{width: "300px", height: "300px"}}>
            <ReactImageCrop square={false} onCrop={this.onCropped} onCropData={this.onCroppedData}  onChange={this.onChanged} src="demo.jpg"/>
        </div>);
    },
    onChanged: function (e) {
        console.log(e);
    },
    onCropped: function (e) {
        console.log(e);
    },
    onCroppedData: function (e) {
        console.log(e);
    }
});

ReactDOM.render(<Demo/>, document.getElementById('app'));
```

###Props
#####src (REQUIRED)
```javascript 
<ReactImageCrop src="demo.jpg"/>
```
You can of course pass a blob path or base64 data.

#####onCrop (optional)
```javascript 
<ReactImageCrop onCrop={this.test} src="demo.jpg"/>
```
A callback which happens after a resize, drag, or nudge. Passes the current crop state object, as well as a pixel-converted crop for your convenience.

#####onCropData (optional)
```javascript 
<ReactImageCrop onCropData={this.test} src="demo.jpg"/>
```
A callback which happens after a resize, drag, or nudge.
Return: 
```javascript 
  {
    w: selection width,
    h: selection height,
    l: selection offsetLeft,
    t: selection offsetTop
  }
```

#####onChange (optional)
```javascript 
<ReactImageCrop onChange={this.test} src="demo.jpg"/>
```
A callback which happens for every change of the crop (i.e. many times as you are dragging/resizing). 
Return: 
```javascript 
  {
    w: selection width,
    h: selection height,
    l: selection offsetLeft,
    t: selection offsetTop
  }
```
Passes the current crop state object, as well as a pixel-converted crop for your convenience.

#####square (optional)
```javascript 
<ReactImageCrop square={true} src="demo.jpg"/>
```
If true, the selection will have an a square one. Default value is ```false```

#####PropTypes
```javascript
  src: React.PropTypes.string,
  onCrop: React.PropTypes.func,
  onCropData: React.PropTypes.func,
  onChange: React.PropTypes.func,
  square: React.PropTypes.bool
```
##License
**MIT Licensed**
