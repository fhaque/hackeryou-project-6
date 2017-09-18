import React from 'react';
import Radium from 'radium';

import style from '../style.js';

var styles = {
    base: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '15px 20px',
    },

    bottomDivider: {
        borderBottom: `1px solid ${style.colors.mute}` 
    },
}

class FlakeyEditActionArea extends React.Component {
    render() {
        const {bottomDivider} = this.props;
        const innerContent = this.props.children;

        const selectedStyles = [styles.base];

        if (bottomDivider) {
            selectedStyles.push(styles.bottomDivider);
        }

        return (
            <div style={selectedStyles}>
                {innerContent}
            </div>
        );
    }
}

FlakeyEditActionArea = Radium(FlakeyEditActionArea);
export default FlakeyEditActionArea;