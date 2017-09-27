'use strict'

//import check_version_android from './components/HotUpdate/android';
import nav from './components/Navigator';

export default function native(platform) {
    switch (platform) {
        case 'android':
            start_android();
            break;

        case 'ios':
            start_ios();
            break;
        
        default:
            start_android();
    }

    function start_android() {
        //check_version_android;
        nav;
    }

    function start_ios() {

    }
}