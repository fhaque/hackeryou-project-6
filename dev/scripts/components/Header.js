import React from 'react';
import LoggedInUserIndicator from './LoggedInUserIndicator.js';

const Header = function(props) {
    // const {classEnvelope, classTitle} = props.classes;
    const {userName, title} = props;
    //props for LoggedInUserIndicator sub-component
    // const {loggedInUserIndicator} = props.children; 

    return (
        <header className="Header">
            <h1 className="Header__title">{title}</h1>
            <LoggedInUserIndicator userName={userName} className="Header__loggedInUserIndicator" />
        </header>
    );
}

export default Header;