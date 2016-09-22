import React, {Component} from 'react';
import {UIManager,requireNativeComponent,View,findNodeHandle} from 'react-native';


const BaiduAnimationView = requireNativeComponent('BaiduAnimationView', AnimationView, {
    nativeOnly: {onAnimationStart: true, onAnimationEnd: true}
});
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
    }

    componentWillReceiveProps(nextProps) {
        this._diff(this.props,nextProps);
    }

    _diff(prev,next){
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
        this._diff({},this.props);
    }

    render() {
        return (
            <BaiduAnimationView
                ref={"BaiduAnimationView"}
                style={this.props.style}
                onAnimationStart={this._onAnimationStart.bind(this)}
                onAnimationEnd={this._onAnimationEnd.bind(this)}>
                {this.props.children}
            </BaiduAnimationView>
        )
    }

    setDelay(delay) {
        this._delay = delay;
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

    setAutoPlay(autoplay) {
        this._autoplay = autoplay;
    }

    start() {
        this._dispatch(UIManager.BaiduAnimationView.Commands.start, [{
            rotate: this._rotate,
            translate: this._translate,
            scale: this._scale,
            opacity: this._opacity,
            duration: this._duration || 200,
            interpolator: this._interpolator || 'linear',
            delay: this._delay || 0,
            repeat: this._repeat || 0
        }]);
    }

    stop() {
        this._dispatch(UIManager.BaiduAnimationView.Commands.stop, null);
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

AnimationView.propTypes = {
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

export default AnimationView;


