const React = require('react');
require ('./style.css');
let dbTimeout,
    dbLastTap = 0;

const ReactImageCrop = React.createClass({
    displayName: 'ReactImageCrop',
    propTypes: {
        src: React.PropTypes.string,
        setWidth: React.PropTypes.number,
        setHeight: React.PropTypes.number,
        square: React.PropTypes.bool,
        resize: React.PropTypes.bool,
        border: React.PropTypes.string,
        onCrop: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            resize: true
        };
    },
    getInitialState() {
        return ({
            activeCropBlock: false,
            moveCropBlock: false,
            resizeCropBlock: false,
            status: false,
            resizeDirection: 0,
            blockX: 0,
            blockY: 0,
            start: {
                x: 0,
                y: 0
            },
            moveData:{
                diffX: 0,
                diffY: 0,
                eWi: 0,
                eHe: 0,
                cWi: 0,
                cHe: 0
            },
            cropSize: {
                w: 0,
                h: 0
            },
            resize: {
                w : 0,
                h: 0
            },
            dbTime: 0,
            dbTimeout: 0
        });
    },
    componentDidMount(){
        document.addEventListener("mousemove", this._mouseMove);
        document.addEventListener("mouseup", this._mouseUp);
        document.addEventListener("touchmove", this._mouseMove);
        document.addEventListener("touchend", this._dbTab);
        let image = new Image();
        image.src = this.props.src;
        let a = this;
        image.onload = function () {
            let block = a.refs.RICC_main_container,
                crop = a.refs.RICC_crop_preview,
                img = a.refs.RICC_image,
                w = a.props.setWidth || img.offsetWidth,
                h = a.props.setHeight || img.offsetHeight;

            if(w>window.innerWidth) w = window.innerWidth;
            if(h>window.innerHeight) h = window.innerHeight;

            block.style.width = w+"px";
            block.style.height = h+"px";
            crop.style.width = w+"px";
            crop.style.height = h+"px";

            if (parseInt(block.style.width.replace('px', '')) > a.refs.RICC_image.width) w = a.refs.RICC_image.width;
            if (parseInt(block.style.height.replace('px', '')) > a.refs.RICC_image.height) h = a.refs.RICC_image.height;

            block.style.width = w+"px";
            block.style.height = h+"px";
            crop.style.width = w+"px";
            crop.style.height = h+"px";

            a.setState({
                blockX: block.getBoundingClientRect().left,
                blockY: block.getBoundingClientRect().top
            });
        };
    },
    render(){
        return(<div className="RICC_main_container" ref="RICC_main_container" onTouchStart={this._mouseDown}
                    onMouseDown={this._mouseDown} onDoubleClick={this._resetCrop}>
            <div className="RICC_crop_block" ref="RICC_crop_block">
                <div style={this.props.borderStyle ? { borderLeft: this.props.borderStyle } : {}}
                     className={"RICC_crop_block_left_resize" + (this.props.resize ?
                         " RICC_crop_block_left_right_cursor" : "")} ref="RICC_crop_block_left_resize"/>
                <div style={this.props.borderStyle ? { borderRight: this.props.borderStyle } : {}}
                     className={"RICC_crop_block_right_resize" + (this.props.resize ?
                         " RICC_crop_block_left_right_cursor" : "")} ref="RICC_crop_block_right_resize"/>
                <div style={this.props.borderStyle ? { borderTop: this.props.borderStyle } : {}}
                     className={"RICC_crop_block_top_resize" + (this.props.resize ?
                         " RICC_crop_block_top_bottom_cursor" : "")} ref="RICC_crop_block_top_resize"/>
                <div style={this.props.borderStyle ? { borderBottom: this.props.borderStyle } : {}}
                     className={"RICC_crop_block_bottom_resize" + (this.props.resize ?
                         " RICC_crop_block_top_bottom_cursor" : "")} ref="RICC_crop_block_bottom_resize"/>
                <div className="RICC_crop_preview"><img src={this.props.src} ref="RICC_crop_preview"/></div>
            </div>
            <div className="RICC_bg" ref="RICC_bg_block"/>
            <img className="RICC_image" ref="RICC_image" src={this.props.src}/>
        </div>);
    },
    _mouseDown(e){
        e.preventDefault();
        let main_block = this.refs.RICC_main_container,
            crop_block = this.refs.RICC_crop_block,
            bg_block = this.refs.RICC_bg_block,
            preview_block = this.refs.RICC_crop_preview,
            resize_left_block = this.refs.RICC_crop_block_left_resize,
            resize_right_block = this.refs.RICC_crop_block_right_resize,
            resize_top_block = this.refs.RICC_crop_block_top_resize,
            resize_bottom_block = this.refs.RICC_crop_block_bottom_resize,
            mousePosX = e.clientX || Math.round(e.touches[0].clientX),
            mousePosY = e.clientY || Math.round(e.touches[0].clientY);

        if(!this.state.activeCropBlock){
            // CREATE CROP BLOCK FUNCTION
            crop_block.style.top = mousePosY - this.state.blockY+"px";
            crop_block.style.left = mousePosX - this.state.blockX+"px";
            preview_block.style.marginTop = "-"+(mousePosY - this.state.blockY)+"px";
            preview_block.style.marginLeft = "-"+(mousePosX - this.state.blockX)+"px";
            crop_block.style.display = "block";
            this.setState({
                start: {
                    x: mousePosX,
                    y: mousePosY
                }
            });
        }
        else if(this.state.activeCropBlock){
            if(e.target===bg_block){
                // NEW CROP BLOCK FUNCTION
                crop_block.style.top = mousePosY - this.state.blockY+"px";
                crop_block.style.left = mousePosX - this.state.blockX+"px";
                preview_block.style.marginTop = "-"+(mousePosY - this.state.blockY)+"px";
                preview_block.style.marginLeft = "-"+(mousePosX - this.state.blockX)+"px";
                crop_block.style.width = "0px";
                crop_block.style.height = "0px";
                this.setState({
                    activeCropBlock: false,
                    start: {
                        x: mousePosX,
                        y: mousePosY
                    }
                });
            }
            else if(e.target===crop_block || e.target===preview_block ||
                ((e.target===resize_left_block || e.target===resize_right_block ||
                e.target===resize_top_block || e.target===resize_bottom_block) && !this.props.resize)){
                // MOVE FUNCTION
                let divTop = crop_block.style.top.replace('px',''),
                    divLeft = crop_block.style.left.replace('px',''),
                    eWi = parseInt(this.state.cropSize.w),
                    eHe = parseInt(this.state.cropSize.h),
                    cWi = parseInt(main_block.style.width),
                    cHe = parseInt(main_block.style.height),
                    diffX = mousePosX - divLeft,
                    diffY = mousePosY - divTop;
                this.setState({
                    moveCropBlock: true,
                    moveData:{
                        diffX: diffX,
                        diffY: diffY,
                        eWi: eWi,
                        eHe: eHe,
                        cWi: cWi,
                        cHe: cHe
                    }
                });
            }
            else if(e.target===resize_left_block || e.target===resize_right_block ||
                e.target===resize_top_block || e.target===resize_bottom_block){
                if(this.props.resize){
                    // RESIZE FUNCTION
                    let block=0;
                    if(e.target===resize_left_block) block=1;
                    else if(e.target===resize_right_block) block=2;
                    else if(e.target===resize_top_block) block=3;
                    else if(e.target===resize_bottom_block) block=4;
                    this.setState({
                        resizeCropBlock: true,
                        resizeDirection: block,
                        start: {
                            x: mousePosX,
                            y: mousePosY
                        },
                        resize: {
                            w: parseInt(crop_block.style.width.replace('px', '')),
                            h: parseInt(crop_block.style.height.replace('px', ''))
                        }
                    });
                }
            }
        }

        this.setState({status: true});
    },
    _mouseMove(e){
        if (this.state.status){
            e.preventDefault();
            let main_block = this.refs.RICC_main_container,
                crop_block = this.refs.RICC_crop_block,
                preview_block = this.refs.RICC_crop_preview,
                mousePosX = e.pageX || Math.round(e.touches[0].clientX),
                mousePosY = e.pageY || Math.round(e.touches[0].clientY);

            if(!this.state.activeCropBlock){
                let startX = this.state.start.x,
                    startY = this.state.start.y,
                    bWi = parseInt(main_block.style.width.replace('px', '')),
                    bLeft = this.state.blockX,
                    bHe = parseInt(main_block.style.height.replace('px', '')),
                    bTop = this.state.blockY,
                    aX = mousePosX - startX,
                    aY = mousePosY - startY,
                    left_right = true,
                    top_bottom = true;

                if (aX<0){
                    let l = parseInt(mousePosX - this.state.blockX);
                    aX = startX - mousePosX;
                    preview_block.style.marginLeft = "-"+(mousePosX - this.state.blockX)+"px";
                    crop_block.style.left = l+"px";
                    left_right = false;
                }
                if(aX>0 && left_right){
                    crop_block.style.top = startY - this.state.blockY+"px";
                    crop_block.style.left = startX - this.state.blockX+"px";
                    preview_block.style.marginTop = "-"+(startY - this.state.blockY)+"px";
                    preview_block.style.marginLeft = "-"+(startX - this.state.blockX)+"px";
                }
                if (aY<0){
                    let t = parseInt(mousePosY - this.state.blockY);
                    aY = startY - mousePosY;
                    preview_block.style.marginTop = "-"+(mousePosY - this.state.blockY)+"px";
                    crop_block.style.top = t+"px";
                    top_bottom = false;
                }

                if(this.props.square && top_bottom) aY=aX;
                else if(this.props.square && !top_bottom) aX=aY;

                if (aX > ((bWi+bLeft)-startX) && left_right) {
                    aX = ((bWi+bLeft)-startX);
                    if(this.props.square) aY=aX;
                }
                if (aX > (bWi-((bWi+bLeft)-startX)) && !left_right){
                    aX = (bWi-((bWi+bLeft)-startX));
                    preview_block.style.marginLeft = "-1px";
                    crop_block.style.left = "0px";
                    if(this.props.square) aY=aX;
                }

                if (aY > ((bHe+bTop)-startY) && top_bottom) {
                    aY = ((bHe+bTop)-startY);
                    if(this.props.square) aX=aY;
                }
                if (aY > (bHe-((bHe+bTop)-startY)) && !top_bottom){
                    aY = (bHe-((bHe+bTop)-startY));
                    preview_block.style.marginTop = "-1px";
                    crop_block.style.top = "0px";
                    if(this.props.square) aX=aY;
                }

                crop_block.style.width = aX+"px";
                crop_block.style.height = aY+"px";
                this.setState({
                    cropSize:{
                        w: aX,
                        h: aY
                    }
                });
            }
            else{
                if(this.state.moveCropBlock){
                    let aX = mousePosX - this.state.moveData.diffX,
                        aY = mousePosY - this.state.moveData.diffY;
                    if (aX < 0) aX = 0;
                    if (aY < 0) aY = 0;
                    if (aX + this.state.moveData.eWi > this.state.moveData.cWi) aX = this.state.moveData.cWi - this.state.moveData.eWi;
                    if (aY + this.state.moveData.eHe > this.state.moveData.cHe) aY = this.state.moveData.cHe - this.state.moveData.eHe;
                    crop_block.style.left = aX + 'px';
                    crop_block.style.top = aY + 'px';
                    preview_block.style.marginTop = "-"+(aY)+"px";
                    preview_block.style.marginLeft = "-"+(aX)+"px";
                }
                if(this.state.resizeCropBlock){
                    let startX = this.state.start.x,
                        startY = this.state.start.y,
                        bWi = parseInt(main_block.style.width.replace('px', '')),
                        bLeft = this.state.blockX,
                        bHe = parseInt(main_block.style.height.replace('px', '')),
                        bTop = this.state.blockY,
                        aX = mousePosX - startX,
                        aY = mousePosY - startY;

                    if (this.state.resizeDirection===2){
                        aX = this.state.resize.w + aX;
                        if (aX > ((bWi+bLeft)-startX+this.state.resize.w)) aX = ((bWi+bLeft)-startX+this.state.resize.w-2);
                        crop_block.style.width = aX+"px";
                        this.setState({ cropSize:{ w: aX, h: this.state.cropSize.h } });
                    }
                    else if (this.state.resizeDirection===1){
                        let l = parseInt(mousePosX - this.state.blockX);
                        aX = this.state.resize.w - aX;
                        if (l < 0) {
                            preview_block.style.marginLeft = "-1px";
                            crop_block.style.left = "0px";
                        }
                        else{
                            preview_block.style.marginLeft = "-"+(mousePosX - this.state.blockX)+"px";
                            crop_block.style.left = l+"px";
                            crop_block.style.width = aX+"px";
                            this.setState({ cropSize:{ w: aX, h: this.state.cropSize.h } });
                        }
                    }
                    else if (this.state.resizeDirection===4){
                        aY = this.state.resize.h + aY;
                        if (aY > ((bHe+bTop)-startY+this.state.resize.h)) aY = ((bHe+bTop)-startY+this.state.resize.h-2);
                        crop_block.style.height = aY+"px";
                        this.setState({ cropSize:{ h: aY, w: this.state.cropSize.w } });
                    }
                    else if (this.state.resizeDirection===3){
                        let t = parseInt(mousePosY - this.state.blockY);
                        aY = this.state.resize.h - aY;
                        if (t < 0) {
                            preview_block.style.marginTop = "-1px";
                            crop_block.style.top = "0px";
                        }
                        else{
                            preview_block.style.marginTop = "-"+(mousePosY - this.state.blockY)+"px";
                            crop_block.style.top = t+"px";
                            crop_block.style.height = aY+"px";
                            this.setState({ cropSize:{ h: aY, w: this.state.cropSize.w } });
                        }
                    }
                }
            }
        }
    },
    _mouseUp(e){
        if(this.state.status){
            e.preventDefault();
            if(!this.state.activeCropBlock) this.setState({activeCropBlock: true});
            if(this.state.moveCropBlock) this.setState({moveCropBlock: false});
            if(this.state.resizeCropBlock) this.setState({resizeCropBlock: false, resizeDirection: 0});
            if(this.props.onCrop) this.props.onCrop(this._onCrop());
            this.setState({status: false});
        }
    },
    _onCrop(){
        let w = this.refs.RICC_crop_block.offsetWidth,
            h = this.refs.RICC_crop_block.offsetHeight,
            l = this.refs.RICC_crop_block.offsetLeft,
            t = this.refs.RICC_crop_block.offsetTop,
            img = new Image(),
            canvas = document.createElement('canvas');
        img.src = this.refs.RICC_image.src;
        let ratioW = img.width / this.refs.RICC_image.width,
            ratioH = img.height / this.refs.RICC_image.height;
        if(ratioW<1) ratioW=1;
        if(ratioH<1) ratioH=1;
        canvas.width = w*ratioW;
        canvas.height = h*ratioH;
        canvas.getContext('2d').drawImage(img, -l*ratioW, -t*ratioH, img.width, img.height);

        let ratio = img.width/this.refs.RICC_main_container.offsetWidth;
        ratioH = ratio;
        if(img.height>img.width) ratioH = img.height/this.refs.RICC_main_container.offsetHeight;
        if(ratio<1) ratio=1;
        if(ratioH<1) ratioH=1;

        return [canvas.toDataURL(), { y: t*ratio, x: l*ratio, w: w*ratioH, h: h*ratioH }];
    },
    _resetCrop(){
        let crop_block = this.refs.RICC_crop_block,
            preview_block = this.refs.RICC_crop_preview;
        crop_block.style.top = "0px";
        crop_block.style.left = "0px";
        crop_block.style.width = "0px";
        crop_block.style.height = "0px";
        preview_block.style.marginTop = "0px";
        preview_block.style.marginLeft = "0px";
        crop_block.style.display = "none";
        this.setState({
            activeCropBlock: false
        });
    },
    _dbTab(e){
        let currentTime = new Date().getTime();
        let tapLength = currentTime - dbLastTap;
        if (tapLength < 250 && tapLength > 0) {
            console.log(tapLength);
            this._resetCrop();
            e.preventDefault();
        } else this._mouseUp(e);
        dbLastTap = currentTime;
    }
});

module.exports = ReactImageCrop;
