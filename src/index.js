'use strict'
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
        nav;
    }

    function start_ios() {
        null;
    }
}