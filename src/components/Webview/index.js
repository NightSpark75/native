'use strict';
import {
    AppRegistry,
    StyleSheet,
    View,
    WebView,
    BackHandler,
} from 'react-native';
import React, { Component } from 'react';

export default class StdWebView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }
    backHandler = () => {
        this.refs['webview'].goBack();
        return true;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView style={styles.webview_style}
                    ref='webview'
                    source={{uri:'http://172.17.100.51/web/login/ppm'}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                >
                </WebView>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    webview_style: {
        backgroundColor: '#00ff00',
    }
});

AppRegistry.registerComponent('StdWebView', () => StdWebView);