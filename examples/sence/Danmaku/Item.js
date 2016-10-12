import React, {Component} from 'react';
import {View, Text,Dimensions,PixelRatio} from 'react-native';
import AnimationView from '../../../src/AnimationView';

import NativeAnimationView from '../../../src/NativeAnimationView';
export default class Item extends Component {

    constructor() {
        super();
        this.state = {
            _isRemove: false,
            opacity:0
        }
    }

    remove() {
        this.setState({
            _isRemove: true
        });
    }

    start(width) {
        let screenWidth = Dimensions.get('window').width;

        this.refs.view.setTranslate({from: {x: -width, y: 0}, to: {x: screenWidth, y: 0}})

        this.refs.view.start();

    }

    render() {
        if (this.state._isRemove) {
            console.info("remove");
            return null;
        }
        return (
            <AnimationView onEnd={()=> {
                this.remove();
            }} onStart={()=>{
                this.setState({
                    opacity:1
                })
            }} ref={"view"} style={[this.props.style,{opacity:this.state.opacity}]} duration={3000}>
                <Text onLayout={(event)=> {
                    this.start(event.nativeEvent.layout.width)
                }}>帅气啊</Text>
            </AnimationView>
        );
    }
}