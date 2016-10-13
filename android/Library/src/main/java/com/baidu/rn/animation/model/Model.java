package com.baidu.rn.animation.model;

/**
 rotate: this._rotate,
 translate: this._translate,
 scale: this._scale,
 opacity: this._opacity,
 duration: this._duration || 200,
 interpolator: this._interpolator || 'linear'
 */
public class Model {

    private PositionRange translate;

    private Range rotate;

    private PositionRange scale;

    private Range opacity;

    private long duration;

    private String interpolator;

    private long delay;

    private int repeat;

    private boolean interrupt = true;

    public PositionRange getTranslate() {
        return translate;
    }

    public Range getRotate() {
        return rotate;
    }

    public PositionRange getScale() {
        return scale;
    }

    public Range getOpacity() {
        return opacity;
    }

    public long getDuration() {
        return duration;
    }

    public String getInterpolator() {
        return interpolator;
    }

    public long getDelay() {
        return delay;
    }

    public int getRepeat() {
        return repeat;
    }

    public boolean isInterrupt() {
        return interrupt;
    }
}
