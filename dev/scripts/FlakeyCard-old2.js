import React from 'react';
import moment from 'moment';

//Flakey card view modes: small view, large view
//Flakey card function modes: view, edit
//Flakey user states: member, owner

const FlakeyCard = function(props) {
    // const {classEnvelope} = props.classes; 
    const {title, event, amount, dateCreated, dateExpires, dateCreatedFormatted,dateExpiresFormatted, owner, members, date, time, description} = props;

    const {handleClick, handleChange} = props;
    
    const {viewMode, functionMode, userMode} = props;

    const editMode = (functionMode === 'edit');
    let isOwner = (userMode === 'owner');

    let isEditable = (editMode && isOwner);

    let isNew = (dateCreated === '' || dateCreated === undefined || dateCreated === null || dateCreated === 0);

    let isLargeView = (viewMode === 'large');

    isLargeView = true;

    isEditable = true;
    isOwner = true;

    return (
        <div className="FlakeyCard" onClick={handleClick}>
            <form>
            { isEditable ?
                <label>
                    Flakey Title:
                    <input type="text" name="title" onChange={handleChange} value={title} />
                </label>
            : <h3>{title}</h3>}

            <p>Event Name: 
            { isEditable ? (
                <label>
                    <span style={{display:'none'}}>Event Name</span>
                    <input type="text" name="event" onChange={handleChange} value={event} />
                </label>
                ) : ( 
                <span>{event}</span>)}
            </p>

            <p>This Flakey Expires On: 
            { (isNew && isEditable) ? (
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
            ) : (
                <span>{dateExpiresFormatted}</span>)}
            </p>

            <p>Punishment: 
            { (isNew && isEditable) ? (
                <label>
                    <span style={{display:'none'}}>Punishment amount:</span>
                    <input type="text" name="amount" onChange={handleChange} value={amount} />
                </label>
            ) : (
                <span>${Math.round(amount * 100) / 100}</span>)}
            
            </p>

            <p>Description:</p>
            { isEditable ? (
                <label>
                <span style={{display:'none'}}>Description:</span>
                    <textarea name="description" onChange={handleChange} value={description} />
                </label>   
            ) : (
                <p>{description}</p>)}

            <p>Created by: <span>{owner.name}</span></p>
            <p>Created On: <span>{dateCreatedFormatted}</span></p>
            {isLargeView && <p>Potential Flakers:</p>}
            {isLargeView && <ul>
                {members.map( (member) => {
                    return (
                        <li key={member.uid}>{member.name}</li>
                    );
                })}
            </ul>}
            
            {isOwner && <button>Save & Commit to Flakey</button>}
            {!isOwner && <button>Commit to Flakey</button>}
        </form>
        {isOwner && <button>Cancel</button>}
        {isOwner && <button>Delete</button>}
        </div>
    );
}

export default FlakeyCard;