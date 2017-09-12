import React from 'react';
import LoggedInUserIndicator from './LoggedInUserIndicator.js';

const Header = function(props) {
    // const {classEnvelope, classTitle} = props.classes;
    const {user, title, editFlakeyMode} = props;
    const userName = user.name;

    const {handleCreateNewFlakey, handleEditFlakey} = props;



    return (
        <header className="Header">
            <h1 className="Header__title">{title}</h1>
            <button onClick={handleCreateNewFlakey} >Create New Flakey</button>
            {/* editFlakeyMode ? 
                <button className="Header__btn Header__editBtn" onClick={handleEditFlakey}>Cancel</button>
            : 
                <button className="Header_btn Header__editBtn" onClick={handleEditFlakey}>Edit Flakey</button>
            */}
            
            <LoggedInUserIndicator userName={userName} className="Header__loggedInUserIndicator" />
        </header>
    );
}

export default Header;