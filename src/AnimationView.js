import React, {Component} from 'react';
import {UIManager, requireNativeComponent, View, findNodeHandle, Animated, Easing} from 'react-native';
import {AnimationPropTypes} from './AnimationMixin'

let AnimationView = class AnimationView extends React.Component {


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
        this._animations = null;
        this.state = {
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps) {
        this._diff(this.props, nextProps);
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

    _onAnimationStart() {
        this._isStart = true;
        this.props.onStart && this.props.onStart();
    }

    _onAnimationEnd() {
        this._isStart = false;
        this.props.onEnd && this.props.onEnd();
    }

    componentDidMount() {
        this._bridge = findNodeHandle(this.refs.BaiduAnimationView);
        this._diff({}, this.props);
    }

    render() {
        return (
            <Animated.View
                ref={"BaiduAnimationView"}
                style={[this.props.style, {
                    transform: [{
                        translateX: this.state.translateX,
                        translateY: this.state.translateY
                    }]
                }]}>
                {this.props.children}
            </Animated.View>
        )
    }


    setDelay(delay) {
        this._delay = delay;
    }

    componentWillUnmount() {
        this.stop();
    }


    setAutoPlay(autoplay) {
        this._autoplay = autoplay;
    }


    start() {
        if (this._translate) {
            console.info(this._duration);
            let from = this._translate.from, to = this._translate.to;
            this.state.translateY.setValue(from.y);
            this.state.translateX.setValue(from.x);
            this._animations = Animated.parallel([
                Animated.timing(this.state.translateY, {
                    toValue: to.y,
                    duration: this._duration*2 || 500,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.translateX, {
                    toValue: to.x,
                    duration: this._duration*2 || 500,
                    easing: Easing.linear
                }),
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

    setDuration(duration) {
        this._duration = duration;
    }

    setInterpolator(interpolator) {
        this._interpolator = interpolator;
    }

    setTranslate(translate) {
        this._translate = translate;
    }

    setOpacity(opacity) {
        this._opacity = opacity;
    }

    setScale(scale) {
        this._scale = scale;

    }

    setRotate(rotate) {
        this._rotate = rotate;
    }


    setRepeat(repeat) {
        this._repeat = repeat;
    }
}

AnimationView.propTypes = AnimationPropTypes;

export default AnimationView;


