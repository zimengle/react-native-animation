import React, {Component} from 'react';
import {UIManager, requireNativeComponent, View, findNodeHandle, Animated, Easing, PixelRatio} from 'react-native';
import BaseAnimationView from './BaseAnimationView'

let AnimationView = class AnimationView extends BaseAnimationView {


    constructor(props) {
        super(props);
        this._animations = null;
        this.state = {
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0),
            opacity: new Animated.Value(1),
            scaleX: new Animated.Value(1),
            scaleY: new Animated.Value(1)
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
                    },{
                        scaleX: this.state.scaleX
                    },{
                        scaleY: this.state.scaleY
                    }],
                    opacity: this.state.opacity,

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
        let isUndefined = (s) => {
            return typeof s == 'undefined';
        }
        let arr = [];
        if (this._translate) {
            let from = this._translate.from, to = this._translate.to;
            if(from){
                if(!isUndefined(from.y)){
                    this.state.translateY.setValue(from.y);
                }
                if(!isUndefined(from.x)){
                    this.state.translateX.setValue(from.x);
                }
            }

            if(to){
                if(!isUndefined(to.y)){
                    arr.push(Animated.timing(this.state.translateY, this._value(to.y)));
                }

                if(!isUndefined(to.x)){
                    arr.push(Animated.timing(this.state.translateX, this._value(to.x)));
                }
            }

        }

        if (this._opacity) {
            let from = this._opacity.from, to = this._opacity.to;
            if(!isUndefined(from)){
                this.state.opacity.setValue(from);
            }

            if(!isUndefined(to)){
                arr.push(Animated.timing(this.state.opacity, this._value(to)));
            }


        }

        if (this._scale) {
            let from = this._scale.from, to = this._scale.to;
            if(from){
                if(!isUndefined(from.y)){
                    this.state.scaleY.setValue(from.y);
                }
                if(!isUndefined(from.x)){
                    this.state.scaleX.setValue(from.x);
                }
            }

            if(to){
                if(!isUndefined(to.y)){
                    Animated.timing(this.state.scaleY, this._value(to.y));
                }
                if(!isUndefined(to.x)){
                    Animated.timing(this.state.scaleX, this._value(to.x));
                }
            }
        }


        if (arr.length > 0) {

            this._animations = Animated.parallel(arr);
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
            this._animations = null;
        }
    }
}

export default AnimationView;


