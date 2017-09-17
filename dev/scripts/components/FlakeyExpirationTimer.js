import React from 'react';
import moment from 'moment';

class FlakeyExpirationTimer extends React.Component {
    render() {
        const {editMode, handleChange, date, time, dateExpires} = this.props;

        const dateExpiresFormatted = moment(dateExpires).format('MMMM Do YYYY, h:mm:ss a');

        return (
            <div>
            Flakey Expires On:
            { editMode ? 
                    <span>
                        <label>
                            Date:
                            <input type="date" name="date" onChange={handleChange} value={date || moment().format('YYYY-MM-DD')} />
                        </label>
                        <label>
                            Time:
                            <input type="time" name="time" onChange={handleChange} value={time || moment().format('HH:mm')} />
                        </label>
                    </span>
                 :
                    <span className="FlakeyCard__entry-nonEdit">{dateExpiresFormatted}</span>
            }
            
            </div>
        );
    }
}

export default FlakeyExpirationTimer;

