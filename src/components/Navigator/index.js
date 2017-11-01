'use strict'
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation'
import { Root } from "native-base";
import RouteConfigs from './routeConfigs';
import StackNavigatorConfig from './stackNavigatorConfig';

import { Provider } from 'react-redux'
import configureStore from '../../store/configureStore'
const store = configureStore();


const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default class initProject extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <Provider store={store}>
                <Root>
                    <Navigator />
                </Root>
            </Provider>
        )
    };
}

AppRegistry.registerComponent('stdnative', () => initProject);