package com.baidu.rn.animation.interpolator;

import android.view.animation.Interpolator;


public class ElasticInterpolator implements Interpolator {


    private float t;

    public ElasticInterpolator(float t) {
        this.t = t;
    }

    @Override
    public float getInterpolation(float bounciness) {
        double p = bounciness * Math.PI;
        return (float) (1 - Math.pow(Math.cos(t * Math.PI / 2), 3) * Math.cos(t * p));
    }
}
