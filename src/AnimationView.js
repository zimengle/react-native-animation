import React, {Component} from 'react';
import {UIManager, requireNativeComponent, View, findNodeHandle, Animated, Easing,PixelRatio} from 'react-native';
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
                    },{
                        translateX: this.state.translateX
                    }]
                }]}>
                {this.props.children}
            </Animated.View>
        )
    }

    start() {
        if (this._translate) {
            let from = this._translate.from, to = this._translate.to;
            this.state.translateY.setValue(from.y);
            this.state.translateX.setValue(from.x);
            this._animations = Animated.parallel([
                Animated.timing(this.state.translateY, {
                    toValue: to.y,
                    duration: this._duration || 500,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.translateX, {
                    toValue: to.x,
                    duration: this._duration || 500,
                    easing: Easing.linear
                })
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


