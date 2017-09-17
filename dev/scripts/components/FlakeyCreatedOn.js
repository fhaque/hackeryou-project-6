import React from 'react';
import moment from 'moment';

class FlakeyCreatedOn extends React.Component {
    render() {
        const {dateCreated} = this.props;

        const dateCreatedFormatted = moment(dateCreated).format('MMMM Do YYYY, h:mm:ss a');

        return (
            <div>
                <p>Created On: <span className="FlakeyCard__entry-nonEdit">{dateCreatedFormatted}</span></p>
            </div>
        );
    }
}

export default FlakeyCreatedOn;