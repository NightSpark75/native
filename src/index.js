'use strict'

import check_version_android from './components/HotUpdate/android';

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
        check_version_android();
    }

    function start_ios() {

    }
}