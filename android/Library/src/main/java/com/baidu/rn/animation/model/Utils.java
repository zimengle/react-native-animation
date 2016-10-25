package com.baidu.rn.animation.model;

import org.json.JSONObject;

/**
 * Created by zhangzimeng on 16/10/25.
 */

public class Utils {

    public static boolean has(JSONObject object, String prop){
        return object.has(prop) && !object.isNull(prop);
    }

}
