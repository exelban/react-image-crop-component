# react-image-crop-component
[![build status](https://travis-ci.org/exelban/react-image-crop-component.svg?branch=master)](https://travis-ci.org/exelban/react-image-crop-component)
[![npm version](https://badge.fury.io/js/react-image-crop-component.svg)](http://www.npmjs.com/package/react-image-crop-component)
[![Download Count](http://img.shields.io/npm/dt/react-image-crop-component.svg)](http://www.npmjs.com/package/react-image-crop-component)

![](https://s14.postimg.org/x2xyr073l/react_image_crop_component.gif)

Component for easy image cropping in react

For example usage check out the docs folder. Demo: [https://exelban.github.io/react-image-crop-component/](https://exelban.github.io/react-image-crop-component/)

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
            <ReactImageCrop setWidth={300} setHeight={300} square={false} onCrop={this.onCropped} onCropData={this.onCroppedData}  onChange={this.onChanged} src="demo.jpg"/>
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
#####src (REQUIRED, String)
```javascript
<ReactImageCrop src="demo.jpg"/>
```
You can of course pass a blob path or base64 data.

#####setWidth (optional, Number)
```javascript
<ReactImageCrop setWidth={300} src="demo.jpg"/>
```
You can set cropper element width. Default 100%. (If you have some problems with size in Google Chrome, try to set his value).

#####setHeight (optional, Number)
```javascript
<ReactImageCrop setHeight={300} src="demo.jpg"/>
```
You can set cropper element height. Default 100%. (If you have some problems with size in Google Chrome, try to set his value).

#####resize (optional, Boolean)
```javascript
<ReactImageCrop resize={true} src="demo.jpg"/>
```
If true, user can resize cropping element. Default value is ```true```

#####square (optional, Boolean)
```javascript
<ReactImageCrop square={true} src="demo.jpg"/>
```
If true, the selection will have an a square one. Default value is ```false```

#####onCrop (optional, Function)
```javascript
<ReactImageCrop onCrop={this.test} src="demo.jpg"/>
```
A callback which happens after a resize, drag, or nudge. Passes the current crop state object, as well as a pixel-converted crop for your convenience.

#####onCropData (optional, Function)
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

#####onChange (optional, Function)
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

#####PropTypes
```javascript
    src: React.PropTypes.string,
    onCrop: React.PropTypes.func,
    onCropData: React.PropTypes.func,
    onChange: React.PropTypes.func,
    square: React.PropTypes.bool,
    setWidth: React.PropTypes.number,
    setHeight: React.PropTypes.number,
    resize: React.PropTypes.bool
```
##License
**MIT Licensed**
