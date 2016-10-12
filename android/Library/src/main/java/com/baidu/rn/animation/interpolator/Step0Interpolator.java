package com.baidu.rn.animation.interpolator;
import android.view.animation.Interpolator;


public class Step0Interpolator implements Interpolator {
    @Override
    public float getInterpolation(float n) {
        return n > 0 ? 1 : 0;
    }
}
