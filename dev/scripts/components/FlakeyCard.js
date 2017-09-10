import React from 'react';

const FlakeyCard = function(props) {
    // const {classEnvelope} = props.classes; 
    const {title, event, amount, dateCreated, dateExpires, owner, members} = props;

    const {expand} = props; 

    return (
        <div className="FlakeyCard">
            <h3>{title}</h3>

            <p>Event: <span>{event}</span></p>
            <p>Expiry Date: <span>{dateExpires}</span></p>
            <p>Punishment: <span>${Math.round(amount * 100) / 100}</span></p>
            <p>Created by: <span>{owner.name}</span></p>
            <p>Created On: <span>{dateCreated}</span></p>
            {expand && <p>Potential Flakers:</p>}
            {expand && <ul>
                {members.map( (member) => {
                    return (
                        <li key={member.uid}>{member.name}</li>
                    );
                })}
            </ul>}
        </div>
    );
}

export default FlakeyCard;