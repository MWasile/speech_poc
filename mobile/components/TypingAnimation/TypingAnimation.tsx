import { useEffect, useState } from 'react';
import { Text } from 'react-native';

const TypingAnimation = ({ text, speed, onTypingStart, onTypingEnd }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let currentText = '';
        onTypingStart();

        text.split('').forEach((char, index) => {
            setTimeout(() => {
                currentText += char;
                setDisplayText(currentText);

                if (index === text.length - 1) {
                    onTypingEnd();
                }
            }, speed * index);
        });
    }, [text]);

    return (
        <Text>{displayText}</Text>
    );
};

export default TypingAnimation;
