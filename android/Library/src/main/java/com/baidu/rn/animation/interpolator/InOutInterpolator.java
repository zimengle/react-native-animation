package com.baidu.rn.animation.interpolator;


import android.view.animation.Interpolator;

public class InOutInterpolator implements Interpolator {


    private Interpolator easing;

    public InOutInterpolator(Interpolator easing) {
        this.easing = easing;
    }

    @Override
    public float getInterpolation(float t) {

        if (t < 0.5) {
            return easing.getInterpolation(t * 2) / 2;
        }

        return 1 - easing.getInterpolation((1 - t) * 2) / 2;
    }
}
