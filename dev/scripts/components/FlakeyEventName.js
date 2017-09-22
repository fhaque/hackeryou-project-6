import React from 'react';
import Radium from 'radium';

import style from '../style.js';

var nonEditStyles = {
    base: {
        fontSize: '1em',
        fontFamily: style.fontFamily.secondary,
        fontWeight: style.fontWeight.medium,

        '@media (max-width: 30em)': {
            fontSize: '0.8em'
        }
    }
}

var editStyles = {
    base: {
        fontSize: '1em',
        fontFamily: style.fontFamily.secondary,
        fontWeight: style.fontWeight.medium,
    }
}

var labelStyles = style.el.labelStyles;


class FlakeyEventName extends React.Component {
    render() {
        const {editMode, handleChange, event, uneditedEvent} = this.props;

        return (
            <div>
            {editMode ?
                <div style={editStyles.base}>
                    <p style={labelStyles.base}>Event Name</p>
                    <label>
                        
                        <span style={{display:'none'}}>Event Name</span>
                        <input type="text" name="event" onChange={handleChange} value={event} style={style.el.formInput.base} required/>
                    </label>
                </div>
                :
                <p style={nonEditStyles.base}>{uneditedEvent}</p>
            }
            </div>
        );
    }
}

FlakeyEventName = Radium(FlakeyEventName);
export default FlakeyEventName;