import * as React from 'react';
import { AnimationModel } from './animation-model';
export interface PropsDefine {
    /** 动画数据 */
    data: AnimationModel[];
    style?: React.ViewStyle;
    /** 是否自动播放 */
    autoplay?: boolean;
    /** 是否数据变更时自动清除动画 */
    autoclear?: boolean;
    /** 开始播放动画回调 */
    onStart?: (view: AnimationView) => void;
    /** 结束播放动画回调 */
    onEnd?: (view: AnimationView) => void;
    /** 动画循环结束回调(暂未实现) */
    onRepeatEnd?: (view: AnimationView) => void;
}
export declare class AnimationView extends React.Component<PropsDefine, {}> {
    private _root;
    private _screen_scale;
    private isStart;
    private data;
    private isUnmount;
    constructor(props: PropsDefine, context: any);
    start(): boolean;
    clear(): void;
    add(data?: AnimationModel[]): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: PropsDefine): void;
    render(): JSX.Element;
    private _assignRoot(component);
    private setNativeProps(nativeProps);
    private processData(oriData);
}
