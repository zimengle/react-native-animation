package com.baidu.rn.animation.interpolator;

import android.view.animation.Interpolator;


public class Step1Interpolator implements Interpolator {
    @Override
    public float getInterpolation(float n) {
        return n >= 1 ? 1 : 0;
    }
}
