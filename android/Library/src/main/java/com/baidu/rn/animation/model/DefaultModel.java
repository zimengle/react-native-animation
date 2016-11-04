package com.baidu.rn.animation.model;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by zhangzimeng on 16/11/4.
 */

public class DefaultModel {

    private Position translate;

    private Float rotate;

    private Position scale;

    private Float opacity;

    public DefaultModel() {
    }

    public DefaultModel(JSONObject object) throws JSONException {

        if(Utils.has(object,"translate")){
            translate = new Position(object.getJSONObject("translate"));
        }
        if(Utils.has(object,"rotate")){

            rotate = (float)(object.getDouble("rotate"));
        }
        if(Utils.has(object,"scale")){
            scale = new Position(object.getJSONObject("scale"));
        }

        if(Utils.has(object,"opacity")){
            opacity = (float)(object.getDouble("opacity"));
        }

    }

    public Position getTranslate() {
        return translate;
    }

    public Float getRotate() {
        return rotate;
    }

    public Position getScale() {
        return scale;
    }

    public Float getOpacity() {
        return opacity;
    }
}
