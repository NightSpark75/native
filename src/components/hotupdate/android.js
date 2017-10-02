'use strict'
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation'
import FileTransfer from '@remobile/react-native-file-transfer';
import RNFS from 'react-native-fs';
import RNRestart from 'react-native-restart';

const VERSION = '1.23.9'
const VERSION_NUMBER = 1001023009;
const URL_VERSION = 'http://172.17.100.51/api/native/pad/bundle/version';
const URL_DOWNLOAD = 'http://172.17.100.51/api/native/pad/bundle/download';


//export default function hotUpdate() {
//    class hotUpdate extends Component {
export default class hotUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '檢查更新中...',
        }
    }

    componentDidMount() {
        let self = this;
        fetch(URL_VERSION, {mode: 'cors'})
            .then((response) => response.json())
            .then((json) => {
                self.setState({ message: '最新版本為：' + json.version });
                let bundlePath = RNFS.DocumentDirectoryPath + '/index.android.bundle';
                //let bundlePath = '/sdcard/data/index.android.bundle';
                //let bundlePath = '/data/user/0/com.stdnative/cache/123131.bundle'
                if (json.result && (json.version_number > VERSION_NUMBER)) {
                    let fileTransfer = new FileTransfer();
                    let msg;
                    self.setState({ message: '下載程序開始' });
                    fileTransfer.onprogress = (progress) => {
                        self.setState({ message: progress.loaded + '/' + progress.total })
                    };
                    // url：新版本bundle的zip的url地址
                    // bundlePath：存在新版本bundle的路径
                    // unzipJSZipFile：下载完成后执行的回调方法，这里是解压缩zip
                    //self.setState({ message: URL_DOWNLOAD })
                    fileTransfer.download(encodeURI(URL_DOWNLOAD), bundlePath 
                    , (result) => {
                        console.log(result);
                        self.setState({ message: '程式已更新，請重新啟動!!'});
                    }
                    , (err) => {
                        console.log(err);
                        self.setState({ message: err.exception });
                    }
                    , true
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    版本：{VERSION}
                </Text>
                <Text style={styles.welcome}>
                    {this.state.message}
                </Text>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

AppRegistry.registerComponent('hotupdate', () => hotUpdate);