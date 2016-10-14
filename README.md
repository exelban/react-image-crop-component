# react-image-crop-component
[![build status](https://img.shields.io/wercker/ci/wercker/docs.svg)](http://www.npmjs.com/package/react-swipe-component)
[![npm version](https://badge.fury.io/js/react-swipe-component.svg)](http://www.npmjs.com/package/react-swipe-component)
[![Download Count](http://img.shields.io/npm/dt/react-swipe-component.svg)](http://www.npmjs.com/package/react-swipe-component)

Component for easy image cropping in react

##Install
```javascript
npm install react-image-crop-component
```

##Usage
nclude the main js module, e.g.:
```javascript
var ReactImageCrop = require('react-image-crop-component');
// or es6:
import ReactImageCrop from 'react-image-crop-component';
```
Also you need to connect css styles ```lib/react-image-crop-component.css```.

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

#####onCrop
```javascript 
<ReactImageCrop onCrop={this.test} src="demo.jpg"/>
```
A callback which happens after a resize, drag, or nudge. Passes the current crop state object, as well as a pixel-converted crop for your convenience.

#####onCropData
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

#####onChange
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

#####square
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
