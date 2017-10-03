'use strict'
import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image } from 'react-native';

import { Container, Header, Content, StyleProvider } from 'native-base';
import { Drawer } from 'native-base';
import SideBar from '../SideBar';
import Hello from '../../containers/Hello';

import getTheme from '../NativeBase/components';
import material from '../NativeBase/variables/material';

export default class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_list: [
                {name: '1111'}, 
                {name: '2222'}
            ],
        };
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };

    openDrawer = () => {
        this.drawer._root.open()
    };

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar navigator={this.navigator} menu={this.state.menu_list} />}
                    onClose={() => this.closeDrawer()} >
                    <Hello openDrawer={this.openDrawer.bind(this)}/>
                </Drawer>
            </StyleProvider>
        );
    }
}
AppRegistry.registerComponent('Root', () => Root);