package com.baidu.rn.animation;


public class AnimationModel {
    public enum AnimationType {
        Translate,
        Rotate,
        Scale,
        Alpha
    }

    public AnimationType type;
    public Float from;
    public Float to;
    public Float from2;
    public Float to2;
    public int duration;
    public int startOffset;
    public String interpolator; // 'Linear'
    public float interpolatorData;
    public int repeat;
}