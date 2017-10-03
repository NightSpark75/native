'use strict'
import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image } from 'react-native';

import { Container, Header, Content, StyleProvider } from 'native-base';
import { Left, Body, Right, Title, H1 } from 'native-base';
import { Button, Icon } from 'native-base';

import getTheme from '../../components/NativeBase/components';
import material from '../../components/NativeBase/variables/material';

export default class Hello extends Component {
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
                            <Button transparent onPress={this.props.openDrawer}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content padder style={{ alignSelf: 'center' }}>
                        <Image 
                            resizeMode={'contain'}
                            style={{width: 560, height: 140}} 
                            source={{uri: 'http://172.17.100.51/images/web/stdshortnamelogo.jpg'}} 
                        />
                        <Title><H1>歡迎使用生達ERP</H1></Title>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

AppRegistry.registerComponent('Hello', () => Hello);