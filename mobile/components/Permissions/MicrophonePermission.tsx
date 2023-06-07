import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

function MicrophonePermission () {
    useEffect(() => {
        (async () => {
            const hasPerm = await check(PERMISSIONS.IOS.MICROPHONE);
            if (hasPerm !== RESULTS.GRANTED) {
                await requestMicrophonePermission();
            }
        })();
    }, []);
    

    async function requestMicrophonePermission () {
        const result = await request(PERMISSIONS.IOS.MICROPHONE);
    }

    return null;
}

export default MicrophonePermission;