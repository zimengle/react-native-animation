import React, { Component } from 'react';
import { UIManager, requireNativeComponent, View, findNodeHandle, Animated, Easing } from 'react-native';

let BaseAnimationView = class BaseAnimationView extends React.Component {

    constructor(props) {
        super(props);
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
        this._defaults = {
            rotate: 0,
            translateX: 0,
            translateY: 0,
            opacity: 1,
            scaleX: 1,
            scaleY: 1
        };
        Object.assign(this._defaults, props.defaults);
    }

    componentDidMount() {
        this._diff({}, this.props);
    }

    setDuration(duration) {
        this._duration = duration;
        return this;
    }

    setDelay(delay) {
        this._delay = delay;
        return this;
    }

    setInterpolator(interpolator) {
        this._interpolator = interpolator;
        return this;
    }

    setTranslate(translate) {
        this._translate = JSON.parse(JSON.stringify(translate));
        return this;
    }

    clearAnimation() {
        this._translate = null;
        this._opacity = null;
        this._scale = null;
        this._rotate = null;
        return this;
    }

    _onAnimationStart() {
        this._isStart = true;
        this.props.onStart && this.props.onStart();
    }

    onStart(callback) {
        if (callback) {
            this.props.onStart = callback;
        }
        return this;
    }

    onEnd(callback) {
        if (callback) {
            this.props.onEnd = callback;
        }
        return this;
    }

    componentWillReceiveProps(nextProps) {
        this._diff(this.props, nextProps);
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
        return this;
    }

    setScale(scale) {
        this._scale = scale;
        return this;
    }

    setAutoPlay(autoplay) {
        this._autoplay = autoplay;
        return this;
    }

    setRotate(rotate) {
        this._rotate = rotate;
        return this;
    }


    setRepeat(repeat) {
        this._repeat = repeat;
        return this;
    }


}

BaseAnimationView.PropTypes = {
    ...View.propTypes,
    defaults: React.PropTypes.shape({
        translateX: React.PropTypes.number,
        translateY: React.PropTypes.number,
        opacity: React.PropTypes.number,
        scaleX: React.PropTypes.number,
        scaleY: React.PropTypes.number
    }),
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
    backgroundColor: React.PropTypes.shape({
        from: React.PropTypes.string,
        to: React.PropTypes.string
    }),
    duration: React.PropTypes.number,
    interpolator: React.PropTypes.shape({
        easing: React.PropTypes.oneOf(['step0', 'step1', 'linear', 'ease', 'quad', 'cubic', 'poly', 'sin', 'circle', 'exp', 'elastic', 'back', 'bounce']).isRequired,
        value: React.PropTypes.number,
        inOut: React.PropTypes.oneOf(['in', 'out', 'inOut'])
    }),
    delay: React.PropTypes.number,
    onStart: React.PropTypes.func,
    onEnd: React.PropTypes.func,
    autoplay: React.PropTypes.bool
}

export default BaseAnimationView;
