'use strict'
import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';

import { Container, Header, Content, StyleProvider } from 'native-base';
import { Form, Item, Input, Left, Body, Right, Title, Label } from 'native-base';
import { Button, Text } from 'native-base';

import getTheme from '../NativeBase/components';
import material from '../NativeBase/variables/material';

var STORAGE_KEY = 'I_AM_KEY';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    onLogin() {
        
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left />
                        <Body>
                            <Title>登入使用者帳號</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content padder>
                        <Form>
                            <Item floatingLabel>
                                <Label>帳號</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel last>
                                <Label>密碼</Label>
                                <Input secureTextEntry={true}/>
                            </Item>
                        </Form>
                        <Button block primary onPress={this.onLogin.bind(this)}>
                            <Text>登入</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

AppRegistry.registerComponent('Login', () => Login);