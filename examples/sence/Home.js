import React, {Component} from 'react';
import {Text, View,TouchableHighlight} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View>
                <TouchableHighlight onPress={()=> this.props.navigator.push({name: "Modal"})}>
                    <Text>窗口动画</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigator.push({name: "Danmaku"})}>
                    <Text>弹幕</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigator.push({name: "PixelTest"})}>
                    <Text>连续点击动画</Text>
                </TouchableHighlight>
            </View>

        );
    }
}