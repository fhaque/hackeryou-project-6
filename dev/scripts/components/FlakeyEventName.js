import React from 'react';
import Radium from 'radium';

import style from '../style.js';

var nonEditStyles = {
    base: {
        fontSize: '1em',
        fontFamily: style.fontFamily.secondary,
        fontWeight: style.fontWeight.medium,
    }
}

var editStyles = {
    base: {
        
    }
}

class FlakeyEventName extends React.Component {
    render() {
        const {editMode, handleChange, event, uneditedEvent} = this.props;

        return (
            <div>
            {editMode ?
                <label>
                    Event Name:
                    <span style={{display:'none'}}>Event Name</span>
                    <input type="text" name="event" onChange={handleChange} value={event} />
                </label>
                :
                <p style={nonEditStyles.base}>{uneditedEvent}</p>
            }
            </div>
        );
    }
}

FlakeyEventName = Radium(FlakeyEventName);
export default FlakeyEventName;