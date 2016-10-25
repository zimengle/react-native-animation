import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Dimensions, PixelRatio} from 'react-native';
import NativeAnimationView from '../../src/NativeAnimationView';
import AnimationView from '../../src/AnimationView';

export default class MyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {modalVisible: false, opacity: 0};
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    show(height) {

        let screenHeight = Dimensions.get('window').height;
        this._offsetHeight = -(screenHeight/2 + height);
        //181 640
        console.info("height",height,"screenHeight",screenHeight);

        this.refs.view.clearAnimation().setTranslate({
            from: {x: 0, y: this._offsetHeight},
            to: {x: 0, y: 0}
        }).setOpacity({
            to: 1
        }).setScale({
            from:{x:0,y:0},
            to: {x: 1, y: 1}
        }).onStart(() => {
            this.setState({
                opacity: 1
            })
        }).setInterpolator({
            easing: "bounce"
        }).setDuration(10000).start();

    }

    hide() {

        this.refs.view.clearAnimation().setTranslate({
            from: {x: 0, y: 0},
            to: {x: 0, y: this._offsetHeight}
        }).setOpacity({
            to: 0
        }).setScale({
           /* from:{x:1,y:1},*/
            to: {x: 0, y: 0}
        }).onEnd(() => {
            this.setModalVisible(false);
        }).start();
    }

    renderModal() {


        if (this.state.modalVisible) {
            return <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center'
            }}>

                <AnimationView ref={"view"}
                                     style={{
                                         opacity: this.state.opacity,
                                         backgroundColor: '#fff',
                                         height: 200,
                                         marginLeft: 10,
                                         marginRight: 10
                                     }}>

                    <View onLayout={(event)=> {
                        this.show(event.nativeEvent.layout.height)
                    }}>
                        <View style={{backgroundColor: "#f06a6a", height: 50, justifyContent: 'center'}}>
                            <Text style={{color: "#fff", marginLeft: 20}}>提示</Text>
                        </View>

                        <View style={{height: 100, justifyContent: 'center', paddingLeft: 20}}>
                            <Text>是否要删除?</Text>
                        </View>

                        <View style={{alignItems: 'flex-end', paddingRight: 10}}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableHighlight style={{
                                    paddingLeft: 12,
                                    paddingRight: 12,
                                    paddingTop: 6,
                                    paddingBottom: 6,
                                    backgroundColor: '#ee3939',
                                    alignItems: 'center'
                                }} onPress={() => {

                                }}>
                                    <Text style={{color: '#fff'}}>确定</Text>
                                </TouchableHighlight>

                                <TouchableHighlight style={{
                                    marginLeft: 10,
                                    paddingLeft: 12,
                                    paddingRight: 12,
                                    paddingTop: 6,
                                    paddingBottom: 6,
                                    backgroundColor: '#ee3939',
                                    alignItems: 'center'
                                }} onPress={() => {
                                    this.hide();
                                }}>
                                    <Text style={{color: '#fff'}}>取消</Text>
                                </TouchableHighlight>
                            </View>

                        </View>
                    </View>

                </AnimationView>
            </View>;
        }
        return null;
    }

    render() {
        return (

            <View style={{'flex': 1}}>

                <TouchableHighlight style={{
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 6,
                    paddingBottom: 6,

                }} onPress={() => {
                    this.setModalVisible(true);
                }}>
                    <Text>点击这里</Text>
                </TouchableHighlight>

                {this.renderModal()}

            </View>


        );
    }
}