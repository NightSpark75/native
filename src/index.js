'use strict'
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
//import FileTransfer from '@remobile/react-native-file-transfer';

import pack from '../package'

var FileTransfer = require('@remobile/react-native-file-transfer');
const VERSION = pack.version
const VERSION_NUMBER = pack.version_number;
const URL_VERSION = 'http://172.17.100.51/api/native/pad/bundle/version';
const URL_DOWNLOAD = 'http://172.17.100.51/api/native/pad/bundle/download';

export default function native(platform) {
    class Stdnative extends Component {
        constructor(props) {
            super(props);

            this.state = {
                message: 'non message',
            }
        }

        componentDidMount() {
            this.setState({message: 'DidMount'});
            let self = this;
            fetch(URL_VERSION, {mode: 'cors'})
                .then((response) => response.json())
                .then((json) => {
                    if (json.result && (json.version > VERSION_NUMBER)) {
                        let fileTransfer = new FileTransfer();
                        let bundlePath = NativeModules.hotupdate.filePath();
                        let rebootApp = self.reboot();
                        fileTransfer.onprogress = (progress) => {
                            console.log(parseInt(progress.loaded * 100 / progress.total))
                            self.setState({ message: progress.loaded * 100 / progress.total })
                        };
                        // url：新版本bundle的zip的url地址
                        // bundlePath：存在新版本bundle的路径
                        // unzipJSZipFile：下载完成后执行的回调方法，这里是解压缩zip
                        fileTransfer.download(URL_DOWNLOAD, bundlePath, rebootApp, (err) => {
                            console.log(err);
                            self.setState({ message: err });
                        }, true
                        );
                    } else {
                        self.setState({ message: '沒有新版本需要更新...' })
                    }
                })
                .catch(function(error) { 
                    self.setState({ message: error })
                });
        }

        reboot() {
            this.setState({ message: '更新檔已下載完成，請重開應用程式...' });
        }

        render() {
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome} >
                        {VERSION}
                    </Text>
                    <Text style={styles.welcome} >
                        顯示訊息：{this.state.message}
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

    AppRegistry.registerComponent('stdnative', () => Stdnative);
}
