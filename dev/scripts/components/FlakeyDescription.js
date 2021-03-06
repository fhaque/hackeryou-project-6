import React from 'react';
import Radium from 'radium';

import style from '../style.js';

var labelStyles = style.el.labelStyles;

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
                        <textarea name="description" onChange={handleChange} value={description} style={[style.el.formInput.base, descriptionStyles.base]}/>
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