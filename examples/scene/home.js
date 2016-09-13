import React, {Component} from 'react';
import {Text, Navigator} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{title: 'Awesome Scene', index: 0}}
                renderScene={(route, navigator) =>
                    <Text>Hello {route.title}!</Text>
                }
                style={{padding: 100}}
            />
        );
    }
}