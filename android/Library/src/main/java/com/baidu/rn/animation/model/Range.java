package com.baidu.rn.animation.model;


import org.json.JSONException;
import org.json.JSONObject;

public class Range {
    private Float from;
    private Float to;

    public Range(JSONObject object) throws JSONException {

        if(Utils.has(object,"from")){
            from = (float)object.getDouble("from");
        }
        if(Utils.has(object,"to")){
            to = (float)object.getDouble("to");
        }

    }

    public Range() {
    }

    public Float getFrom() {
        return from;
    }

    public void setFrom(float from) {
        this.from = from;
    }

    public Float getTo() {
        return to;
    }

    public void setTo(float to) {
        this.to = to;
    }
}
