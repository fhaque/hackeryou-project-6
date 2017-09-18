import React from 'react';
import Radium from 'radium';

import style from '../style.js';

var labelStyles = {
    base: {
        marginBottom: style.fontSize.cardEntryLabel,
        textTransform: 'uppercase',
        fontSize: style.fontSize.cardEntryLabel,
        fontFamily: style.fontFamily.primary,
        fontWeight: style.fontWeight.medium,
        
    },
}

var descriptionStyles = {
    base: {
        fontSize: '0.6em',
        lineHeight: '1.8em',
        fontFamily: style.fontFamily.primary,
        fontWeight: style.fontWeight.medium,
    }
}

class FlakeyDescription extends React.Component {
    render() {
        const {editMode, handleChange, description, uneditedDescription} = this.props;

        return (
            <div>
            <p style={labelStyles.base}>Description</p>
            { editMode ? 
                    <label>
                    <span style={{display:'none'}}>Description:</span>
                        <textarea name="description" onChange={handleChange} value={description} />
                    </label>   
                :
                    <p style={descriptionStyles.base}>{uneditedDescription}</p>
            }
            </div>
        );
    }
}

FlakeyDescription = Radium(FlakeyDescription);
export default FlakeyDescription;