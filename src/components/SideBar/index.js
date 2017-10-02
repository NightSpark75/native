'use strict'
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { Container, Header, Content, StyleProvider } from 'native-base';
import { Form, Item, Input, Left, Body, Right, Title, H1, Label, List, ListItem } from 'native-base';
import { Button, Text, Icon } from 'native-base';

import getTheme from '../NativeBase/components';
import material from '../NativeBase/variables/material';


export default class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left>
                        </Left>
                        <Body>
                            <Text>SideBar</Text>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content>
                    <List>
                        <ListItem itemHeader first>
                        <Text>COMEDY</Text>
                        </ListItem>
                        <ListItem >
                        <Text>Hangover</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Horrible Bosses</Text>
                        </ListItem>
                        <ListItem last>
                        <Text>Conjuring</Text>
                        </ListItem>
                        <ListItem itemHeader>
                        <Text>ACTION</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Terminator Genesis</Text>
                        </ListItem>
                    </List>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

AppRegistry.registerComponent('SideBar', () => SideBar);