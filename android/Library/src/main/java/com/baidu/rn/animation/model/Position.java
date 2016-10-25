package com.baidu.rn.animation.model;


import org.json.JSONException;
import org.json.JSONObject;

public class Position {
    private Float x;
    private Float y;

    public Position() {
    }
    public Position(JSONObject object) throws JSONException {

        if(Utils.has(object,"x")){
            x = (float)object.getDouble("x");
        }
        if(Utils.has(object,"y")){
            y = (float)object.getDouble("y");
        }

    }


    public Float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public Float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }
}
