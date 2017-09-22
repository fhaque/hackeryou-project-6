import React                from 'react';
import Radium               from 'radium';

import style from '../style.js';

var styles = {
    base: {
        // display: 'block',
        // width: '100%',
        // maxWidth: '40em',
        
        // padding: '2% 3%',

        border: 'none',
        boxShadow: style.dropShadow.primary,

        color: style.colors.accentText,
        fontSize: '0.5em',
        fontFamily: style.fontFamily.secondary,
        fontWeight: style.fontWeight.heavy,
        textTransform: 'uppercase',

        // '@media (max-width: 30em)': {
        //     fontSize: '0.4em'
        // }
    },

    cancel: {
        backgroundColor: style.colors.alertPrimary,
    },

    normal: {
        backgroundColor: style.colors.accent
    }

}
class FlakeyEditButton extends React.Component {

    render() {
        const {editMode, handleClick} = this.props;

        const selectedStyles = [styles.base];
        
        selectedStyles.push(editMode ? styles.cancel : styles.normal);

        return (
            <button name="edit" onClick={handleClick} className="primaryCardBtn" style={selectedStyles}>
                {editMode ? 'Cancel' : 'Edit'}
            </button>
        );
    }
}

FlakeyEditButton = Radium(FlakeyEditButton);
export default FlakeyEditButton;