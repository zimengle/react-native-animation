package com.baidu.rn.animation.model;


import org.json.JSONException;
import org.json.JSONObject;

public class Model {

    private String animId;

    private PositionRange translate;

    private Range rotate;

    private PositionRange scale;

    private Range opacity;

    private long duration;

    private String interpolator;

    private long delay;

    public PositionRange getTranslate() {
        return translate;
    }

    public Range getRotate() {
        return rotate;
    }

    public PositionRange getScale() {
        return scale;
    }

    public Range getOpacity() {
        return opacity;
    }

    public long getDuration() {
        return duration;
    }

    public String getInterpolator() {
        return interpolator;
    }

    public long getDelay() {
        return delay;
    }


    public Model() {
    }
    public Model(JSONObject object) throws JSONException {

        if(Utils.has(object,"animId")){
            animId = object.getString("animId");
        }

        if(Utils.has(object,"translate")){
            translate = new PositionRange(object.getJSONObject("translate"));
        }
        if(Utils.has(object,"rotate")){

            rotate = new Range(object.getJSONObject("rotate"));
        }
        if(Utils.has(object,"scale")){
            scale = new PositionRange(object.getJSONObject("scale"));
        }

        if(Utils.has(object,"opacity")){
            opacity = new Range(object.getJSONObject("opacity"));
        }

        if(Utils.has(object,"duration")){
            duration = object.getLong("duration");
        }
        if(Utils.has(object,"interpolator")){
            interpolator = object.getString("interpolator");
        }

        if(Utils.has(object,"delay")){
            delay = object.getLong("delay");
        }



    }

    public String getAnimId() {
        return animId;
    }
}
