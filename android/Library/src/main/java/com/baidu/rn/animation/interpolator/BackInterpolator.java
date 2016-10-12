package com.baidu.rn.animation.interpolator;

import android.view.animation.Interpolator;


public class BackInterpolator implements Interpolator {

    private float t;

    public BackInterpolator(float t) {
        this.t = t;
    }

    @Override
    public float getInterpolation(float s) {
        return t * t * ((s + 1) * t - s);
    }
}
