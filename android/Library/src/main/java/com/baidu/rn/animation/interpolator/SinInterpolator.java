package com.baidu.rn.animation.interpolator;

import android.view.animation.Interpolator;


public class SinInterpolator implements Interpolator {
    @Override
    public float getInterpolation(float input) {
        return (float) (1 - Math.cos(input * Math.PI / 2));
    }
}
