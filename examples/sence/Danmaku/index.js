import React, {Component} from 'react';
import {View, Text,Dimensions} from 'react-native';
import AnimationView from '../../../src/AnimationView'



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
            100
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    addItem(i) {
        let {height, width} = Dimensions.get('window');
        console.info(width,height);
        let top = Math.floor(Math.random()*100);
        this.state.list.push(
            <AnimationView style={{top:top}} duration={3000} translate={{from: {x: 0, y: 0}, to: {x: 1080, y: 0}}}
                           autoplay={true} key={i}>
                <Text>{"text" + i}</Text>
            </AnimationView>
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