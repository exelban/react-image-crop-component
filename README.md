# react-image-crop-component

[![Download Count](https://img.shields.io/npm/dm/react-image-crop-component.svg?style=flat-square)](http://www.npmjs.com/package/react-image-crop-component)

[![Demo image](https://s3.eu-central-1.amazonaws.com/serhiy/Github_repo/react-image-crop-component-2.gif)](https://exelban.github.io/react-image-crop-component)

Component for easy image cropping in react. [Demo](https://exelban.github.io/react-image-crop-component/)

## Install
```sh
yarn add react-image-crop-component
```  
Or with npm:  
```sh
npm install react-image-crop-component --save
```

## Usage
Include the main js module:  
```javascript
var ImageCrop = require('react-image-crop-component');
// or es6:
import ImageCrop from 'react-image-crop-component';
```

Include the styles:  
```javascript
require('react-image-crop-component/style.css');
// or es6:
import 'react-image-crop-component/style.css';
```


## Example
```javascript
import React, {Component} from 'react'
import {render} from 'react-dom'
import ImageCrop from 'react-image-crop-component'
import 'react-image-crop-component/style.css'

class Demo extends Component{
    constructor(){
        super()
        this.onCropped = this._onCropped.bind(this)
    }
    render(){
        return (<div style={{width: "300px", height: "300px"}}>
            <ImageCrop src="demo.jpg"
                            setWidth={300} 
                            setHeight={300} 
                            square={false} 
                            resize={true}
                            border={"dashed #ffffff 2px"}
                            onCrop={this.onCropped}/>
        </div>)
    },
    _onCropped: function (e) {
        let image = e.image
        let image_data = e.data
    }
});

render(<Demo/>, document.getElementById('app'));
```

## Props
**Name** | **Type** | **Description**
--- | --- | ---
**src** | **string** | **Mouse event with contains cursor position**
**maxWidth** | **string** | **HTML node element**
**maxHeight** | **string** | **HTML node element**
**square** | **boolean** | **HTML node element**
**watch** | **Function** | **Called on crop**
**onCrop** | **Function** | **Called when crop action was finished**
**onReset** | **Function** | **Called when crop box reset**


## License
[Apache License 2.0](https://github.com/exelban/react-image-crop-component/blob/master/LICENSE)
