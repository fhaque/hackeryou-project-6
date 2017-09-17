import React from 'react';

class FlakeyEventName extends React.Component {
    render() {
        const {editMode, handleChange, event, uneditedEvent} = this.props;

        return (
            <div>
            Event Name:
            {editMode ?
                <label>
                    <span style={{display:'none'}}>Event Name</span>
                    <input type="text" name="event" onChange={handleChange} value={event} />
                </label>
                :
                <span className="FlakeyCard__entry-nonEdit">{uneditedEvent}</span>
            }
            </div>
        );
    }
}

export default FlakeyEventName;