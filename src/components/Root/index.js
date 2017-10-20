'use strict'
import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import { Container, Header, Content, StyleProvider } from 'native-base';
import { Drawer } from 'native-base';
import SideBar from '../SideBar';
import Hello from '../../containers/Hello';

import getTheme from '../NativeBase/components';
import material from '../NativeBase/variables/material';
import LocalStorage from '../../lib/LocalStorage';

let storage = new LocalStorage();

export default class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            commonMenu: [],
        };
    }

    componentDidMount() {
        storage.init();
    }

    closeDrawer = () => {
        this.drawer._root.close();
    };

    openDrawer = () => {
        this.drawer._root.open();
    };

    render() {
        const { menu, commonMenu } = this.state;
        return (
            <StyleProvider style={getTheme(material)}>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar navigator={this.props.navigation} menu={this.state.menu} commonMenu={this.state.commonMenu}/>}
                    onClose={() => this.closeDrawer()} 
                >
                    <Hello openDrawer={this.openDrawer.bind(this)}/>
                </Drawer>
            </StyleProvider>
        );
    }
}
AppRegistry.registerComponent('Root', () => Root);