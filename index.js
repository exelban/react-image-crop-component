'use strict';

var React = require('react');
require('./style.css');

var ReactImageCrop = React.createClass({
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
    getDefaultProps: function getDefaultProps() {
        return {
            resize: true
        };
    },
    getInitialState: function getInitialState() {
        return {
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
        };
    },
    componentDidMount: function componentDidMount() {
        var image = new Image();
        image.src = this.props.src;
        var a = this;
        image.onload = function () {
            var block = a.refs.react_image_crop_component;
            var preview = a.refs.preview;
            var img = a.refs.img;
            var w = a.props.setWidth || img.offsetWidth;
            var h = a.props.setHeight || img.offsetHeight;
            block.style.width = w + "px";
            block.style.height = h + "px";
            preview.style.width = w + "px";
            preview.style.height = h + "px";
            a.setState({
                blockX: block.getBoundingClientRect().left,
                blockY: block.getBoundingClientRect().top
            });
        };
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'block', ref: 'react_image_crop_component',
                onTouchCancel: this.mouseLeave, onTouchStart: this.mouseDown, onTouchMove: this.mouseMove, onTouchEnd: this.mouseUp,
                onMouseLeave: this.mouseLeave, onMouseDown: this.mouseDown, onMouseMove: this.mouseMove, onMouseUp: this.mouseUp },
            React.createElement(
                'div',
                { className: 'crop', ref: 'crop' },
                this.props.resize ? React.createElement(
                    'div',
                    { className: 'resizeP0', ref: 'previewDIV' },
                    React.createElement('div', { className: 'resizeP1', ref: 'resizeP1' }),
                    React.createElement('div', { className: 'resizeP2', ref: 'resizeP2' }),
                    React.createElement('div', { className: 'resizeP3', ref: 'resizeP3' }),
                    React.createElement('div', { className: 'resizeP4', ref: 'resizeP4' }),
                    React.createElement('div', { className: 'resizeP5', ref: 'resizeP5' }),
                    React.createElement('div', { className: 'resizeP6', ref: 'resizeP6' }),
                    React.createElement('div', { className: 'resizeP7', ref: 'resizeP7' }),
                    React.createElement('div', { className: 'resizeP8', ref: 'resizeP8' })
                ) : null,
                React.createElement(
                    'div',
                    { className: 'preview' },
                    React.createElement('img', { src: this.state.src, ref: 'preview' })
                )
            ),
            React.createElement('div', { className: 'bg' }),
            React.createElement('img', { className: 'img', ref: 'img', src: this.state.src })
        );
    },
    mouseDown: function mouseDown(e) {
        e.preventDefault();
        var posX = e.pageX || Math.round(e.touches[0].clientX);
        var posY = e.pageY || Math.round(e.touches[0].clientY);
        if (!this.state.active && !this.state.selected) {
            this.setState({
                active: true,
                startX: posX - this.state.blockX,
                startY: posY - this.state.blockY
            });
        } else if (this.state.selected) {
            if (e.target == this.refs.preview || e.target == this.refs.previewDIV) {
                this.setState({
                    move: true,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            } else if (e.target == this.refs.resizeP1) {
                this.setState({
                    resizeCrop: 1,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", ""))
                });
            } else if (e.target == this.refs.resizeP2) {
                this.setState({
                    resizeCrop: 2,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", ""))
                });
            } else if (e.target == this.refs.resizeP3) {
                this.setState({
                    resizeCrop: 3,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            } else if (e.target == this.refs.resizeP4) {
                this.setState({
                    resizeCrop: 4,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            } else if (e.target == this.refs.resizeP5) {
                this.setState({
                    resizeCrop: 5,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            } else if (e.target == this.refs.resizeP6) {
                this.setState({
                    resizeCrop: 6,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            } else if (e.target == this.refs.resizeP7) {
                this.setState({
                    resizeCrop: 7,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            } else if (e.target == this.refs.resizeP8) {
                this.setState({
                    resizeCrop: 8,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY,
                    moveX: parseFloat(this.refs.crop.style.left.replace("px", "")),
                    moveY: parseFloat(this.refs.crop.style.top.replace("px", "")),
                    resizeW: parseFloat(this.refs.crop.style.width.replace("px", "")),
                    resizeH: parseFloat(this.refs.crop.style.height.replace("px", ""))
                });
            } else {
                this.setState({
                    active: true,
                    startX: posX - this.state.blockX,
                    startY: posY - this.state.blockY
                });
            }
        }
    },
    mouseMove: function mouseMove(e) {
        e.preventDefault();
        var posX = e.pageX || Math.round(e.touches[0].clientX);
        var posY = e.pageY || Math.round(e.touches[0].clientY);
        if (this.state.active) {
            var crop = this.refs.crop;
            var block = this.refs.react_image_crop_component;
            var x = posX - this.state.blockX - this.state.startX;
            var y = posY - this.state.blockY - this.state.startY;
            var w = 0;
            var h = 0;
            var l = 0;
            var t = 0;

            if (x < 0 && y > 0 && x != 0 && y != 0) {
                t = this.state.startY;
                h = y;
                l = this.state.startX - -1 * x;
                w = this.state.startX - l;
                if (this.props.square) h = w;
            } else if (y < 0 && x > 0 && x != 0 && y != 0) {
                l = this.state.startX;
                w = x;
                t = this.state.startY - -1 * y;
                h = this.state.startY - t;
                if (this.props.square) w = h;
            } else if (x < 0 && y < 0 && x != 0 && y != 0) {
                l = posX - this.state.blockX;
                t = posY - this.state.blockY;
                w = this.state.startX - l;
                h = this.state.startY - t;
                if (this.props.square) w = h;
            } else if (x != 0 && y != 0) {
                l = this.state.startX;
                t = this.state.startY;
                w = x;
                h = y;
                if (this.props.square) h = w;
            } else {
                l = 0;
                t = 0;
                w = 0;
                h = 0;
            }

            if (l + w < block.offsetWidth && t + h < block.offsetHeight && l > 0 && t > 0) {
                if (this.refs.crop.style.display != "block") this.refs.crop.style.display = "block";
                crop.style.left = l + "px";
                crop.style.top = t + "px";
                crop.style.width = w + "px";
                crop.style.height = h + "px";
                this.renderPreview();
            }
        } else if (this.state.move) {
            var _crop = this.refs.crop;
            var _block = this.refs.react_image_crop_component;
            var _l = this.state.moveX - 1 * (this.state.startX - posX + this.state.blockX);
            var _t = this.state.moveY - 1 * (this.state.startY - posY + this.state.blockY);
            var a1_1 = _l + parseFloat(_crop.style.width.replace("px", ""));
            var a1_2 = _block.offsetWidth;
            var a2_1 = _t + parseFloat(_crop.style.height.replace("px", ""));
            var a2_2 = _block.offsetHeight;

            if (_l > 0 && _t > 0 && a1_1 < a1_2 && a2_1 < a2_2) {
                _crop.style.left = _l + "px";
                _crop.style.top = _t + "px";
                this.renderPreview();
            }
        } else if (this.state.resizeCrop != null) {
            var _block2 = this.refs.react_image_crop_component;
            var _crop2 = this.refs.crop;
            if (this.state.resizeCrop == 1) {
                var _l2 = this.state.moveX - 1 * (this.state.startX - posX + this.state.blockX);
                var _w = this.state.resizeW + 1 * (this.state.startX - posX + this.state.blockX);
                if (_l2 > 0) {
                    if (this.state.square && _w + _crop2.offsetTop < _block2.offsetHeight) {
                        _crop2.style.left = _l2 + "px";
                        _crop2.style.width = _w + "px";
                        _crop2.style.height = _w + "px";
                    } else if (!this.state.square) {
                        _crop2.style.left = _l2 + "px";
                        _crop2.style.width = _w + "px";
                    }
                }
            } else if (this.state.resizeCrop == 2) {
                var _w2 = this.state.resizeW - 1 * (this.state.startX - posX + this.state.blockX);
                if (_crop2.offsetLeft + _w2 < _block2.offsetWidth) {
                    if (this.state.square && _w2 + _crop2.offsetTop < _block2.offsetHeight) {
                        _crop2.style.width = _w2 + "px";
                        _crop2.style.height = _w2 + "px";
                    } else if (!this.state.square) _crop2.style.width = _w2 + "px";
                }
            } else if (this.state.resizeCrop == 3) {
                var _t2 = this.state.moveY - 1 * (this.state.startY - posY + this.state.blockY);
                var _h = this.state.resizeH + 1 * (this.state.startY - posY + this.state.blockY);
                if (_t2 > 0) {
                    if (this.state.square && _h + _crop2.offsetLeft < _block2.offsetWidth) {
                        _crop2.style.top = _t2 + "px";
                        _crop2.style.height = _h + "px";
                        _crop2.style.width = _h + "px";
                    } else if (!this.state.square) {
                        _crop2.style.top = _t2 + "px";
                        _crop2.style.height = _h + "px";
                    }
                }
            } else if (this.state.resizeCrop == 4) {
                var _h2 = this.state.resizeH - 1 * (this.state.startY - posY + this.state.blockY);
                if (_crop2.offsetTop + _h2 < _block2.offsetHeight) {
                    if (this.state.square && _h2 + _crop2.offsetLeft < _block2.offsetWidth) {
                        _crop2.style.height = _h2 + "px";
                        _crop2.style.width = _h2 + "px";
                    } else if (!this.state.square) _crop2.style.height = _h2 + "px";
                }
            } else if (this.state.resizeCrop == 5) {
                var _l3 = this.state.moveX - 1 * (this.state.startX - posX + this.state.blockX);
                var _w3 = this.state.resizeW + 1 * (this.state.startX - posX + this.state.blockX);
                var _t3 = this.state.moveY - 1 * (this.state.startY - posY + this.state.blockY);
                var _h3 = this.state.resizeH + 1 * (this.state.startY - posY + this.state.blockY);
                if (_l3 > 0 && _t3 > 0) {
                    if (this.state.square && _w3 + _crop2.offsetLeft < _block2.offsetWidth && _h3 + _crop2.offsetTop < _block2.offsetHeight) {
                        _crop2.style.left = _l3 + "px";
                        _crop2.style.top = _t3 + "px";
                        _crop2.style.width = _w3 + "px";
                        _crop2.style.height = _h3 + "px";
                    } else if (!this.state.square) {
                        _crop2.style.left = _l3 + "px";
                        _crop2.style.width = _w3 + "px";
                        _crop2.style.top = _t3 + "px";
                        _crop2.style.height = _h3 + "px";
                    }
                }
            } else if (this.state.resizeCrop == 6) {
                var _w4 = this.state.resizeW - 1 * (this.state.startX - posX + this.state.blockX);
                var _t4 = this.state.moveY - 1 * (this.state.startY - posY + this.state.blockY);
                var _h4 = this.state.resizeH + 1 * (this.state.startY - posY + this.state.blockY);
                if (_t4 > 0 && _crop2.offsetTop + _h4 < _block2.offsetHeight) {
                    if (this.state.square && _h4 + _crop2.offsetLeft < _block2.offsetWidth && _h4 + _crop2.offsetTop < _block2.offsetHeight) {
                        _crop2.style.top = _t4 + "px";
                        _crop2.style.height = _h4 + "px";
                        _crop2.style.width = _h4 + "px";
                    } else if (!this.state.square) {
                        _crop2.style.top = _t4 + "px";
                        _crop2.style.height = _h4 + "px";
                        _crop2.style.width = _w4 + "px";
                    }
                }
            } else if (this.state.resizeCrop == 7) {
                var _w5 = this.state.resizeW - 1 * (this.state.startX - posX + this.state.blockX);
                var _h5 = this.state.resizeH - 1 * (this.state.startY - posY + this.state.blockY);
                if (_crop2.offsetLeft + _w5 < _block2.offsetWidth && _crop2.offsetTop + _h5 < _block2.offsetHeight) {
                    if (this.state.square && _w5 + _crop2.offsetTop < _block2.offsetHeight && _w5 + _crop2.offsetLeft < _block2.offsetWidth) {
                        _crop2.style.width = _w5 + "px";
                        _crop2.style.height = _w5 + "px";
                    } else if (!this.state.square) {
                        _crop2.style.width = _w5 + "px";
                        _crop2.style.height = _h5 + "px";
                    }
                }
            } else if (this.state.resizeCrop == 8) {
                var _l4 = this.state.moveX - 1 * (this.state.startX - posX + this.state.blockX);
                var _w6 = this.state.resizeW + 1 * (this.state.startX - posX + this.state.blockX);
                var _h6 = this.state.resizeH - 1 * (this.state.startY - posY + this.state.blockY);
                if (_l4 > 0 && _crop2.offsetTop + _h6 < _block2.offsetHeight) {
                    if (this.state.square && _w6 + _crop2.offsetTop < _block2.offsetHeight && _w6 + _crop2.offsetLeft < _block2.offsetWidth) {
                        _crop2.style.left = _l4 + "px";
                        _crop2.style.width = _w6 + "px";
                        _crop2.style.height = _w6 + "px";
                    } else if (!this.state.square) {
                        _crop2.style.left = _l4 + "px";
                        _crop2.style.width = _w6 + "px";
                        _crop2.style.height = _h6 + "px";
                    }
                }
            }
            this.renderPreview();
        }
    },
    mouseUp: function mouseUp(e) {
        e.preventDefault();
        if (this.state.active) {
            if (this.props.onCrop) this.props.onCrop(this.onCrop());
            if (this.props.onCropData) this.props.onCropData(this.onCropData());
            this.setState({ active: false, selected: true });
        } else if (this.state.move) {
            if (this.props.onCrop) this.props.onCrop(this.onCrop());
            if (this.props.onCropData) this.props.onCropData(this.onCropData());
            this.setState({ move: false });
        } else if (this.state.resizeCrop != null) {
            if (this.props.onCrop) this.props.onCrop(this.onCrop());
            if (this.props.onCropData) this.props.onCropData(this.onCropData());
            this.setState({ resizeCrop: null });
        }
        this.setState({
            src: this.props.src,
            active: false,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            resizeW: 0,
            resizeH: 0
        });
    },
    renderPreview: function renderPreview() {
        this.refs.preview.style.marginTop = "-" + this.refs.crop.style.top;
        this.refs.preview.style.marginLeft = "-" + this.refs.crop.style.left;
        if (this.props.onChange) {
            this.props.onChange({
                t: this.refs.crop.offsetTop,
                l: this.refs.crop.offsetLeft,
                w: this.refs.crop.offsetWidth,
                h: this.refs.crop.offsetHeight
            });
        }
    },
    onCrop: function onCrop() {
        var w = this.refs.crop.offsetWidth;
        var h = this.refs.crop.offsetHeight;
        var l = this.refs.crop.offsetLeft;
        var t = this.refs.crop.offsetTop;
        var canvas = document.createElement('canvas');
        var img = new Image();
        img.src = this.refs.img.src;
        var ratioW = img.width / this.refs.img.width;
        var ratioH = img.height / this.refs.img.height;
        if (ratioW < 1) ratioW = 1;
        if (ratioH < 1) ratioH = 1;
        canvas.width = w * ratioW;
        canvas.height = h * ratioH;
        canvas.getContext('2d').drawImage(img, -l * ratioW, -t * ratioH, img.width, img.height);
        return canvas.toDataURL();
    },
    onCropData: function onCropData() {
        var w = this.refs.crop.offsetWidth;
        var h = this.refs.crop.offsetHeight;
        var l = this.refs.crop.offsetLeft;
        var t = this.refs.crop.offsetTop;
        var img = new Image();
        img.src = this.refs.img.src;
        var ratio = img.width / this.refs.react_image_crop_component.offsetWidth;
        var ratioH = ratio;
        if (img.height > img.width) ratioH = img.height / this.refs.react_image_crop_component.offsetHeight;
        if (ratio < 1) ratio = 1;
        if (ratioH < 1) ratioH = 1;
        return { t: t * ratio, l: l * ratio, w: w * ratioH, h: h * ratioH };
    }
});

module.exports = ReactImageCrop;
