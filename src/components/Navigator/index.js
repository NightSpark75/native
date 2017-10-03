'use strict'
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation'

import RouteConfigs from './routeConfigs';
import StackNavigatorConfig from './stackNavigatorConfig';

const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default class initProject extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <Navigator/>
        )
    };
}

AppRegistry.registerComponent('stdnative', () => initProject);