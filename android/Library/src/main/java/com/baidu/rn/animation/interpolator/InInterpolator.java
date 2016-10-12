package com.baidu.rn.animation.interpolator;


import android.view.animation.Interpolator;

public class InInterpolator implements Interpolator {


    private Interpolator easing;


    public InInterpolator(Interpolator easing) {
        this.easing = easing;
    }

    @Override
    public float getInterpolation(float input) {
        return easing.getInterpolation(input);
    }
}
