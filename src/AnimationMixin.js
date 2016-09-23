import {View} from 'react-native';

let AnimationMinxin = {}

let AnimationPropTypes = {
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


export {AnimationMinxin,AnimationPropTypes}