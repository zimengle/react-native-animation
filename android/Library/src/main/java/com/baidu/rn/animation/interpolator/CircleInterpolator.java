package com.baidu.rn.animation.interpolator;


import android.view.animation.Interpolator;


public class CircleInterpolator implements Interpolator {
    @Override
    public float getInterpolation(float t) {
        return (float) (1 - Math.sqrt(1 - t * t));
    }
}
