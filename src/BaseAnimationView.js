import React, {Component} from 'react';
import {UIManager, requireNativeComponent, View, findNodeHandle, Animated, Easing} from 'react-native';

let BaseAnimationView = class BaseAnimationView extends React.Component {

    constructor() {
        super();
        this._translate = null;
        this._opacity = null;
        this._scale = null;
        this._rotate = null;
        this._duration = null;
        this._interpolator = null;
        this._delay = null;
        this._repeat = null;
        this._autoplay = null;
        this._isStart = false;
    }

    componentDidMount() {
        this._diff({},this.props);
    }

    setDuration(duration) {
        this._duration = duration;
    }

    setDelay(delay) {
        this._delay = delay;
    }

    setInterpolator(interpolator) {
        this._interpolator = interpolator;
    }

    setTranslate(translate) {
        this._translate = translate;
    }

    _onAnimationStart() {
        this._isStart = true;
        this.props.onStart && this.props.onStart();
    }

    onStart(callback){
        if(callback){
            this.props.onStart = callback;
        }
    }

    onEnd(callback){
        if(callback){
            this.props.onEnd = callback;
        }
    }

    componentWillReceiveProps(nextProps) {
        this._diff(this.props,nextProps);
    }

    _onAnimationEnd() {
        this._isStart = false;
        this.props.onEnd && this.props.onEnd();
    }

    _diff(prev, next) {
        if (next !== prev) {
            if (prev.translate !== next.translate) {
                this.setTranslate(next.translate);
            }
            if (prev.rotate !== next.rotate) {
                this.setRotate(next.rotate);
            }
            if (prev.scale !== next.scale) {
                this.setScale(next.scale);
            }
            if (prev.opacity !== next.opacity) {
                this.setOpacity(next.opacity);
            }
            if (prev.interpolator !== next.interpolator) {
                this.setInterpolator(next.interpolator);
            }
            if (prev.duration !== next.duration) {
                this.setDuration(next.duration);
            }
            if (prev.delay !== next.delay) {
                this.setDelay(next.delay);
            }
            if (prev.repeat !== next.repeat) {
                this.setRepeat(next.repeat);
            }
            if (next.autoplay && !this._isStart) {
                this.start();
            }
        }
    }

    setOpacity(opacity) {
        this._opacity = opacity;
    }

    setScale(scale) {
        this._scale = scale;

    }

    setAutoPlay(autoplay) {
        this._autoplay = autoplay;
    }

    setRotate(rotate) {
        this._rotate = rotate;
    }


    setRepeat(repeat) {
        this._repeat = repeat;
    }


}

BaseAnimationView.PropTypes = {
    ...View.propTypes,
    translate: React.PropTypes.shape({
        from: React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number
        }),
        to: React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number
        })
    }),
    opacity: React.PropTypes.shape({
        from: React.PropTypes.number,
        to: React.PropTypes.number
    }),
    scale: React.PropTypes.shape({
        from: React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number
        }),
        to: React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number
        })
    }),
    rotate: React.PropTypes.shape({
        from: React.PropTypes.number,
        to: React.PropTypes.number
    }),
    duration: React.PropTypes.number,
    interpolator: React.PropTypes.oneOf(['linear']),
    delay: React.PropTypes.number,
    repeat: React.PropTypes.number,
    onStart: React.PropTypes.func,
    onEnd: React.PropTypes.func,
    autoplay: React.PropTypes.bool
}

export default BaseAnimationView;