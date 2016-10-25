package com.baidu.rn.animation.interpolator;

import android.view.animation.Interpolator;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;

/**
 * {
 *     easing:'step0',
 *     value:'',
 *     inOut:'In'
 *
 * }
 */
public class InterpolatorFactory {


    public static Interpolator getInterpolator(String str){
        Interpolator interpolator = null;
        try {
            if(str != null && !"null".equals(str)){
                JSONObject object = new JSONObject(str);
                String easing = object.getString("easing");
                Double value = null;
                if(object.has("value")){
                    value = object.getDouble("value");
                }

                interpolator = invoke(easing,value);

                if(object.has("inOut")){
                    String inOut = object.getString("inOut");
                    interpolator = invoke(inOut,interpolator);
                }
            }



        } catch (JSONException e) {
            e.printStackTrace();
        }

        if(interpolator == null){
            interpolator = new LinearInterpolator();
        }
        return interpolator;
    }



    public static Interpolator invoke(String method,Object param){

        Class cls = null;

        if("step0".equals(method)){
            cls = Step0Interpolator.class;
        }else if("step1".equals(method)){
            cls = Step1Interpolator.class;
        }else if("linear".equals(method)){
            cls = LinearInterpolator.class;
        }else if("ease".equals(method)){
            cls = EaseInterpolator.class;
        }else if("quad".equals(method)){
            cls = QuadInterpolator.class;
        }else if("cubic".equals(method)){
            cls = CubicInterpolator.class;
        }else if("poly".equals(method)){
            cls = PolyInterpolator.class;
        }else if("sin".equals(method)){
            cls = SinInterpolator.class;
        }else if("circle".equals(method)){
            cls = CircleInterpolator.class;
        }else if("exp".equals(method)){
            cls = ExpInterpolator.class;
        }else if("elastic".equals(method)){
            cls = ElasticInterpolator.class;
        }else if("back".equals(method)){
            cls = BackInterpolator.class;
        }else if("bounce".equals(method)){
            cls = BounceInterpolator.class;
        }else if("in".equals(method)){
            cls = InInterpolator.class;
        }else if("out".equals(method)){
            cls = InInterpolator.class;
        }

        Interpolator i = null;

        if(cls != null){
            try {
                if(param != null){
                    i = (Interpolator) cls.getConstructor(Float.class).newInstance(param);
                }else{
                    i = (Interpolator) cls.getConstructor().newInstance();
                }
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }

        return i;

    }



}
