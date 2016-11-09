import React, {Component} from 'react';
import {UIManager, requireNativeComponent, View, findNodeHandle, PixelRatio} from 'react-native';
import BaseAnimationView from './BaseAnimationView'

const BaiduAnimationView = requireNativeComponent('BaiduAnimationView', NativeAnimationView, {
    nativeOnly: {
        onAnimationStart: true, onAnimationEnd: true, onAnimationChange: true
    }
});
let NativeAnimationView = class NativeAnimationView extends BaseAnimationView {


    constructor(props) {
        super(props);

    }

    _onEvent(event) {

        switch (event.type) {
            case "start":
                this._onAnimationStart();
                break;
            case "end":
                this._onAnimationEnd();
                break;
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._bridge = findNodeHandle(this.refs.BaiduAnimationView);
        const defaults = this._defaults;
        this._dispatch(UIManager.BaiduAnimationView.Commands['default'], [{
            rotate: defaults.rotate,
            translate: {
                x: PixelRatio.getPixelSizeForLayoutSize(defaults.translateX),
                y: PixelRatio.getPixelSizeForLayoutSize(defaults.translateY)
            },
            scale: {
                x: defaults.scaleX,
                y: defaults.scaleY
            },
            opacity: defaults.opacity
        }]);
    }

    render() {
        return (
            <BaiduAnimationView
                ref={"BaiduAnimationView"}
                style={this.props.style}
                onAnimationChange={this._onEvent.bind(this)}>
                {this.props.children}
            </BaiduAnimationView>
        )
    }


    componentWillUnmount() {
        this.stop();
    }


    _dispatch(action, data) {
        UIManager.dispatchViewManagerCommand(
            this._bridge,
            action,
            data
        )
    }


    formatPixelSize(obj) {
        Object.keys(obj).forEach((key)=> {
            if (typeof obj[key] == "number") {
                obj[key] = PixelRatio.getPixelSizeForLayoutSize(obj[key]);
            } else if (typeof obj[key] == "object") {
                this.formatPixelSize(obj[key]);
            }
        });
    }

    start() {
        if (this._translate) {
            this.formatPixelSize(this._translate);
        }

        this._dispatch(UIManager.BaiduAnimationView.Commands.start, [{
            rotate: this._rotate,
            translate: this._translate,
            scale: this._scale,
            opacity: this._opacity,
            duration: this._duration || 200,
            interpolator: ""+JSON.stringify(this._interpolator),
            delay: this._delay || 0,
            repeat: this._repeat || 0
        }]);
    }

    stop() {
        this._dispatch(UIManager.BaiduAnimationView.Commands.stop, null);
    }

}

export default NativeAnimationView;