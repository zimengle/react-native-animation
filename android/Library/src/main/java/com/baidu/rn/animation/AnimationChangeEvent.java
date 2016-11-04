package com.baidu.rn.animation;



import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;


public class AnimationChangeEvent extends Event<AnimationChangeEvent> {



    public static final String EVENT_NAME = "topAnimationChange";

    private String type;

    public AnimationChangeEvent(int viewTag, String type) {
        super(viewTag);
        this.type = type;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {

        WritableMap event = Arguments.createMap();
        event.putString("type", type);
        rctEventEmitter.receiveEvent(this.getViewTag(),this.getEventName(),event);
    }

}
