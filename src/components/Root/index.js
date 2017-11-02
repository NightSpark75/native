'use strict'
import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image, ScrollView } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import { Container, Header, Content, StyleProvider } from 'native-base';
import { Drawer } from 'native-base';
import SideBar from '../SideBar';
import Document from '../common/qc/document';
import Hello from '../../containers/Hello';

import getTheme from '../NativeBase/components';
import material from '../NativeBase/variables/material';
import LocalStorage from '../../lib/LocalStorage';

let storage = new LocalStorage();

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        storage.init();
    }

    closeDrawer() {
        this.drawer._root.close();
    };

    openDrawer() {
        this.drawer._root.open();
    };

    goNavgation(route) {
        let path = route.replace(/\//ig, "_");
        const navigationAction = NavigationActions.navigate({
            routeName: path,
            params: {},
        });
        this.closeDrawer;
        this.props.navigation.dispatch(navigationAction);
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }} 
                    content={
                        <SideBar 
                            navigator={this.props.navigation} 
                            goNavgation={this.goNavgation.bind(this)}
                        />
                    }
                    onClose={this.closeDrawer.bind(this)} 
                >
                    <Hello openDrawer={this.openDrawer.bind(this)}/>
                </Drawer>
            </StyleProvider>
        );
    }
}
export default withNavigation(Root);
AppRegistry.registerComponent('Root', () => Root);