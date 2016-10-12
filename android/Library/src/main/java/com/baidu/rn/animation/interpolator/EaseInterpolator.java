package com.baidu.rn.animation.interpolator;

import android.view.animation.Interpolator;


public class EaseInterpolator implements Interpolator {
    @Override
    public float getInterpolation(float input) {
        return new CubicBezierInterpolator(0.42,0f,1f,1f).getInterpolation(input);
    }
}
