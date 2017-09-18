import React from 'react';
import Radium from 'radium';
import style from '../style.js';

var styles = {
    base: {
        padding: '15px 20px'
    },

    oneItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        
    },

    twoItems: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    bottomDivider: {
        borderBottom: `1px solid ${style.colors.mute}` 
    },

    alert: {
        background: style.colors.alertSecondary,
    },

    gradientAlert: {
        background: `linear-gradient(90deg, ${style.colors.alertPrimary}, ${style.colors.alertSecondary})`,
        boxShadow: style.dropShadow.inset
    },
    
    gradientNormal: {
        background: `linear-gradient(90deg, ${style.colors.primary}, ${style.colors.secondary})`,
        boxShadow: style.dropShadow.inset
    }

}

class FlakeyContentContainer extends React.Component {
    
    render() {
        const {bottomDivider, items, bgStyle} = this.props;
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

        if (bgStyle) {
            selectedStyles.push(styles[bgStyle]);
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