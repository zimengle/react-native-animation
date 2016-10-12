package com.baidu.rn.animation.interpolator;

import android.view.animation.Interpolator;


public class PolyInterpolator implements Interpolator {

    private float n;

    public PolyInterpolator(float n) {
        this.n = n;
    }

    @Override
    public float getInterpolation(float t) {
        return (float) Math.pow(t, n);
    }
}
