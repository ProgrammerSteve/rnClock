

import { useEffect } from 'react';
import { useDerivedValue, useAnimatedStyle, SharedValue, useSharedValue,withRepeat, withTiming } from 'react-native-reanimated';

export const useRotate=(offset:number)=>{
    const seconds = useSharedValue(0);
    const minutes = useSharedValue(0);
    const hours = useSharedValue(0);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const sec = now.getSeconds();
            const min = now.getMinutes();
            const hr = now.getHours() % 12;
            seconds.value = sec * 6;
            minutes.value = min * 6 + sec * 6 /60;
            hours.value = hr * 30 + min * 0.5 + sec * (1 / 120);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000); // Update every second
        return () => clearInterval(interval);
    }, [seconds, minutes, hours]);

    const secondsStyle = useDerivedValue(() => {
        return [
            { rotateZ: seconds.value*Math.PI/180 }
            ];
    }, [seconds]);

    const minutesStyle = useDerivedValue(() => {
        return [
            { rotateZ: minutes.value*Math.PI/180 }
            ];
    }, [minutes]);

    const hoursStyle = useDerivedValue(() => {
        return [
            { rotateZ: hours.value*Math.PI/180 }
            ];
    }, [hours]);

    return { secondsStyle, minutesStyle, hoursStyle };
}