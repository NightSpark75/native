'use strict'
import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';
import axios from 'axios';
import { NavigationActions, withNavigation } from 'react-navigation';
import { Container, Content, StyleProvider } from 'native-base';
import { View, List, ListItem, Text, Icon, Left, Body, Right, Switch, Separator, Button } from 'native-base';

import getTheme from '../NativeBase/components';
import material from '../NativeBase/variables/material';
import LocalStorage from '../../lib/LocalStorage';
import { connect } from 'react-redux';

const STORAGE = new LocalStorage();

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commonMenu: [],
        };
    }

    componentDidMount() {
        this.getCommonMenu();
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

    goNavgation(route) {
        let path = route.replace(/\//ig, "_");
        const navigationAction = NavigationActions.navigate({
            routeName: path,
            params: {},
        });
        this.props.closeDrawer;
        this.props.navigation.dispatch(navigationAction);
    }

    render() {
        const { commonMenu } = this.state;
        const { login } = this.props;
        const user_info = login.user_info;
        const user_menu = login.user_menu;
        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor: '#fff', margin: 0}}>
                    {/*
                    <View style={styles.containerHeaderStyle}>
                        <Image style={styles.containerHeaderImageStyle} source={require('../assets/otsuka_sample.jpg')} />
                        <View style={styles.overlayStyle}>
                            <Text style={styles.overlayTextStyle}>大塚Deお買い物Menu</Text>
                        </View>
                    </View>
                    */}
                    <Content>
                        <List>
                            <Separator bordered>
                                <Text>功能清單</Text>
                            </Separator>
                            {user_menu != [] && user_menu.map((item, index) => (
                                <ListItem icon key={index}>
                                    <Body>
                                        <Text
                                            onPress={this.goNavgation.bind(this, item.web_route)}
                                        >
                                            {item.prg_name}
                                        </Text>
                                    </Body>
                                </ListItem>
                            ))}
                            <Separator bordered>
                                <Text>公用程式</Text>
                            </Separator>
                            {commonMenu != [] && commonMenu.map((item, index) => (
                                <ListItem icon key={index}>
                                    <Body>
                                        <Text
                                            onPress={this.goNavgation.bind(this, item.web_route)}
                                        >
                                            {item.prg_name}
                                        </Text>
                                    </Body>
                                </ListItem>
                            ))}
                            {user_info === '' ? 
                                <ListItem icon>
                                    <Body>
                                        <Text 
                                            onPress={() => this.props.goNavgation('/comm/sys/login')}
                                        >
                                            使用者登入
                                        </Text>
                                    </Body>
                                </ListItem>
                            :
                                <ListItem icon>
                                    <Body>
                                        <Text 
                                            onPress={this.goNavgation.bind(this, '/comm/sys/logout')}
                                        >
                                            使用者 {user_info.user_id} 登出
                                        </Text>
                                    </Body>
                                </ListItem>
                            }
                        </List>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

function mapStateToProps(state) {
	const { login } = state
	return {
		login
	}
}

export default connect(mapStateToProps)(withNavigation(SideBar));
AppRegistry.registerComponent('SideBar', () => SideBar);