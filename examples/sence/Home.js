import React, {Component} from 'react';
import {Text, View,TouchableHighlight} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View>
                <TouchableHighlight onPress={()=> this.props.navigator.push({name: "Modal"})}>
                    <Text>Modal</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.props.navigator.push({name: "Danmaku"})}>
                    <Text>Danmaku</Text>
                </TouchableHighlight>
            </View>

        );
    }
}