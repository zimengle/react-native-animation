package com.baidu.rn.animation;

import android.util.Log;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.google.gson.Gson;

import java.util.Map;

import javax.annotation.Nullable;

public class BaiduAnimationViewManager extends ViewGroupManager<BaiduAnimationView> {

    public static final int COMMAND_START = 1;
    public static final int COMMAND_CLEAR = 2;
    public static final int ON_START = 4;
    public static final int ON_END = 5;
    public static final int ON_REPEAT = 6;

    public static final String REACT_CLASS = "TBNAnimationView";

    public static final Gson GSON = new Gson();

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "start",
                COMMAND_START,
                "clear",
                COMMAND_CLEAR);
    }



    @Override
    public void receiveCommand(BaiduAnimationView root, int commandId, @Nullable ReadableArray args) {
        Log.e("zzm",args.toString());
        switch (commandId) {
            case COMMAND_START: {
                if (args == null || args.size() == 0) {
                    throw new JSApplicationIllegalArgumentException(
                            "Illegal number of arguments for 'COMMAND_START' command");
                }
                String data = args.toString();
                root.addAnimations(GSON.fromJson(data, AnimationModel[].class));
                root.start();
                break;
            }
            case COMMAND_CLEAR: {
                if (args == null || args.size() == 0) {
                    throw new JSApplicationIllegalArgumentException(
                            "Illegal number of arguments for 'COMMAND_CLEAR' command");
                }
                root.clear();
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
