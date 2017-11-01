'use strict'
import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, StyleProvider } from 'native-base';
import { Left, Body, Right, Title, H1, Text, Icon, Button } from 'native-base';
import { NavigationActions, withNavigation } from 'react-navigation';
import getTheme from '../../components/NativeBase/components';
import material from '../../components/NativeBase/variables/material';
import config from '../../config';

class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

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
                            source={{uri: config.url_image + 'stdshortnamelogo.jpg'}} 
                        />
                        <Title><H1>歡迎使用生達ERP</H1></Title>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

export default withNavigation(Hello);
AppRegistry.registerComponent('Hello', () => Hello);