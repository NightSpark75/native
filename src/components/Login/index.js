'use strict'
import React, { Component } from 'react';
import axios from 'axios';
import { AppRegistry, AsyncStorage } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import { Container, Header, Content, StyleProvider } from 'native-base';
import { Form, Item, Input, Left, Body, Right, Title, Label, Toast } from 'native-base';
import { Button, Text, Icon } from 'native-base';
import getTheme from '../NativeBase/components';
import material from '../NativeBase/variables/material';
import config from '../../config';
import { connect } from 'react-redux';
import { login_user, user_menu } from '../../actions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            system: 'ppm',
        };
    }

    componentDidMount() {
        
    }

    accountChange(e) {
        this.setState({account: e.nativeEvent.text})
    }

    passwordChange(e) {
        this.setState({password: e.nativeEvent.text})
    }

    goBack() {
        this.props.navigation.goBack()
    }

    onLogin() {
        const self = this;
        const { account, password, system } = this.state;
        let form_data = new FormData();
        form_data.append('account', account);
        form_data.append('password', password);
        form_data.append('system', system);
        axios.post('http://172.17.100.51/api/web/nativeLogin', form_data)
        .then(function (response) {
            if (response.data.result) {
                self.setLoginUser(response.data.user_info, response.data.user_menu);
                console.log(response.data);
                self.loginSuccess(response.data.user_info);
            } else {
                console.log(response.data);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    setLoginUser(info, menu) {
        const { dispatch } = this.props;
        dispatch(login_user(info));
        dispatch(user_menu(menu));
    }

    loginSuccess(info) {
        Toast.show({
            text: info.user_id + '登入成功!',
            position: 'bottom',
            buttonText: '確定'
        });
        this.goBack();
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left>
                            <Button 
                                transparent
                                onPress={this.goBack.bind(this)}
                            >
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>登入使用者帳號</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content padder>
                        <Form>
                            <Item floatingLabel>
                                <Label>帳號</Label>
                                <Input 
                                    onChange={this.accountChange.bind(this)}
                                    value={this.state.account}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Label>密碼</Label>
                                <Input 
                                    secureTextEntry={true}
                                    onChange={this.passwordChange.bind(this)}
                                    value={this.state.password}
                                />
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
function mapStateToProps(state) {
	const { login } = state
	return {
		login
	}
}

export default connect(mapStateToProps)(withNavigation(Login));
AppRegistry.registerComponent('Login', () => Login);