package com.baidu.rn.animation;

import com.baidu.rn.animation.model.Model;
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
    public static final int COMMAND_STOP = 2;

    public static final String REACT_CLASS = "BaiduAnimationView";

    public static final Gson GSON = new Gson();

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "start",
                COMMAND_START,
                "stop",
                COMMAND_STOP);
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
                data = data.substring(1,data.length()-1);
                root.startAnimation(GSON.fromJson(data, Model.class));
                root.start();
                break;
            }
            case COMMAND_STOP: {
                root.stop();
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
