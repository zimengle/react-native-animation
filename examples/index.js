import React, {Component} from 'react';
import {Text, Navigator,TouchableHighlight} from 'react-native';
import Modal from './sence/Modal';
import Danmaku from './sence/Danmaku';
import Home from './sence/Home';

export default class Index extends Component {
    render() {
        const routes = [
            {name: 'Home'},
            {name: 'Modal'},
            {name: 'Danmaku'}
        ];
        return (
            <Navigator
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={(route, navigator) => {

                    let Sence;
                    switch (route.name) {
                        case "Home":
                            Sence = Home;
                            break;
                        case "Modal":
                            Sence = Modal;
                            break;
                        case "Danmaku":
                            Sence = Danmaku;
                            break;
                    }

                    if(Sence){
                        return <Sence navigator={navigator}/>
                    }
                    return null;
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                if (index === 0) {
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
                        style={{height:30,backgroundColor:"#4285f4"}}
                    />
                }
                style={{paddingTop:30}}
            />
        );
    }
}