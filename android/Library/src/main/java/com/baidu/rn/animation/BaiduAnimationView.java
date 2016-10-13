package com.baidu.rn.animation;
import android.animation.Animator;
import android.content.Context;
import android.view.animation.AnimationSet;
import com.baidu.rn.animation.interpolator.InterpolatorFactory;
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


    }

    private void dispatchEvent(String type) {
        WritableMap event = Arguments.createMap();
        event.putString("type", type);
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "topChange",
                event);
    }

    public void stop() {
        clearAnimation();
    }



    public void startAnimation(Model model) {

        if (model.getOpacity() != null) {
            Float from = model.getOpacity().getFrom();
            Float to = model.getOpacity().getTo();
            if (from != null) {
                setAlpha(from);
            }
            if (to != null) {
                animate().alpha(to);
            }
        }
        if (model.getRotate() != null) {
            Float from = model.getRotate().getFrom();
            Float to = model.getRotate().getTo();
            if (from != null) {
                setRotation(from);
            }
            if (to != null) {
                animate().rotation(to);
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
                animate().scaleX(tx);
            }

            if (ty != null) {
                animate().scaleY(ty);
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
                animate().translationY(tx);

            }

            if (ty != null) {
                animate().translationY(ty);
            }

        }

        animate().setDuration(model.getDuration()).setInterpolator(InterpolatorFactory.getInterpolator(model.getInterpolator())).setStartDelay(model.getDelay())
                .setListener(new Animator.AnimatorListener() {
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
                }).start();

    }


    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        // No-op since UIManagerModule handles actually laying out children.
    }
}
