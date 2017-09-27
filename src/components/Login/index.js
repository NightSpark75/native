'use strict'
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <View>
                <Text>test</Text>
            </View>
        );
    }
}
AppRegistry.registerComponent('Login', () => Login);