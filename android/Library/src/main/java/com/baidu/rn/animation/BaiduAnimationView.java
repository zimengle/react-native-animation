package com.baidu.rn.animation;

import android.animation.Animator;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.animation.ValueAnimator;
import android.content.Context;
import android.os.SystemClock;
import android.view.View;
import android.view.ViewGroup;

import com.baidu.rn.animation.interpolator.InterpolatorFactory;
import com.baidu.rn.animation.model.Model;
import com.baidu.rn.animation.model.Position;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.ArrayList;
import java.util.List;


public class BaiduAnimationView extends ReactViewGroup {

    private AnimatorSet animatorSet;

    public BaiduAnimationView(Context context) {
        super(context);

    }


    private void dispatchEvent(String type) {
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(new AnimationChangeEvent(getId(), SystemClock.uptimeMillis(), type));

    }

    public void stop() {
        if (animatorSet != null) {
            animatorSet.cancel();
        }
    }


    public void startAnimation(Model model) {


        List<Animator> list = new ArrayList<>();

        if (model.getWidth() != null) {
            Float from = model.getWidth().getFrom(), to = model.getWidth().getTo();
            if(from != null){
                setWidth(Math.round(from));
            }
            if(to != null){
                ValueAnimator anim = ValueAnimator.ofInt(this.getMeasuredWidth(), Math.round(to));
                anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                    @Override
                    public void onAnimationUpdate(ValueAnimator valueAnimator) {
                        setWidth((Integer) valueAnimator.getAnimatedValue());
                    }
                });
                list.add(anim);
            }

        }

        if (model.getHeight() != null) {
            Float from = model.getHeight().getFrom(), to = model.getHeight().getTo();
            if(from != null){
                setHeight(Math.round(from));
            }
            if(to != null){
                ValueAnimator anim = ValueAnimator.ofInt(this.getMeasuredHeight(), Math.round(to));
                anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                    @Override
                    public void onAnimationUpdate(ValueAnimator valueAnimator) {
                        setHeight((Integer) valueAnimator.getAnimatedValue());
                    }
                });
                list.add(anim);
            }

        }

        if (model.getOpacity() != null) {
            Float from = model.getOpacity().getFrom();
            Float to = model.getOpacity().getTo();
            if (from != null) {
                setAlpha(from);
            }
            if (to != null) {
                list.add(ObjectAnimator.ofFloat(this, "alpha", to));
            }
        }
        if (model.getRotate() != null) {
            Float from = model.getRotate().getFrom();
            Float to = model.getRotate().getTo();
            if (from != null) {
                setRotation(from);
            }
            if (to != null) {
                list.add(ObjectAnimator.ofFloat(this, "rotation", to));
            }
        }
        if (model.getScale() != null) {

            Position from = model.getScale().getFrom();
            Position to = model.getScale().getTo();
            Float fx = null, fy = null, tx = null, ty = null;

            if (from != null) {
                fx = from.getX();
                fy = from.getY();
            }
            if (to != null) {
                tx = to.getX();
                ty = to.getY();
            }


            if (fx != null) {
                setScaleX(fx);
            }

            if (fy != null) {
                setScaleY(fy);
            }

            if (tx != null) {
                list.add(ObjectAnimator.ofFloat(this, "scaleX", tx));
            }

            if (ty != null) {
                list.add(ObjectAnimator.ofFloat(this, "scaleY", ty));
            }

        }

        if (model.getTranslate() != null) {
            Position from = model.getTranslate().getFrom();
            Position to = model.getTranslate().getTo();
            Float fx = null, fy = null, tx = null, ty = null;
            if (from != null) {
                fx = from.getX();
                fy = from.getY();
            }
            if (to != null) {
                tx = to.getX();
                ty = to.getY();
            }

            if (fx != null) {
                setTranslationX(fx);
            }

            if (fy != null) {
                setTranslationY(fy);
            }

            if (tx != null) {
                list.add(ObjectAnimator.ofFloat(this, "translationX", tx));

            }

            if (ty != null) {
                list.add(ObjectAnimator.ofFloat(this, "translationY", ty));
            }

        }

        if (list.size() > 0) {
            animatorSet = new AnimatorSet();
            animatorSet.setDuration(model.getDuration()).setInterpolator(InterpolatorFactory.getInterpolator(model.getInterpolator()));
            animatorSet.setStartDelay(model.getDelay());
            animatorSet.addListener(new Animator.AnimatorListener() {

                @Override
                public void onAnimationStart(Animator animation) {
                    dispatchEvent("start");
                }

                @Override
                public void onAnimationEnd(Animator animation) {
                    dispatchEvent("end");
                }

                @Override
                public void onAnimationCancel(Animator animation) {
                    dispatchEvent("cancel");
                }

                @Override
                public void onAnimationRepeat(Animator animation) {
                    dispatchEvent("repeat");
                }
            });

            animatorSet.playTogether(list);
            animatorSet.start();
        }


    }


    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        // No-op since UIManagerModule handles actually laying out children.
    }

    public void setHeight(int height) {
        ViewGroup.LayoutParams layoutParams = getLayoutParams();
        layoutParams.height = height;
        setLayoutParams(layoutParams);
    }

    public void setWidth(int width) {
        ViewGroup.LayoutParams layoutParams = getLayoutParams();
        layoutParams.width = width;
        setLayoutParams(layoutParams);
    }


}
