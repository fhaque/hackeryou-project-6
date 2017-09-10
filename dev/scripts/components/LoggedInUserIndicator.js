import React from 'react';

const LoggedInUserIndicator = function(props) {
    const {userName} = props;
    // const {classEnvelope} = props.classes; 
    return (
        <div>Welcome, {userName}!</div>
    );
}

export default LoggedInUserIndicator;