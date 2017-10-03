'use strict'
import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

import { Container, Content, StyleProvider } from 'native-base';
import { List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

import getTheme from '../NativeBase/components';
import material from '../NativeBase/variables/material';


export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: this.props.menu,
        };
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <List>
                    <ListItem icon>
                        <Left>
                            <Icon name="plane" />
                        </Left>
                        <Body>
                            <Text>Airplane Mode</Text>
                        </Body>
                        <Right>
                            <Switch value={false} />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Icon name="wifi" />
                        </Left>
                        <Body>
                            <Text>Wi-Fi</Text>
                        </Body>
                        <Right>
                            <Text>GeekyAnts</Text>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Icon name="bluetooth" />
                        </Left>
                        <Body>
                            <Text>Bluetooth</Text>
                        </Body>
                        <Right>
                            <Text>On</Text>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    {this.state.menu != [] && this.state.menu.map((item, index) => (
                        <ListItem icon key={index}>
                            <Left>
                                <Icon name="bluetooth" />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                            </Body>
                            <Right>
                                <Text>On</Text>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    ))}
              </List>
            </Container>
        );
    }
}

AppRegistry.registerComponent('SideBar', () => SideBar);