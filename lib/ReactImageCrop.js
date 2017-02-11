const React             = require('react');
const ReactDOM          = require('react-dom');
require("./style.css");


const ReactImageCrop = React.createClass({
    displayName: 'ReactImageCrop',
    propTypes: {
        src: React.PropTypes.string,
        onCrop: React.PropTypes.func,
        onCropData: React.PropTypes.func,
        onChange: React.PropTypes.func,
        square: React.PropTypes.bool,
        setWidth: React.PropTypes.number,
        setHeight: React.PropTypes.number,
        resize: React.PropTypes.bool
    },
    getDefaultProps() {
        return ({
            resize: true
        });
    },
    getInitialState() {
        return ({
            src: this.props.src,
            active: false,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            resizeW: 0,
            resizeH: 0,
            selected: false,
            move: false,
            resizeCrop: null,
            square: this.props.square || false
        });
    },
    componentDidMount() {
        let image = new Image();
        image.src = this.props.src;
        let a = this;
        image.onload = function () {
            let block = a.refs.react_image_crop_component;
            let preview = a.refs.preview;
            let img = a.refs.img;
            let w = a.props.setWidth || img.offsetWidth;
            let h = a.props.setHeight || img.offsetHeight;
            block.style.width = w+"px";
            block.style.height = h+"px";
            preview.style.width = w+"px";
            preview.style.height = h+"px";
            a.setState({
                blockX: block.getBoundingClientRect().left,
                blockY: block.getBoundingClientRect().top
            });
        };
    },
    render() {
        return <div className="block" ref="react_image_crop_component"
                    onTouchCancel={this.mouseLeave} onTouchStart={this.mouseDown} onTouchMove={this.mouseMove} onTouchEnd={this.mouseUp}
                    onMouseLeave={this.mouseLeave} onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>
            <div className="crop" ref="crop">
                {this.props.resize ? <div className="resizeP0" ref="previewDIV">
                        <div className="resizeP1" ref="resizeP1"/>
                        <div className="resizeP2" ref="resizeP2"/>
                        <div className="resizeP3" ref="resizeP3"/>
                        <div className="resizeP4" ref="resizeP4"/>
                        <div className="resizeP5" ref="resizeP5"/>
                        <div className="resizeP6" ref="resizeP6"/>
                        <div className="resizeP7" ref="resizeP7"/>
                        <div className="resizeP8" ref="resizeP8"/>
                    </div> : null}
                <div className="preview"><img src={this.state.src} ref="preview"/></div>
            </div>
            <div className="bg"/>
            <img className="img" ref="img" src={this.state.src}/>
        </div>;
    },
    mouseDown(e) {
        e.preventDefault();
        let posX = e.pageX || Math.round(e.touches[0].clientX);
        let posY = e.pageY || Math.round(e.touches[0].clientY);
        if(!this.state.active && !this.state.selected) {
            this.setState({
                active: true,
                startX: posX - this.state.blockX,
                startY: posY - this.state.blockY
            });
        }
        else if(this.state.selected){
            if(e.target==this.refs.preview || e.target==this.refs.previewDIV) {
                this.setState({
                    move: true,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            }
            else if(e.target==this.refs.resizeP1){
                this.setState({
                    resizeCrop: 1,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", ""))
                });
            }
            else if(e.target==this.refs.resizeP2){
                this.setState({
                    resizeCrop: 2,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", ""))
                });
            }
            else if(e.target==this.refs.resizeP3){
                this.setState({
                    resizeCrop: 3,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            }
            else if(e.target==this.refs.resizeP4){
                this.setState({
                    resizeCrop: 4,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            }
            else if(e.target==this.refs.resizeP5){
                this.setState({
                    resizeCrop: 5,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            }
            else if(e.target==this.refs.resizeP6){
                this.setState({
                    resizeCrop: 6,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            }
            else if(e.target==this.refs.resizeP7){
                this.setState({
                    resizeCrop: 7,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            }
            else if(e.target==this.refs.resizeP8){
                this.setState({
                    resizeCrop: 8,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            }
            else{
                this.setState({
                    active: true,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY
                });
            }
        }
    },
    mouseMove(e) {
        e.preventDefault();
        let posX = e.pageX || Math.round(e.touches[0].clientX);
        let posY = e.pageY || Math.round(e.touches[0].clientY);
        if(this.state.active){
            let crop = this.refs.crop;
            let block = this.refs.react_image_crop_component;
            let x = (posX - this.state.blockX) - this.state.startX;
            let y = (posY - this.state.blockY) - this.state.startY;
            let w = 0;
            let h = 0;
            let l = 0;
            let t = 0;

            if(x<0 && y>0 && x!=0 && y!=0){
                t = this.state.startY;
                h = y;
                l = this.state.startX-((-1)*x);
                w = this.state.startX - l;
                if(this.props.square) h=w;
            }
            else if(y<0 && x>0 && x!=0 && y!=0){
                l = this.state.startX;
                w = x;
                t = this.state.startY-((-1)*y);
                h = this.state.startY - t;
                if(this.props.square) w=h;
            }
            else if(x<0 && y<0 && x!=0 && y!=0){
                l = (posX - this.state.blockX);
                t = (posY - this.state.blockY);
                w = this.state.startX-l;
                h = this.state.startY-t;
                if(this.props.square) w=h;
            }
            else if(x!=0 && y!=0){
                l = this.state.startX;
                t = this.state.startY;
                w = x;
                h = y;
                if(this.props.square) h=w;
            }
            else{
                l = 0;
                t = 0;
                w = 0;
                h = 0;
            }

            if((l+w)<block.offsetWidth
                && (t+h)<block.offsetHeight
                && l>0 && t>0){
                if(this.refs.crop.style.display!="block") this.refs.crop.style.display = "block";
                crop.style.left = l+"px";
                crop.style.top = t+"px";
                crop.style.width = w+"px";
                crop.style.height = h+"px";
                this.renderPreview();
            }
        }
        else if(this.state.move){
            let crop = this.refs.crop;
            let block = this.refs.react_image_crop_component;
            let l = this.state.moveX-1*(this.state.startX - posX + this.state.blockX);
            let t = this.state.moveY-1*(this.state.startY - posY + this.state.blockY);
            let a1_1 = l+parseFloat(crop.style.width.replace("px", ""));
            let a1_2 = block.offsetWidth;
            let a2_1 = t+parseFloat(crop.style.height.replace("px", ""));
            let a2_2 = block.offsetHeight;

            if(l>0 && t>0 && a1_1<a1_2 && a2_1<a2_2){
                crop.style.left = l+"px";
                crop.style.top = t+"px";
                this.renderPreview();
            }
        }
        else if(this.state.resizeCrop!=null){
            let block = this.refs.react_image_crop_component;
            let crop = this.refs.crop;
            if(this.state.resizeCrop==1){
                let l = this.state.moveX-1*(this.state.startX - posX + this.state.blockX);
                let w = this.state.resizeW+1*(this.state.startX - posX + this.state.blockX);
                if(l>0){
                    if(this.state.square && w+crop.offsetTop<block.offsetHeight) {
                        crop.style.left = l+"px";
                        crop.style.width = w+"px";
                        crop.style.height = w+"px";
                    }
                    else if(!this.state.square){
                        crop.style.left = l+"px";
                        crop.style.width = w+"px";
                    }
                }
            }
            else if(this.state.resizeCrop==2){
                let w = this.state.resizeW-1*(this.state.startX - posX + this.state.blockX);
                if(crop.offsetLeft+w<block.offsetWidth){
                    if(this.state.square && w+crop.offsetTop<block.offsetHeight) {
                        crop.style.width = w+"px";
                        crop.style.height = w+"px";
                    }
                    else if(!this.state.square) crop.style.width = w+"px";
                }
            }
            else if(this.state.resizeCrop==3){
                let t = this.state.moveY-1*(this.state.startY - posY + this.state.blockY);
                let h = this.state.resizeH+1*(this.state.startY - posY + this.state.blockY);
                if(t>0){
                    if(this.state.square && h+crop.offsetLeft<block.offsetWidth) {
                        crop.style.top = t+"px";
                        crop.style.height = h+"px";
                        crop.style.width = h+"px";
                    }
                    else if(!this.state.square){
                        crop.style.top = t+"px";
                        crop.style.height = h+"px";
                    }
                }
            }
            else if(this.state.resizeCrop==4){
                let h = this.state.resizeH-1*(this.state.startY - posY + this.state.blockY);
                if(crop.offsetTop+h<block.offsetHeight){
                    if(this.state.square && h+crop.offsetLeft<block.offsetWidth) {
                        crop.style.height = h+"px";
                        crop.style.width = h+"px";
                    }
                    else if(!this.state.square) crop.style.height = h+"px";
                }
            }
            else if(this.state.resizeCrop==5){
                let l = this.state.moveX-1*(this.state.startX - posX + this.state.blockX);
                let w = this.state.resizeW+1*(this.state.startX - posX + this.state.blockX);
                let t = this.state.moveY-1*(this.state.startY - posY + this.state.blockY);
                let h = this.state.resizeH+1*(this.state.startY - posY + this.state.blockY);
                if(l>0 && t>0){
                    if(this.state.square && w+crop.offsetLeft<block.offsetWidth && h+crop.offsetTop<block.offsetHeight) {
                        crop.style.left = l+"px";
                        crop.style.top = t+"px";
                        crop.style.width = w+"px";
                        crop.style.height = h+"px";
                    }
                    else if(!this.state.square){
                        crop.style.left = l+"px";
                        crop.style.width = w+"px";
                        crop.style.top = t+"px";
                        crop.style.height = h+"px";
                    }
                }
            }
            else if(this.state.resizeCrop==6){
                let w = this.state.resizeW-1*(this.state.startX - posX + this.state.blockX);
                let t = this.state.moveY-1*(this.state.startY - posY + this.state.blockY);
                let h = this.state.resizeH+1*(this.state.startY - posY + this.state.blockY);
                if(t>0 && crop.offsetTop+h<block.offsetHeight){
                    if(this.state.square && h+crop.offsetLeft<block.offsetWidth && h+crop.offsetTop<block.offsetHeight) {
                        crop.style.top = t+"px";
                        crop.style.height = h+"px";
                        crop.style.width = h+"px";
                    }
                    else if(!this.state.square) {
                        crop.style.top = t+"px";
                        crop.style.height = h+"px";
                        crop.style.width = w+"px";
                    }
                }
            }
            else if(this.state.resizeCrop==7){
                let w = this.state.resizeW-1*(this.state.startX - posX + this.state.blockX);
                let h = this.state.resizeH-1*(this.state.startY - posY + this.state.blockY);
                if(crop.offsetLeft+w<block.offsetWidth && crop.offsetTop+h<block.offsetHeight){
                    if(this.state.square && w+crop.offsetTop<block.offsetHeight && w+crop.offsetLeft<block.offsetWidth) {
                        crop.style.width = w+"px";
                        crop.style.height = w+"px";
                    }
                    else if(!this.state.square) {
                        crop.style.width = w+"px";
                        crop.style.height = h+"px";
                    }
                }
            }
            else if(this.state.resizeCrop==8){
                let l = this.state.moveX-1*(this.state.startX - posX + this.state.blockX);
                let w = this.state.resizeW+1*(this.state.startX - posX + this.state.blockX);
                let h = this.state.resizeH-1*(this.state.startY - posY + this.state.blockY);
                if(l>0 && crop.offsetTop+h<block.offsetHeight){
                    if(this.state.square && w+crop.offsetTop<block.offsetHeight && w+crop.offsetLeft<block.offsetWidth) {
                        crop.style.left = l+"px";
                        crop.style.width = w+"px";
                        crop.style.height = w+"px";
                    }
                    else if(!this.state.square){
                        crop.style.left = l+"px";
                        crop.style.width = w+"px";
                        crop.style.height = h+"px";
                    }
                }
            }
            this.renderPreview();
        }
    },
    mouseUp(e) {
        e.preventDefault();
        if(this.state.active) {
            if(this.props.onCrop) this.props.onCrop(this.onCrop());
            if(this.props.onCropData) this.props.onCropData(this.onCropData());
            this.setState({active: false, selected: true});
        }
        else if(this.state.move){
            if(this.props.onCrop) this.props.onCrop(this.onCrop());
            if(this.props.onCropData) this.props.onCropData(this.onCropData());
            this.setState({move: false});
        }
        else if(this.state.resizeCrop!=null){
            if(this.props.onCrop) this.props.onCrop(this.onCrop());
            if(this.props.onCropData) this.props.onCropData(this.onCropData());
            this.setState({resizeCrop: null});
        }
    },
    mouseLeave(e) {
        if(this.state.move) this.setState({move: false});
        else if(this.state.resizeCrop!=null) this.setState({resizeCrop: null});
    },
    renderPreview(){
        this.refs.preview.style.marginTop = "-"+this.refs.crop.style.top;
        this.refs.preview.style.marginLeft = "-"+this.refs.crop.style.left;
        if(this.props.onChange) {
            this.props.onChange({
                t: this.refs.crop.offsetTop,
                l: this.refs.crop.offsetLeft,
                w: this.refs.crop.offsetWidth,
                h: this.refs.crop.offsetHeight
            });
        }
    },
    onCrop(){
        let w = this.refs.crop.offsetWidth;
        let h = this.refs.crop.offsetHeight;
        let l = this.refs.crop.offsetLeft;
        let t = this.refs.crop.offsetTop;
        let canvas = document.createElement('canvas');
        let img = new Image();
        img.src = this.refs.img.src;
        let ratioW = img.width / this.refs.img.width;
        let ratioH = img.height / this.refs.img.height;
        if(ratioW<1) ratioW=1;
        if(ratioH<1) ratioH=1;
        canvas.width = w*ratioW;
        canvas.height = h*ratioH;
        canvas.getContext('2d').drawImage(img, -l*ratioW, -t*ratioH, img.width, img.height);
        return canvas.toDataURL();
    },
    onCropData(){
        let w = this.refs.crop.offsetWidth;
        let h = this.refs.crop.offsetHeight;
        let l = this.refs.crop.offsetLeft;
        let t = this.refs.crop.offsetTop;
        let img = new Image();
        img.src = this.refs.img.src;
        let ratio = img.width/this.refs.react_image_crop_component.offsetWidth;
        let ratioH = ratio;
        if(img.height>img.width) ratioH = img.height/this.refs.react_image_crop_component.offsetHeight;
        if(ratio<1) ratio=1;
        if(ratioH<1) ratioH=1;
        return ({ t: t*ratio, l: l*ratio, w: w*ratioH, h: h*ratioH });
    }
});


let Demo = React.createClass({
    render(){
        return (<div style={{width: "700px", height: "600px", margin: "0 auto"}}>
            <ReactImageCrop square={false} onCrop={this.onCropped} onCropData={this.onCroppedData}  onChange={this.onChanged} src="demo.jpg"/>
        </div>);
    },
    onChanged: function (e) {
        //console.log(e);
    },
    onCropped: function (e) {
        //console.log(e);
    },
    onCroppedData: function (e) {
        //console.log(e);
    }
});


ReactDOM.render(<Demo/>, document.getElementById('app'));
