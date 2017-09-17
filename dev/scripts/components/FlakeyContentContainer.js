import React from 'react';
import Radium from 'radium';
import style from '../style.js';

var styles = {
    base: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 20px'
    },

    oneItem: {
        justifyContent: 'flex-start',
        
    },

    twoItems: {
        justifyContent: 'space-between',
    },

    bottomDivider: {
        borderBottom: `1px solid ${style.colors.mute}` 
    }
}

class FlakeyContentContainer extends React.Component {
    
    render() {
        const {bottomDivider, items} = this.props;
        const innerContent = this.props.children;

        const selectedStyles = [styles.base];

        if (items === 2) {
            selectedStyles.push(styles.twoItems);
        } else if (items === 1) {
            selectedStyles.push(styles.oneItem);
        }

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

FlakeyContentContainer = Radium(FlakeyContentContainer);
export default FlakeyContentContainer;