const React = require('react');
const ReactDOM = require('react-dom');
const ReactImageCrop = require('./../lib/ReactImageCrop');
require ('./../lib/style.css');

const MainView = React.createClass({
    render(){
        return (<div style={{width: "700px", height: "500px", margin: "0 auto"}}>
            <ReactImageCrop square={false} onCrop={this.onCropped} onCropData={this.onCroppedData}  onChange={this.onChanged} src="demo.jpg"/>
        </div>);
    },
    onChanged: function (e) {
        console.log("Changed");
    },
    onCropped: function (e) {
        console.log("Cropped image", e);
    },
    onCroppedData: function (e) {
        console.log("Cropped size", e);
    }
});

ReactDOM.render(<MainView/>, document.getElementById('app') );
