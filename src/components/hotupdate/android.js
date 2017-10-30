'use strict'
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import FileTransfer from '@remobile/react-native-file-transfer';
import RNFS from 'react-native-fs';
import config from '../../config';
import { connect } from 'react-redux';
import { login_user } from '../../actions'
import RNRestart from 'react-native-restart';
import { NativeModules } from 'react-native';

const VERSION = config.version
const VERSION_NUMBER = config.version_number;
const URL_VERSION = config.url_version;
const URL_DOWNLOAD = config.url_download;

class hotUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '檢查更新中...',
            new_version: null,
            update: false,
        }
    }

    componentDidMount() {
        let self = this;
        fetch(URL_VERSION, {mode: 'cors'})
            .then((response) => response.json())
            .then((json) => {
                self.setState({ 
                    message: '最新版本為：' + json.version,
                    new_version: json.version,
                });
                let bundlePath = RNFS.DocumentDirectoryPath + '/index.android.bundle';
                let file_size = json.size;
                if (json.result && (json.version_number > VERSION_NUMBER)) {
                    let fileTransfer = new FileTransfer();
                    let msg;
                    self.setState({ message: '更新檔下載中...' });
                    fileTransfer.download(
                        encodeURI(URL_DOWNLOAD), 
                        bundlePath , 
                        (result) => {
                            console.log(result);
                            self.setState({ 
                                message: '程式已更新，請重新啟動!!',
                                update: true,
                            })
                        },
                        (err) => {
                            console.log(err);
                            self.setState({ message: err.exception });
                        },
                        true
                    );
                } else {
                    self.setState({ message: '沒有新版本需要更新...' });
                    self.goLogin();
                }
            })
            .catch(function(error) { 
                self.setState({ message: error.exception })
            });
    }

    goLogin() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Root',
                })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    goRestart() {
        NativeModules.Common.reloadBundle();
    }

    render() {
        const { message, update } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    目前版本：{VERSION}
                </Text>
                <Text style={styles.message}>
                    {message}
                </Text>
                { update && 
                    <Button 
                        title="重新啟動應用程式" 
                        onPress={this.goRestart.bind(this)} 
                        style={styles.restart} 
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#000',
    },
    restart: {
        textAlign: 'center',
        fontSize: 26,
        color: '#64B5F6',
        margin: 10,
    }
});

function mapStateToProps(state) {
	const { login } = state
	return {
		login
	}
}

export default connect(mapStateToProps)(hotUpdate);
AppRegistry.registerComponent('hotupdate', () => hotUpdate);