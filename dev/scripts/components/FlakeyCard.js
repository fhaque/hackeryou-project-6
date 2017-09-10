import React from 'react';

const FlakeyCard = function(props) {
    const {classEnvelope} = props.classes; 
    const {title, event, amount, dateCreated, dateExpires, owner, potentialFlakers} = props.data;
    return (
        <div className={classEnvelope}>
            <h3>{title}</h3>
            <p>Event: <span>{event}</span></p>

        </div>
    );
}

export default FlakeyCard;