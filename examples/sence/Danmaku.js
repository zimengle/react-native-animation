import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {AnimationView} from '../../dist/animation-view.js'

export default class Danmaku extends Component {

    constructor() {
        super();
        this.state = {
            list: []
        };
        this.index = 0;
        this.timer = null;
    }

    componentDidMount() {
        this.start();
    }

    doStart() {
        this.addItem(this.index);
        this.index++;
    }

    start() {
        this.doStart();
        this.timer = setTimeout(
            () => {
                this.start();
            },
            3000
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    addItem(i) {
        this.state.list.push({
            text: "text" + i,
            top: Math.floor(Math.random() * 800)
        });
        this.setState({
            list: this.state.list
        });
    }

    renderList() {
        let list = [];
        for (let i = 0; i < this.state.list.length; i++) {
            let item = this.state.list[i];
            list.push(
                <AnimationView key={i}>
                    <Text style={{position: 'absolute', right: 0, top: item.top}}>{item.text}</Text>
                </AnimationView>
            );
        }
        return list;

    }

    render() {
        return (
            <View>
                {this.renderList()}
            </View>
        );
    }
}