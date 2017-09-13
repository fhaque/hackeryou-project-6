import React from 'react';

const LoggedInUserIndicator = function(props) {
    const {userName, photoURL} = props;
    // const {classEnvelope} = props.classes; 
    const photoExists = (photoURL !== "");
    const nameExists = (userName !== "");

    return (
        <div className="LoggedInUserIndicator">
        {photoExists && <img className="LoggedInUserIndicator__photo" src={photoURL} alt=""/>}
            
        {nameExists && <p className="LoggedInUserIndicator__greeting">Welcome, {userName}!</p>}
        
        </div>
    );
}

export default LoggedInUserIndicator;