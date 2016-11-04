package com.baidu.rn.animation;

import com.baidu.rn.animation.model.DefaultModel;
import com.baidu.rn.animation.model.Model;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

import javax.annotation.Nullable;

public class BaiduAnimationViewManager extends ViewGroupManager<BaiduAnimationView> {

    public static final int COMMAND_START = 1;
    public static final int COMMAND_STOP = 2;
    public static final int COMMAND_DEFAULT = 3;

    public static final String REACT_CLASS = "BaiduAnimationView";

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "start",
                COMMAND_START,
                "stop",
                COMMAND_STOP,
                "default",
                COMMAND_DEFAULT
        );
    }


    @Override
    public void receiveCommand(BaiduAnimationView root, int commandId, @Nullable ReadableArray args) {

        switch (commandId) {
            case COMMAND_START: {
                if (args == null || args.size() == 0) {
                    throw new JSApplicationIllegalArgumentException(
                            "Illegal number of arguments for 'COMMAND_START' command");
                }
                String data = args.toString();
                data = data.substring(1, data.length() - 1);
                try {
                    root.startAnimation(new Model(new JSONObject(data)));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;
            }
            case COMMAND_STOP: {
                root.stop();
                break;
            }
            case COMMAND_DEFAULT: {
                if (args == null || args.size() == 0) {
                    return;
                }
                String data = args.toString();
                data = data.substring(1, data.length() - 1);
                try {
                    root.setDefault(new DefaultModel(new JSONObject(data)));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;
            }
        }
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }


    @Override
    protected BaiduAnimationView createViewInstance(ThemedReactContext context) {
        return new BaiduAnimationView(context);
    }

    @Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                AnimationChangeEvent.EVENT_NAME, MapBuilder.of("registrationName", "onAnimationChange"));
    }
}
