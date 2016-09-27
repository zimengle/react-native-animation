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

    start(height) {
        let screenHeight = Dimensions.get('window').height;

        this.refs.view.setTranslate({
            from: {x: 0, y: -PixelRatio.getPixelSizeForLayoutSize(screenHeight + height)},
            to: {x: 0, y: 0}
        });
        this.refs.view.setOpacity({
            from: 0,
            to: 1
        })

        this.refs.view.setDuration(500);

        this.refs.view.start();

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
                                     onStart={()=> {
                                         this.setState({
                                             opacity: 1
                                         })
                                     }}
                                     style={{
                                         opacity: this.state.opacity,
                                         backgroundColor: '#fff',
                                         height: 200,
                                         marginLeft: 10,
                                         marginRight: 10
                                     }}>

                    <View onLayout={(event)=> {
                        this.start(event.nativeEvent.layout.height)
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