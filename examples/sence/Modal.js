import React, {Component} from 'react';
import {View,Text} from 'react-native';

import FormView from '../component/Form';
export default class Modal extends Component {
    render() {
        return (
            <View >
                <FormView style={{padding:30}}/>
            </View>
        );
    }
}