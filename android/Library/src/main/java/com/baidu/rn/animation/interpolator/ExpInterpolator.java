package com.baidu.rn.animation.interpolator;

import android.view.animation.Interpolator;



public class ExpInterpolator implements Interpolator {
    @Override
    public float getInterpolation(float t) {
        return (float) Math.pow(2, 10 * (t - 1));
    }
}
