package com.baidu.rn.animation;

import android.content.Context;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.LinearInterpolator;
import android.view.animation.RotateAnimation;
import android.view.animation.ScaleAnimation;
import android.view.animation.TranslateAnimation;

import com.facebook.react.views.view.ReactViewGroup;


public class BaiduAnimationView extends ReactViewGroup{
    AnimationSet animationSet;

    public BaiduAnimationView(Context context) {
        super(context);
    }

    public void clear() {
        this.clearAnimation();
    }

    public void start() {
        if (animationSet != null) {
            this.startAnimation(animationSet);
        }
    }

    public void addAnimations(AnimationModel[] data) {
        animationSet = new AnimationSet(false);
        for (AnimationModel m : data) {
            Animation animation = null;
            switch (m.type) {
                case translate:
                    animation = new TranslateAnimation(m.from, m.to, m.from2, m.to2);
                    break;
                case Rotate:
                    animation = new RotateAnimation(m.from, m.to);
                    break;
                case Scale:
                    animation = new ScaleAnimation(m.from, m.to, m.from2, m.to2);
                    break;
                case Alpha:
                    animation = new AlphaAnimation(m.from, m.to);
                    break;
            }
            animation.setDuration(m.duration);
            animation.setInterpolator(new LinearInterpolator());//TODO
            animation.setRepeatCount(m.repeat);
            animation.setStartOffset(m.startOffset);
            animation.setFillAfter(true);
            animationSet.addAnimation(animation);
        }
        animationSet.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {

            }

            @Override
            public void onAnimationEnd(Animation animation) {

            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });
    }
}
