package com.baidu.rn.animation.interpolator;

import android.view.animation.Interpolator;


public class BounceInterpolator implements Interpolator {

    @Override
    public float getInterpolation(float t) {
        if (t < 1 / 2.75) {
            return (float) (7.5625 * t * t);
        }

        if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return (float) (7.5625 * t * t + 0.75);
        }

        if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return (float) (7.5625 * t * t + 0.9375);
        }

        t -= 2.625 / 2.75;
        return (float) (7.5625 * t * t + 0.984375);
    }
}
