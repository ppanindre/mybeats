import { View, Text } from 'react-native'
import React from 'react'

const WrappedText = ({content, lineLimit}) => {
  const lines = content.split(' ');
    let firstLine = '';
    let secondLine = '';
    
    for (const word of lines) {
        if ((firstLine + word).length <= lineLimit) {
            firstLine += (word + ' ');
        } else if ((secondLine + word).length <= lineLimit) {
            secondLine += (word + ' ');
        } else {
            break;
        }
    }

    // Add ellipsis if there are more words
    const displayContent = secondLine.length > 0 ? firstLine.trim() + '...' : content;

    return (
        <Text>
            {displayContent}
        </Text>
    );
}

export default WrappedText