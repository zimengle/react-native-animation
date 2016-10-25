package com.baidu.rn.animation.model;


import org.json.JSONException;
import org.json.JSONObject;

public class PositionRange {
    private Position from;
    private Position to;


    public PositionRange(JSONObject object) throws JSONException {

        if(Utils.has(object,"from")){
            from = new Position(object.getJSONObject("from"));
        }
        if(Utils.has(object,"to")){
            to = new Position(object.getJSONObject("to"));
        }

    }

    public PositionRange() {
    }

    public Position getFrom() {
        return from;
    }

    public void setFrom(Position from) {
        this.from = from;
    }

    public Position getTo() {
        return to;
    }

    public void setTo(Position to) {
        this.to = to;
    }
}
