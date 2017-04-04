# react-image-crop-component

[![Greenkeeper badge](https://badges.greenkeeper.io/exelban/react-image-crop-component.svg)](https://greenkeeper.io/)
[![build status](https://travis-ci.org/exelban/react-image-crop-component.svg?branch=master)](https://travis-ci.org/exelban/react-image-crop-component)
[![npm version](https://badge.fury.io/js/react-image-crop-component.svg)](http://www.npmjs.com/package/react-image-crop-component)
[![Download Count](https://img.shields.io/npm/dm/react-image-crop-component.svg)](http://www.npmjs.com/package/react-image-crop-component)

[![Demo image](https://s3.eu-central-1.amazonaws.com/serhiy/Github_repo/react-image-crop-component-2.gif)](https://exelban.github.io/react-image-crop-component)

Component for easy image cropping in react. [Demo](https://exelban.github.io/react-image-crop-component/)

## Install
```javascript
npm install react-image-crop-component
```

## Usage
Include the main js module, e.g.:
```javascript
var ReactImageCrop = require('react-image-crop-component');
// or es6:
import ReactImageCrop from 'react-image-crop-component';
```
You must to use some css compiler.
I recommend [browserify-css](https://github.com/cheton/browserify-css).
```javascript
.transform('browserify-css', {
            global: true
        })
```

## Example
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactImageCrop from 'react-image-crop-component';

let Demo = React.createClass({
    render(){
        return (<div style={{width: "300px", height: "300px"}}>
            <ReactImageCrop src="demo.jpg"
                            setWidth={300} 
                            setHeight={300} 
                            square={false} 
                            resize={true}
                            border={"dashed #ffffff 2px"}
                            onCrop={this.onCropped}/>
        </div>);
    },
    onCropped: function (e) {
        let image = e[0];
        let image_data = e[1];
        
        console.log(e);
    }
});

ReactDOM.render(<Demo/>, document.getElementById('app'));
```

### Props
Doubleclick on crop box will reset cropping.

##### src (REQUIRED, String)
```javascript
<ReactImageCrop src="demo.jpg"/>
```
You can of course pass a blob path or base64 data.

##### setWidth (optional, Number)
```javascript
<ReactImageCrop setWidth={300} src="demo.jpg"/>
```
You can set cropper element width. Default 100%. (If you have some problems with size in Google Chrome, try to set his value).

##### setHeight (optional, Number)
```javascript
<ReactImageCrop setHeight={300} src="demo.jpg"/>
```
You can set cropper element height. Default 100%. (If you have some problems with size in Google Chrome, try to set his value).

##### square (optional, Boolean)
```javascript
<ReactImageCrop square={true} src="demo.jpg"/>
```
If true, the selection will have an a square one. Default value is ```false```

##### resize (optional, Boolean)
```javascript
<ReactImageCrop resize={true} src="demo.jpg"/>
```
If true, user can resize cropping element. Default value is ```true```

##### border (optional, String)
```javascript
<ReactImageCrop border={"dashed #ffffff 2px"} src="demo.jpg"/>
```
You can set crop box border style.

##### onCrop (optional, Function)
```javascript
<ReactImageCrop onCrop={this.test} src="demo.jpg"/>
```
A callback which happens after a resize, drag, or nudge. Passes the current crop state object, as well as a pixel-converted crop for your convenience.
Return:
```javascript
  [ 
    imageObject,
    {
        w: selection width,
        h: selection height,
        l: selection offsetLeft,
        t: selection offsetTop
    }
  ]
```

#### PropTypes
```javascript
    src: React.PropTypes.string,
    setWidth: React.PropTypes.number,
    setHeight: React.PropTypes.number,
    square: React.PropTypes.bool,
    resize: React.PropTypes.bool,
    border: React.PropTypes.string,
    onCrop: React.PropTypes.func
```

## License
[Apache License 2.0](https://github.com/exelban/react-image-crop-component/blob/master/LICENSE)
