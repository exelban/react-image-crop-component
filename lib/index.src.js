'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dbLastTap = 0;

var ReactImageCrop = function (_Component) {
    _inherits(ReactImageCrop, _Component);

    function ReactImageCrop(props) {
        _classCallCheck(this, ReactImageCrop);

        var _this = _possibleConstructorReturn(this, (ReactImageCrop.__proto__ || Object.getPrototypeOf(ReactImageCrop)).call(this, props));

        _this.state = {
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
            moveData: {
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
                w: 0,
                h: 0
            }
        };
        _this.mouseDown = _this._mouseDown.bind(_this);
        _this.resetCrop = _this._resetCrop.bind(_this);
        _this.mouseMove = _this._mouseMove.bind(_this);
        _this.mouseUp = _this._mouseUp.bind(_this);
        _this.dbTab = _this._dbTab.bind(_this);
        return _this;
    }

    _createClass(ReactImageCrop, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener("mousemove", this.mouseMove);
            document.addEventListener("mouseup", this.mouseUp);
            document.addEventListener("touchmove", this.mouseMove);
            document.addEventListener("touchend", this.dbTab);
            var image = new Image();
            image.src = this.props.src;
            var a = this;
            image.onload = function () {
                var block = a.refs.RICC_main_container,
                    crop = a.refs.RICC_crop_preview,
                    img = a.refs.RICC_image,
                    w = a.props.setWidth || img.offsetWidth,
                    h = a.props.setHeight || img.offsetHeight;

                if (w > window.innerWidth) w = window.innerWidth;
                if (h > window.innerHeight) h = window.innerHeight;

                block.style.width = w + "px";
                block.style.height = h + "px";
                crop.style.width = w + "px";
                crop.style.height = h + "px";

                if (parseInt(block.style.width.replace('px', '')) > a.refs.RICC_image.width) w = a.refs.RICC_image.width;
                if (parseInt(block.style.height.replace('px', '')) > a.refs.RICC_image.height) h = a.refs.RICC_image.height;

                block.style.width = w + "px";
                block.style.height = h + "px";
                crop.style.width = w + "px";
                crop.style.height = h + "px";

                a.setState({
                    blockX: block.getBoundingClientRect().left,
                    blockY: block.getBoundingClientRect().top
                });
            };
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener("mousemove", this.mouseMove);
            document.removeEventListener("mouseup", this.mouseUp);
            document.removeEventListener("touchmove", this.mouseMove);
            document.removeEventListener("touchend", this.dbTab);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'RICC_main_container', ref: 'RICC_main_container', onTouchStart: this.mouseDown,
                    onMouseDown: this.mouseDown, onDoubleClick: this.resetCrop },
                _react2.default.createElement(
                    'div',
                    { className: 'RICC_crop_block', ref: 'RICC_crop_block' },
                    _react2.default.createElement('div', { style: this.props.borderStyle ? { borderLeft: this.props.borderStyle } : {},
                        className: "RICC_crop_block_left_resize" + (this.props.resize ? " RICC_crop_block_left_right_cursor" : ""), ref: 'RICC_crop_block_left_resize' }),
                    _react2.default.createElement('div', { style: this.props.borderStyle ? { borderRight: this.props.borderStyle } : {},
                        className: "RICC_crop_block_right_resize" + (this.props.resize ? " RICC_crop_block_left_right_cursor" : ""), ref: 'RICC_crop_block_right_resize' }),
                    _react2.default.createElement('div', { style: this.props.borderStyle ? { borderTop: this.props.borderStyle } : {},
                        className: "RICC_crop_block_top_resize" + (this.props.resize ? " RICC_crop_block_top_bottom_cursor" : ""), ref: 'RICC_crop_block_top_resize' }),
                    _react2.default.createElement('div', { style: this.props.borderStyle ? { borderBottom: this.props.borderStyle } : {},
                        className: "RICC_crop_block_bottom_resize" + (this.props.resize ? " RICC_crop_block_top_bottom_cursor" : ""), ref: 'RICC_crop_block_bottom_resize' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'RICC_crop_preview' },
                        _react2.default.createElement('img', { src: this.props.src, ref: 'RICC_crop_preview' })
                    )
                ),
                _react2.default.createElement('div', { className: 'RICC_bg', ref: 'RICC_bg_block' }),
                _react2.default.createElement('img', { className: 'RICC_image', ref: 'RICC_image', src: this.props.src })
            );
        }
    }, {
        key: '_mouseDown',
        value: function _mouseDown(e) {
            e.preventDefault();
            var main_block = this.refs.RICC_main_container,
                crop_block = this.refs.RICC_crop_block,
                bg_block = this.refs.RICC_bg_block,
                preview_block = this.refs.RICC_crop_preview,
                resize_left_block = this.refs.RICC_crop_block_left_resize,
                resize_right_block = this.refs.RICC_crop_block_right_resize,
                resize_top_block = this.refs.RICC_crop_block_top_resize,
                resize_bottom_block = this.refs.RICC_crop_block_bottom_resize,
                mousePosX = e.clientX || Math.round(e.touches[0].clientX),
                mousePosY = e.clientY || Math.round(e.touches[0].clientY);

            if (!this.state.activeCropBlock) {
                // CREATE CROP BLOCK FUNCTION
                crop_block.style.top = mousePosY - this.state.blockY + "px";
                crop_block.style.left = mousePosX - this.state.blockX + "px";
                preview_block.style.marginTop = "-" + (mousePosY - this.state.blockY) + "px";
                preview_block.style.marginLeft = "-" + (mousePosX - this.state.blockX) + "px";
                crop_block.style.display = "block";
                this.setState({
                    start: {
                        x: mousePosX,
                        y: mousePosY
                    }
                });
            } else if (this.state.activeCropBlock) {
                if (e.target === bg_block) {
                    // NEW CROP BLOCK FUNCTION
                    crop_block.style.top = mousePosY - this.state.blockY + "px";
                    crop_block.style.left = mousePosX - this.state.blockX + "px";
                    preview_block.style.marginTop = "-" + (mousePosY - this.state.blockY) + "px";
                    preview_block.style.marginLeft = "-" + (mousePosX - this.state.blockX) + "px";
                    crop_block.style.width = "0px";
                    crop_block.style.height = "0px";
                    this.setState({
                        activeCropBlock: false,
                        start: {
                            x: mousePosX,
                            y: mousePosY
                        }
                    });
                } else if (e.target === crop_block || e.target === preview_block || (e.target === resize_left_block || e.target === resize_right_block || e.target === resize_top_block || e.target === resize_bottom_block) && !this.props.resize) {
                    // MOVE FUNCTION
                    var divTop = crop_block.style.top.replace('px', ''),
                        divLeft = crop_block.style.left.replace('px', ''),
                        eWi = parseInt(this.state.cropSize.w),
                        eHe = parseInt(this.state.cropSize.h),
                        cWi = parseInt(main_block.style.width),
                        cHe = parseInt(main_block.style.height),
                        diffX = mousePosX - divLeft,
                        diffY = mousePosY - divTop;
                    this.setState({
                        moveCropBlock: true,
                        moveData: {
                            diffX: diffX,
                            diffY: diffY,
                            eWi: eWi,
                            eHe: eHe,
                            cWi: cWi,
                            cHe: cHe
                        }
                    });
                } else if (e.target === resize_left_block || e.target === resize_right_block || e.target === resize_top_block || e.target === resize_bottom_block) {
                    if (this.props.resize) {
                        // RESIZE FUNCTION
                        var block = 0;
                        if (e.target === resize_left_block) block = 1;else if (e.target === resize_right_block) block = 2;else if (e.target === resize_top_block) block = 3;else if (e.target === resize_bottom_block) block = 4;
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

            this.setState({ status: true });
        }
    }, {
        key: '_mouseMove',
        value: function _mouseMove(e) {
            if (this.state.status) {
                e.preventDefault();
                var main_block = this.refs.RICC_main_container,
                    crop_block = this.refs.RICC_crop_block,
                    preview_block = this.refs.RICC_crop_preview,
                    mousePosX = e.pageX || Math.round(e.touches[0].clientX),
                    mousePosY = e.pageY || Math.round(e.touches[0].clientY);

                if (!this.state.activeCropBlock) {
                    var startX = this.state.start.x,
                        startY = this.state.start.y,
                        bWi = parseInt(main_block.style.width.replace('px', '')),
                        bLeft = this.state.blockX,
                        bHe = parseInt(main_block.style.height.replace('px', '')),
                        bTop = this.state.blockY,
                        aX = mousePosX - startX,
                        aY = mousePosY - startY,
                        left_right = true,
                        top_bottom = true;

                    if (aX < 0) {
                        var l = parseInt(mousePosX - this.state.blockX);
                        aX = startX - mousePosX;
                        preview_block.style.marginLeft = "-" + (mousePosX - this.state.blockX) + "px";
                        crop_block.style.left = l + "px";
                        left_right = false;
                    }
                    if (aX > 0 && left_right) {
                        crop_block.style.top = startY - this.state.blockY + "px";
                        crop_block.style.left = startX - this.state.blockX + "px";
                        preview_block.style.marginTop = "-" + (startY - this.state.blockY) + "px";
                        preview_block.style.marginLeft = "-" + (startX - this.state.blockX) + "px";
                    }
                    if (aY < 0) {
                        var t = parseInt(mousePosY - this.state.blockY);
                        aY = startY - mousePosY;
                        preview_block.style.marginTop = "-" + (mousePosY - this.state.blockY) + "px";
                        crop_block.style.top = t + "px";
                        top_bottom = false;
                    }

                    if (this.props.square && top_bottom) aY = aX;else if (this.props.square && !top_bottom) aX = aY;

                    if (aX > bWi + bLeft - startX && left_right) {
                        aX = bWi + bLeft - startX;
                        if (this.props.square) aY = aX;
                    }
                    if (aX > bWi - (bWi + bLeft - startX) && !left_right) {
                        aX = bWi - (bWi + bLeft - startX);
                        preview_block.style.marginLeft = "-1px";
                        crop_block.style.left = "0px";
                        if (this.props.square) aY = aX;
                    }

                    if (aY > bHe + bTop - startY && top_bottom) {
                        aY = bHe + bTop - startY;
                        if (this.props.square) aX = aY;
                    }
                    if (aY > bHe - (bHe + bTop - startY) && !top_bottom) {
                        aY = bHe - (bHe + bTop - startY);
                        preview_block.style.marginTop = "-1px";
                        crop_block.style.top = "0px";
                        if (this.props.square) aX = aY;
                    }

                    crop_block.style.width = aX + "px";
                    crop_block.style.height = aY + "px";
                    this.setState({
                        cropSize: {
                            w: aX,
                            h: aY
                        }
                    });
                } else {
                    if (this.state.moveCropBlock) {
                        var _aX = mousePosX - this.state.moveData.diffX,
                            _aY = mousePosY - this.state.moveData.diffY;
                        if (_aX < 0) _aX = 0;
                        if (_aY < 0) _aY = 0;
                        if (_aX + this.state.moveData.eWi > this.state.moveData.cWi) _aX = this.state.moveData.cWi - this.state.moveData.eWi;
                        if (_aY + this.state.moveData.eHe > this.state.moveData.cHe) _aY = this.state.moveData.cHe - this.state.moveData.eHe;
                        crop_block.style.left = _aX + 'px';
                        crop_block.style.top = _aY + 'px';
                        preview_block.style.marginTop = "-" + _aY + "px";
                        preview_block.style.marginLeft = "-" + _aX + "px";
                    }
                    if (this.state.resizeCropBlock) {
                        var _startX = this.state.start.x,
                            _startY = this.state.start.y,
                            _bWi = parseInt(main_block.style.width.replace('px', '')),
                            _bLeft = this.state.blockX,
                            _bHe = parseInt(main_block.style.height.replace('px', '')),
                            _bTop = this.state.blockY,
                            _aX2 = mousePosX - _startX,
                            _aY2 = mousePosY - _startY;

                        if (this.state.resizeDirection === 2) {
                            _aX2 = this.state.resize.w + _aX2;
                            if (_aX2 > _bWi + _bLeft - _startX + this.state.resize.w) _aX2 = _bWi + _bLeft - _startX + this.state.resize.w - 2;
                            crop_block.style.width = _aX2 + "px";
                            this.setState({ cropSize: { w: _aX2, h: this.state.cropSize.h } });
                        } else if (this.state.resizeDirection === 1) {
                            var _l = parseInt(mousePosX - this.state.blockX);
                            _aX2 = this.state.resize.w - _aX2;
                            if (_l < 0) {
                                preview_block.style.marginLeft = "-1px";
                                crop_block.style.left = "0px";
                            } else {
                                preview_block.style.marginLeft = "-" + (mousePosX - this.state.blockX) + "px";
                                crop_block.style.left = _l + "px";
                                crop_block.style.width = _aX2 + "px";
                                this.setState({ cropSize: { w: _aX2, h: this.state.cropSize.h } });
                            }
                        } else if (this.state.resizeDirection === 4) {
                            _aY2 = this.state.resize.h + _aY2;
                            if (_aY2 > _bHe + _bTop - _startY + this.state.resize.h) _aY2 = _bHe + _bTop - _startY + this.state.resize.h - 2;
                            crop_block.style.height = _aY2 + "px";
                            this.setState({ cropSize: { h: _aY2, w: this.state.cropSize.w } });
                        } else if (this.state.resizeDirection === 3) {
                            var _t = parseInt(mousePosY - this.state.blockY);
                            _aY2 = this.state.resize.h - _aY2;
                            if (_t < 0) {
                                preview_block.style.marginTop = "-1px";
                                crop_block.style.top = "0px";
                            } else {
                                preview_block.style.marginTop = "-" + (mousePosY - this.state.blockY) + "px";
                                crop_block.style.top = _t + "px";
                                crop_block.style.height = _aY2 + "px";
                                this.setState({ cropSize: { h: _aY2, w: this.state.cropSize.w } });
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: '_mouseUp',
        value: function _mouseUp(e) {
            if (this.state.status) {
                e.preventDefault();
                if (!this.state.activeCropBlock) this.setState({ activeCropBlock: true });
                if (this.state.moveCropBlock) this.setState({ moveCropBlock: false });
                if (this.state.resizeCropBlock) this.setState({ resizeCropBlock: false, resizeDirection: 0 });
                if (this.props.onCrop) this.props.onCrop(this._onCrop());
                this.setState({ status: false });
            }
        }
    }, {
        key: '_onCrop',
        value: function _onCrop() {
            var w = this.refs.RICC_crop_block.offsetWidth,
                h = this.refs.RICC_crop_block.offsetHeight,
                l = this.refs.RICC_crop_block.offsetLeft,
                t = this.refs.RICC_crop_block.offsetTop,
                img = new Image(),
                canvas = document.createElement('canvas');
            img.src = this.refs.RICC_image.src;
            var ratioW = img.width / this.refs.RICC_image.width,
                ratioH = img.height / this.refs.RICC_image.height;
            if (ratioW < 1) ratioW = 1;
            if (ratioH < 1) ratioH = 1;
            canvas.width = w * ratioW;
            canvas.height = h * ratioH;
            canvas.getContext('2d').drawImage(img, -l * ratioW, -t * ratioH, img.width, img.height);

            var ratio = img.width / this.refs.RICC_main_container.offsetWidth;
            ratioH = ratio;
            if (img.height > img.width) ratioH = img.height / this.refs.RICC_main_container.offsetHeight;
            if (ratio < 1) ratio = 1;
            if (ratioH < 1) ratioH = 1;

            return [canvas.toDataURL(), { y: t * ratio, x: l * ratio, w: w * ratioH, h: h * ratioH }];
        }
    }, {
        key: '_resetCrop',
        value: function _resetCrop() {
            var crop_block = this.refs.RICC_crop_block,
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
        }
    }, {
        key: '_dbTab',
        value: function _dbTab(e) {
            var currentTime = new Date().getTime(),
                tapLength = currentTime - dbLastTap;
            if (tapLength < 250 && tapLength > 0) {
                this._resetCrop();
                e.preventDefault();
            } else this._mouseUp(e);
            dbLastTap = currentTime;
        }
    }]);

    return ReactImageCrop;
}(_react.Component);

ReactImageCrop.defaultProps = {
    resize: true
};

ReactImageCrop.propTypes = {
    src: _propTypes2.default.string,
    setWidth: _propTypes2.default.number,
    setHeight: _propTypes2.default.number,
    square: _propTypes2.default.bool,
    resize: _propTypes2.default.bool,
    border: _propTypes2.default.string,
    onCrop: _propTypes2.default.func
};

exports.default = ReactImageCrop;
