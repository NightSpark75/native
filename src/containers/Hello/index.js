'use strict'
import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image } from 'react-native';

import { Container, Header, Content, StyleProvider } from 'native-base';
import { Left, Body, Right, Title, H1, Text } from 'native-base';
import { Button, Icon } from 'native-base';

import getTheme from '../../components/NativeBase/components';
import material from '../../components/NativeBase/variables/material';
import config from '../../config';
import { connect } from 'react-redux';
import { login_user } from '../../actions'

import { NativeModules } from 'react-native';

class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(login_user([{name: '8888'}, {name: '9999'}]))
    }

    test() {
        NativeModules.Common.reloadBundle();
    }

    render() {
        const { login } = this.props
        const user_info = login.user_info
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
                        {user_info && user_info.map((item, index) => (
                            <H1 key={index}>{ item.name }</H1>
                        ))}
                        <Button block primary onPress={this.test.bind(this)}>
                            <Text>測試</Text>
                        </Button>
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

export default connect(mapStateToProps)(Hello);
AppRegistry.registerComponent('Hello', () => Hello);