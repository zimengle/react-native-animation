import React, {Component} from 'react';
import {UIManager, requireNativeComponent, View, findNodeHandle, Animated, Easing, PixelRatio} from 'react-native';
import BaseAnimationView from './BaseAnimationView'

let AnimationView = class AnimationView extends BaseAnimationView {


    constructor(props) {
        super(props);
        this._animations = null;
        this.state = {
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0)
        }
    }

    render() {
        return (
            <Animated.View
                ref={"BaiduAnimationView"}
                style={[this.props.style, {
                    transform: [{
                        translateY: this.state.translateY
                    }, {
                        translateX: this.state.translateX
                    }]
                }]}>
                {this.props.children}
            </Animated.View>
        )
    }

    _value(value) {
        return {
            toValue: value,
            duration: this._duration || 500,
            easing: this._easing(this._interpolator)
        }
    }

    _easing(config) {
        let easing;
        if (config) {
            easing = this._getEasing(config.easing);
            if (config.value) {
                easing = easing(config.value);
            }
            if (config.inOut) {
                easing = this._getEasing(easing);
            }
        }
        if (easing == null) {
            easing = Easing.linear;
        }
        return easing;
    }

    _getEasing(method) {
        if (typeof Easing[method] === 'function') {
            return Easing[method];
        }

    }

    start() {
        if (this._translate) {
            let from = this._translate.from, to = this._translate.to;
            this.state.translateY.setValue(from.y);
            this.state.translateX.setValue(from.x);
            this._animations = Animated.parallel([
                Animated.timing(this.state.translateY, this._value(to.y)),
                Animated.timing(this.state.translateX, this._value(to.x))
            ])
            this._animations.start((res) => {
                if (res.finished) {
                    this._onAnimationEnd();
                }
            });
            this._onAnimationStart();

        }
    }

    stop() {
        if (this._animations) {
            this._animations.stop();
        }
    }
}

export default AnimationView;


