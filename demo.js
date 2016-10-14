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