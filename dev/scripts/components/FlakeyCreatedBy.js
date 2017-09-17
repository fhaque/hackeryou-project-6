import React from 'react';

class FlakeyCreatedBy extends React.Component {
    render() {
        const {name} = this.props;

        return (
            <div>
                <p>Created by: <span className="FlakeyCard__entry-nonEdit">{name}</span></p>
            </div>
        );
    }
}

export default FlakeyCreatedBy;