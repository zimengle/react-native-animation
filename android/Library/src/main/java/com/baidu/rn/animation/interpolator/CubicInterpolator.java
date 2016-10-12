package com.baidu.rn.animation.interpolator;


import android.view.animation.Interpolator;


public class CubicInterpolator implements Interpolator {
    @Override
    public float getInterpolation(float t) {
        return t * t * t;
    }
}
