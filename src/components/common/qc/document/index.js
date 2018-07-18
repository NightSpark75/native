'use strict'
import React, { Component } from 'react';
import axios from 'axios';
import { AppRegistry, AsyncStorage, StyleSheet, View } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import { Container, Header, Content, StyleProvider } from 'native-base';
import { Form, Item, Input, Left, Body, Right, Title, Label, Toast, Icon, Card, CardItem } from 'native-base';
import { Button, Text} from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import getTheme from '../../../NativeBase/components';
import material from '../../../NativeBase/variables/material';
import config from '../../../../config';
import { connect } from 'react-redux';
import { login_user } from '../../../../actions'

class Comm_QC_Document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searching: false,
            info: [],
        };
    }

    componentDidMount() {
        
    }

    goBack() {
        this.props.navigation.goBack()
    }

    searchChange(e) {
        this.setState({search: e.nativeEvent.text})
    }

    getInfo() {
        let self = this;
        const search = this.state.search;
        this.setState({searching: true});
        axios.get(config.api + '/api/web/mpe/qc/doc/info/' + search)
        .then(function (response) {
            if (response.data.result) {
                if (response.data.info.length > 0) {
                    self.setState({
                        info: response.data.info,
                    });
                } else {
                    alert('查詢不到任何資料');
                }
                console.log(response.data);
            } else {
                console.log(response.data);
                alert(response.data.msg)
            }
            self.setState({searching: false});
        }).catch(function (error) {
            console.log(error);
            self.setState({searching: false});
        });          
    }
    /*
    formatInfo(info) {
        return Object.keys(info).map(function(key) {
            let arr = info[key];
            return Object.keys(arr).map(function(key) {
                switch (key) {
                    case 'sds_no':
                        return setButton()
                }
                return arr[key];
            })
        });
    }

    setButton(partno, batch, fileno, text) {
        let path = config.api + '/api/web/mpe/qc/doc/read/sds/' + partno + batch + fileno;
        return (
            <Button
                onPress={this.setWebview.bind(this, path)}
            >
                {text}
            </Button>
        )
    }
    */
    setWebview(partno, batch, fileno) {
        let path = config.api + '/api/web/mpe/qc/doc/read/sds/' + partno + batch + fileno;
    }
    
    render() {
        const head = ['料號', '批號', '品名', '儲位', '庫存量', '安全庫存量' , 'SDS', 'COA'];
        const { info } = this.state;
        const { searching } = this.state;
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
                        <Card>
                            <CardItem>
                                <Left>
                                    <Input 
                                        placeholder='請輸入條碼、料號、批號、品名進行查詢...' 
                                        style={styles.searchInput} 
                                        onChange={this.searchChange.bind(this)}
                                        value={this.state.search}
                                    />
                                </Left>
                                <Body>
                                    {searching ? 
                                        <Button disabled style={styles.disabledButton}><Text>查詢</Text></Button>
                                    :
                                        <Button 
                                            style={styles.searchButton}
                                            onPress={this.getInfo.bind(this)}
                                        >
                                            <Text>查詢</Text>
                                        </Button>
                                    }
                                </Body>
                            </CardItem>
                        </Card>
                        {info != [] && 
                            <View style={styles.table}>
                                <View style={styles.header}>
                                    <View style={styles.header}>
                                        <Text>1111</Text>
                                    </View>
                                </View>
                                {info.map((item,index) => (
                                    <View style={styles.body} key={index}>
                                        <View style={{flex:1,borderWidth:1,alignItems:'center',justifyContent:'center', width: 100}}>
                                            <Text>{info.partno}</Text>
                                        </View>
                                        <View style={{borderWidth: 1, width: 100}}>
                                            <Text>{info.batch}</Text>
                                        </View>
                                        <View style={{borderWidth: 1, width: 100}}>
                                            <Text>{info.ename}</Text>
                                        </View>
                                        <View style={{borderWidth: 1, width: 100}}>
                                            <Text>{info.storn}</Text>
                                        </View>
                                        <View style={{borderWidth: 1, width: 100}}>
                                            <Text>{info.qty}</Text>
                                        </View>
                                        <View style={{borderWidth: 1, width: 100}}>
                                            <Text>{info.sfty}</Text>
                                        </View>
                                        <View style={{borderWidth: 1, width: 100}}>
                                            <Button
                                                onPress={this.setWebview.bind(this, info.partno, '/N/', info.sds_no)}
                                            >
                                                <Text>{'SDS文件'}</Text>
                                            </Button>
                                        </View>
                                        <View style={{borderWidth: 1, width: 100}}>
                                            <Button
                                                onPress={this.setWebview.bind(this, info.partno, info.batch, info.sds_no)}
                                            >
                                                <Text>{'COA文件'}</Text>
                                            </Button>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        }
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    searchInput: {
        borderWidth: 1,
        width: 200,
        height: 44,
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: '#42A5F5'
    },
    disabledButton: {
        marginLeft: 10,
    },
    table: {
        borderWidth: 1
    },
    header: {
        height:50,flexDirection:'row',flex:1,borderWidth:1,padding:0,justifyContent:'space-around'
    },
    body: {
        height:50,flexDirection:'row',flex:1,borderWidth:1,padding:0,justifyContent:'space-around'
    },
})

function mapStateToProps(state) {
	const { login } = state
	return {
		login
	}
}

export default connect(mapStateToProps)(withNavigation(Comm_QC_Document));
AppRegistry.registerComponent('Comm_QC_Document', () => Comm_QC_Document);