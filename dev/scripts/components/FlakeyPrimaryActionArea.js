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

    alert: {
        backgroundColor: style.colors.alertSecondary,
    }
}

class FlakeyPrimaryActionArea extends React.Component {
    render() {
        const {bottomDivider, alert} = this.props;
        const innerContent = this.props.children;

        const selectedStyles = [styles.base];

        if (bottomDivider) {
            selectedStyles.push(styles.bottomDivider);
        }

        if (alert) {
            selectedStyles.push(styles.alert);
        }

        return (
            <div style={selectedStyles}>
                {innerContent}
            </div>
        );
    }
}

FlakeyPrimaryActionArea = Radium(FlakeyPrimaryActionArea);
export default FlakeyPrimaryActionArea;