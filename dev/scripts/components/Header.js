import React from 'react';
import LoggedInUserIndicator from './LoggedInUserIndicator.js';

const Header = function(props) {
    const {classEnvelope, classTitle} = props.classes;
    const {title} = props.data;
    //props for LoggedInUserIndicator sub-component
    const {loggedInUserIndicator} = props.children; 

    return (
        <header className={classEnvelope}>
            <h1 className={classTitle}>{title}</h1>
            <LoggedInUserIndicator {...loggedInUserIndicator} />
        </header>
    );
}

export default Header;