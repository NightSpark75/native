'use strict'
import React, { Component } from 'react';
import axios from 'axios';
import { AppRegistry, AsyncStorage } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import { Container, Header, Content, StyleProvider } from 'native-base';
import { Form, Item, Input, Left, Body, Right, Title, Label, Toast } from 'native-base';
import { Button, Text, Icon } from 'native-base';
import getTheme from '../../../NativeBase/components';
import material from '../../../NativeBase/variables/material';
import config from '../../../../config';
import { connect } from 'react-redux';
import { login_user } from '../../../../actions'

class Comm_QC_Document extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        
    }

    goBack() {
        this.props.navigation.goBack()
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
                            <Title>QC試劑文件查詢</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content padder>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

function mapStateToProps(state) {
	const { login } = state
	return {
		login
	}
}

export default connect(mapStateToProps)(withNavigation(Comm_QC_Document));
AppRegistry.registerComponent('Comm_QC_Document', () => Comm_QC_Document);