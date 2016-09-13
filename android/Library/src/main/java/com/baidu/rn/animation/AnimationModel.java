package com.baidu.rn.animation;

/**
 * Created by zzy on 2016/6/30.
 */
public class AnimationModel {
    public enum AnimationType {
        translate,
        Rotate,
        Scale,
        Alpha
    }

    public AnimationType type;
    public float from;
    public float to;
    public float from2;
    public float to2;
    public int duration;
    public int startOffset;
    public String interpolator; // 'Linear'
    public float interpolatorData;
    public int repeat;
}
