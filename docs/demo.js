const React = require('react');
const ReactDOM = require('react-dom');
const ReactImageCrop = require('../index.js');

const MainView = React.createClass({
    getInitialState() {
        return ({
            image: null,
            online: false
        });
    },
    render(){
        return (<div className="appBlock">
            <ReactImageCrop square={false} onCrop={this.onCropped} onCropData={this.onCroppedData}  onChange={this.onChanged} src="demo.jpg"/>
            <button onClick={this.cropImage}>Crop</button> <br/>
            <img ref="image"/>
        </div>);
    },
    onChanged: function (e) {
        //console.log("Changed");
    },
    onCropped: function (e) {
        //console.log("Cropped image", e);
        this.setState({image: e});
    },
    onCroppedData: function (e) {
        //console.log("Cropped size", e);
    },
    cropImage: function () {
        if(this.state.image!=null) this.refs.image.src = this.state.image
    }
});

ReactDOM.render(<MainView/>, document.getElementById('app') );
