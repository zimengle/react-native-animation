package com.baidu.rn.animation;

import android.content.Context;
import android.view.MotionEvent;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.LinearInterpolator;
import android.view.animation.RotateAnimation;
import android.view.animation.ScaleAnimation;
import android.view.animation.TranslateAnimation;

import com.baidu.rn.animation.model.Model;
import com.baidu.rn.animation.model.Position;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;


public class BaiduAnimationView extends ReactViewGroup {
    private AnimationSet animationSet;

    public BaiduAnimationView(Context context) {
        super(context);

    }



    public void start() {

        if(animationSet != null){
            animationSet.setAnimationListener(new Animation.AnimationListener() {
                @Override
                public void onAnimationStart(Animation animation) {
                    ReactContext reactContext = (ReactContext)getContext();
                    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                            getId(),
                            "onAnimationStart",
                            null);
                }

                @Override
                public void onAnimationEnd(Animation animation) {
                    ReactContext reactContext = (ReactContext)getContext();
                    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                            getId(),
                            "onAnimationEnd",
                            null);
                }

                @Override
                public void onAnimationRepeat(Animation animation) {

                }
            });
            this.startAnimation(animationSet);
        }


    }

    public void stop(){
        clearAnimation();
    }


    public void initAnimation(Model model){

        animationSet = new AnimationSet(false);

        animationSet.setFillEnabled(true);
        animationSet.setFillAfter(true);
        animationSet.setFillBefore(false);

        if(model.getOpacity() != null){
            add(new AlphaAnimation(model.getOpacity().getFrom(),model.getOpacity().getTo()),model);
        }
        if(model.getRotate() != null){
            add(new RotateAnimation(model.getRotate().getFrom(),model.getRotate().getTo()),model);
        }
        if(model.getScale() != null){
//            add(new ScaleAnimation(model.getScale().getFrom(),model.getScale().getTo()),model);
        }
        if(model.getTranslate() != null){
            Position from =  model.getTranslate().getFrom();
            Position to =  model.getTranslate().getTo();
            add(new TranslateAnimation(from.getX(),to.getX(),from.getY(),to.getY()),model);
        }

        start();

    }

    private void add(Animation animation,Model m){

        animation.setDuration(m.getDuration());
        switch (m.getInterpolator()){
            case "linear":
                animation.setInterpolator(new LinearInterpolator());
                break;
        }
        animation.setRepeatCount(m.getRepeat());
        animation.setStartOffset(m.getDelay());
        animationSet.addAnimation(animation);

    }


    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        // No-op since UIManagerModule handles actually laying out children.
    }
}
