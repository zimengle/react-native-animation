import React, {Component} from 'react';
import {View, Text, Dimensions, PixelRatio, TouchableHighlight} from 'react-native';
import NativeAnimationView from '../../../src/NativeAnimationView';
import AnimationView from '../../../src/AnimationView';


export default class PixelTest extends Component {

    start() {
        let screenHeight = Dimensions.get('window').height;
        if (!this.top) {
            this.top = true;
            this.refs.view.clearAnimation()
                .setTranslate({
                    to: {x: 0, y: screenHeight / 2}
                }).setOpacity({
                to: 0
            }).onStart(()=>{
                console.info("start");
            }).onEnd(()=>{
                console.info("end");
            }).setDuration(500).start();
        } else {
            this.top = false;
            this.refs.view.clearAnimation()
                .setTranslate({
                    to: {x: 0, y: 0}
                }).setOpacity({
                to: 1
            }).onStart(()=>{
                console.info("start");
            }).onEnd(()=>{
                console.info("end");
            }).setDuration(500).start();
        }


    }

    render() {

        return (<View style={{flexDirection: 'row',marginTop:20}}>
            <TouchableHighlight onPress={() => {
                this.start();
            }}>
                <Text>点我</Text>
            </TouchableHighlight>
            <NativeAnimationView style={{backgroundColor:'#ff0000'}} ref="view">
                <Text>动起来</Text>
            </NativeAnimationView>
        </View>);

    }


}

