'use strict'
import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';
import axios from 'axios';

import { Container, Content, StyleProvider } from 'native-base';
import { View, List, ListItem, Text, Icon, Left, Body, Right, Switch, Separator } from 'native-base';

import getTheme from '../NativeBase/components';
import material from '../NativeBase/variables/material';
import LocalStorage from '../../lib/LocalStorage';

const STORAGE = new LocalStorage();

import { createStore } from 'redux'
import reducers from '../../reducers'
let store = createStore(reducers)

import { login_user } from '../../actions'

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: this.props.menu,
            commonMenu: this.props.commonMenu,
        };
    }

    componentDidMount() {
        this.getCommonMenu();
        /*
        store.dispatch({
            type: 'LOGIN_USER',
            user: [
                {name: '1111'}, 
                {name: '2222'},
            ],
        })
        */
    }

    async getCommonMenu() {
        const self = this;
        let cls = await STORAGE.getValue('@stdnative:user_class');
        axios.get('http://172.17.100.51/api/web/commonMenu/' + cls)
        .then(function (response) {
            if (response.data.result) {
                self.setState({
                    commonMenu: response.data.menu,
                });
                console.log(response.data);
            } else {
                console.log(response.data);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const { commonMenu } = this.state;
        const { login } = store.getState();
        //alert(loginState);
        const menu = login.user_info;
        console.log(store.getState())
        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor: '#fff', margin: 0}}>
                    
                    <List style={{margin:0}}>
                        <Separator bordered>
                            <Text>功能清單</Text>
                        </Separator>
                        {menu != [] && menu.map((item, index) => (
                            <ListItem icon key={index}>
                                <Left>
                                </Left>
                                <Body>
                                    <Text>{item.name}</Text>
                                </Body>
                                <Right>
                                </Right>
                            </ListItem>
                        ))}
                        <Separator bordered>
                            <Text>公用程式</Text>
                        </Separator>
                        {commonMenu != [] && commonMenu.map((item, index) => (
                            <ListItem icon key={index}>
                                <Left>
                                </Left>
                                <Body style={{marginLeft: 0}}>
                                    <Text>{item.prg_name}</Text>
                                </Body>
                                <Right>
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </StyleProvider>
        );
    }
}

AppRegistry.registerComponent('SideBar', () => SideBar);