import React, {Component} from 'react';
import {Text, Navigator,TouchableHighlight} from 'react-native';
import Modal from './sence/Modal';
import Danmaku from './sence/Danmaku';

export default class Home extends Component {
    render() {
        const routes = [
            {title: 'First Scene', index: 0},
            {title: 'Second Scene', index: 1},
        ];
        return (
            <Navigator
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={(route, navigator) => {
                    let Sence;
                    switch (route.index) {
                        case 0:
                            Sence = Modal;
                            break;
                        case 1:
                            Sence = Danmaku;
                            break;
                    }
                    if(scene){
                        return <Sence navigator={navigator}/>
                    }
                    return null;
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                if (route.index === 0) {
                                    return null;
                                } else {
                                    return (
                                        <TouchableHighlight onPress={() => navigator.pop()}>
                                            <Text>Back</Text>
                                        </TouchableHighlight>
                                    );
                                }
                            },
                            RightButton: (route, navigator, index, navState) => {
                                return (<Text>Done</Text>);
                            },
                            Title: (route, navigator, index, navState) => {
                                return (<Text>Awesome Nav Bar</Text>);
                            },
                        }}
                        style={{backgroundColor: 'gray'}}
                    />
                }
                style={{padding: 100}}
            />
        );
    }
}