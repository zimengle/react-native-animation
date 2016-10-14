package com.baidu.rn.animation.model;


public class Model {

    private PositionRange translate;

    private Range rotate;

    private PositionRange scale;

    private Range opacity;

    private long duration;

    private String interpolator;

    private long delay;

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


}
