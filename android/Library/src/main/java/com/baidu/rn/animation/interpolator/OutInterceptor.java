package com.baidu.rn.animation.interpolator;


import android.view.animation.Interpolator;

public class OutInterceptor implements Interpolator {


    private Interpolator easing;


    public OutInterceptor(Interpolator easing) {
        this.easing = easing;
    }

    @Override
    public float getInterpolation(float input) {
        return 1 - easing.getInterpolation(1-input);
    }
}
