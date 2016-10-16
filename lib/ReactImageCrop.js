var React = require('react');

var ReactImageCrop = React.createClass({
    displayName: 'ReactImageCrop',
    propTypes: {
        src: React.PropTypes.string,
        onCrop: React.PropTypes.func,
        onCropData: React.PropTypes.func,
        onChange: React.PropTypes.func,
        square: React.PropTypes.bool
    },
    getInitialState() {
        return ({
            src: this.props.src,
            active: false,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            selected: false,
            move: false,
            square: this.props.square || false,
            style1: {
                width: "auto",
                height: "auto",
                minWidth: "0",
                position: "relative",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none"
            },
            style2: {
                width: "0",
                height: "0",
                background: "transparent",
                position: "absolute",
                cursor: "move",
                border: "dashed #ffffff 3px",
                zIndex: "2",
                borderRadius: "4px",
                overflow: "hidden",
                display: "none"
            },
            style3: {
                width: "100%",
                height: "100%",
                background: "rgba(33, 33, 33, 0.6)",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "1",
                cursor: "crosshair"
            },
            style4: {
                maxHeight: "100%",
                maxWidth: "100%"
            }
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
            block.style.width = img.offsetWidth+"px";
            block.style.height = img.offsetHeight+"px";
            preview.style.width = img.offsetWidth+"px";
            preview.style.height = img.offsetHeight+"px";
            a.setState({
                blockX: block.getBoundingClientRect().left,
                blockY: block.getBoundingClientRect().top
            });
        };
    },
    render() {
        return <div style={this.state.style1} ref="react_image_crop_component" onMouseLeave={this.mouseLeave} onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>
            <div style={this.state.style2} ref="crop">
                <img src={this.state.src} className="react-image-crop-component-preview" ref="preview"/>
            </div>
            <div style={this.state.style3}/>
            <img style={this.state.style4} ref="img" src={this.state.src}/>
        </div>;
    },
    mouseDown(e) {
        e.preventDefault();
        if(!this.state.active && !this.state.selected) {
            this.setState({
                active: true,
                startX: e.pageX - this.state.blockX,
                startY: e.pageY - this.state.blockY
            });
        }
        else if(this.state.selected){
            if(e.target.className=="react-image-crop-component-crop" || e.target.className=="react-image-crop-component-preview") {
                this.setState({
                    move: true,
                    startX: e.pageX - this.state.blockX,
                    startY: e.pageY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", ""))
                });
            }
            else{
                let crop = this.refs.crop;
                this.setState({
                    active: true,
                    startX: e.pageX - this.state.blockX,
                    startY: e.pageY - this.state.blockY
                });
            }
        }
    },
    mouseMove(e) {
        e.preventDefault();
        if(this.state.active){
            let crop = this.refs.crop;
            let block = this.refs.react_image_crop_component;
            let x = (e.pageX - this.state.blockX) - this.state.startX;
            let y = (e.pageY - this.state.blockY) - this.state.startY;
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
                l = (e.pageX - this.state.blockX);
                t = (e.pageY - this.state.blockY);
                w = this.state.startX-l;
                h = this.state.startY-t;
                if(this.props.square) w=h;
            }
            else if(x!=0 && y!=0){
                l = this.state.startX;
                t = this.state.startY;
                w = x;
                h = y;
                if(this.propss.square) h=w;
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
            let l = -1*(this.state.startX - e.pageX + this.state.blockX);
            let t = -1*(this.state.startY - e.pageY + this.state.blockY);
            l = (this.state.moveX+l);
            t = (this.state.moveY+t);
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
    },
    mouseLeave(e) {
        if(this.state.move) {
            this.setState({move: false});
        }
        else if(this.state.resizeP1) {
            this.setState({resizeP1: false});
        }
        else if(this.state.resizeP2) {
            this.setState({resizeP2: false});
        }
        else if(this.state.resizeP3) {
            this.setState({resizeP3: false});
        }
        else if(this.state.resizeP4) {
            this.setState({resizeP4: false});
        }
    },
    renderPreview(){
        let crop = this.refs.crop;
        this.refs.preview.style.marginTop = "-"+crop.style.top;
        this.refs.preview.style.marginLeft = "-"+crop.style.left;
        if(this.props.onChange) this.props.onChange({
            t: this.refs.crop.offsetTop,
            l: this.refs.crop.offsetLeft,
            w: this.refs.crop.offsetWidth,
            h: this.refs.crop.offsetHeight
        });
    },
    onCrop(){
        let crop = this.refs.crop;
        let image = this.refs.img;
        let w = crop.offsetWidth;
        let h = crop.offsetHeight;
        let l = crop.offsetLeft;
        let t = crop.offsetTop;

        let canvas = document.createElement('canvas');
        let img = new Image();
        img.src = image.src;
        let ratioW = img.width / image.width;
        let ratioH = img.height / image.height;
        if(ratioW<1) ratioW=1;
        if(ratioH<1) ratioH=1;
        canvas.width = w*ratioW;
        canvas.height = h*ratioH;

        canvas.getContext('2d').drawImage(img, -l*ratioW, -t*ratioH, img.width, img.height);
        return canvas.toDataURL();
    },
    onCropData(){
        let crop = this.refs.crop;
        let image = this.refs.img;
        let w = crop.offsetWidth;
        let h = crop.offsetHeight;
        let l = crop.offsetLeft;
        let t = crop.offsetTop;
        let img = new Image();
        img.src = image.src;
        let ratio = img.width/this.refs.react_image_crop_component.offsetWidth;
        let ratioH = ratio;
        if(img.height>img.width) ratioH = img.height/this.refs.react_image_crop_component.offsetHeight;
        if(ratio<1) ratio=1;
        if(ratioH<1) ratioH=1;
        return ({
            t: t*ratio,
            l: l*ratio,
            w: w*ratioH,
            h: h*ratioH
        });
    }
});

module.exports = ReactImageCrop;