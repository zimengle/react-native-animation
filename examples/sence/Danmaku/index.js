import React, {Component} from 'react';
import {View, Text, Dimensions, PixelRatio} from 'react-native';
import Item from './Item'


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
            2000
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    addItem(i) {
        let {height} = Dimensions.get('window');
        let top = Math.floor(Math.random() * height);
        this.state.list.push(
            <Item key={i} style={{position: 'absolute', top: top}}>
            </Item>
        );
        this.setState({
            list: this.state.list
        });
    }


    render() {
        return (
            <View>
                {
                    this.state.list.map(function (comp, i) {

                        return comp;
                    })
                }
            </View>
        );
    }
}