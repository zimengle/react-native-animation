package com.baidu.rn.animation;


import android.view.ViewGroup;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.views.view.ReactViewGroup;
import com.google.gson.Gson;

import java.util.Map;

import javax.annotation.Nullable;

public class BaiduAnimationViewManager extends ViewGroupManager<BaiduAnimationView> {

    public static final int COMMAND_START = 1;
    public static final int COMMAND_CLEAR = 2;
    public static final int COMMAND_ADD = 3;

    public static final String REACT_CLASS = "RCTAnimationView";

    public static final Gson GSON = new Gson();

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "start",
                COMMAND_START,
                "clear",
                COMMAND_CLEAR,
                "add",
                COMMAND_ADD);
    }



    @Override
    public void receiveCommand(BaiduAnimationView root, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case COMMAND_START: {
                if (args == null || args.size() != 0) {
                    throw new JSApplicationIllegalArgumentException(
                            "Illegal number of arguments for 'COMMAND_START' command");
                }
                root.start();
                break;
            }
            case COMMAND_CLEAR: {
                if (args == null || args.size() != 0) {
                    throw new JSApplicationIllegalArgumentException(
                            "Illegal number of arguments for 'COMMAND_CLEAR' command");
                }
                root.clear();
                break;
            }
            case COMMAND_ADD: {
                if (args == null || args.size() != 1) {
                    throw new JSApplicationIllegalArgumentException(
                            "Illegal number of arguments for 'COMMAND_ADD' command");
                }
                String data = args.getString(0);
                root.addAnimations(GSON.fromJson(data, AnimationModel[].class));
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
}
