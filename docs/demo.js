const React = require('react');
const ReactDOM = require('react-dom');
const ReactImageCrop = require('./../lib/ReactImageCrop');
require ('./../lib/style.css');

const MainView = React.createClass({
    render(){
        return (
            <div>
                <ReactImageCrop square={false} src="./demo.jpg"/>
            </div>
        );
    }
});

ReactDOM.render(<MainView/>, document.getElementById('app') );
