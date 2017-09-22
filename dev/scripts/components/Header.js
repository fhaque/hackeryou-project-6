import React from 'react';
import Radium from 'radium';

import style from '../style.js';

import LoggedInUserIndicator from './LoggedInUserIndicator';
import AddFlakeyKeyBar from './AddFlakeyKeyBar';

var styles = {
    base: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',

        padding: '20px 0px',

        color: style.colors.heading,
        fontFamily: style.fontFamily.secondary,
        backgroundColor: style.colors.dark,
    
        boxShadow: style.dropShadow.primary,
    }
}

var titleStyles = {
    base: {
        fontSize: style.fontSize.headingPrimary,
    }
}

var loggedInUserUIStyles = {
    base: {
        // display: 'flex',
        // justifyContent: 'space-between',
    }
}

var buttonStyles = style.el.button;

buttonStyles.header = {
    // fontSize: '1.5rem',
    // padding: '1rem 2rem',
}



var buttonContainerStyles = {
    base: {
        // display: 'flex',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // flexWrap: 'wrap',

    }
}

class Header extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, flakeyId) {
        e.preventDefault();
        this.props.history.push(`/flakeys/${flakeyId}`);

    }

    render() {
        // const {classEnvelope, classTitle} = props.classes;
        const {user, userAuth, title, editFlakeyMode, history} = this.props;
        const userName = user.name;
        const photoURL = user.photoURL;

        const {handleCreateNewFlakey, handleToFlakeysView, login, logout} = this.props;

        const selectedStyles = {};
        selectedStyles.button = [buttonStyles.base, buttonStyles.header];

        return (
            <header className="Header" style={styles.base}>
                <h1 style={titleStyles.base}>{title}</h1>
                {userAuth &&
                <div  className="Header__uiActionsContainer" style={loggedInUserUIStyles.base}>
                    <AddFlakeyKeyBar handleSubmit={this.handleSubmit} />
                    <div className='Header__btnContainer' style={buttonContainerStyles.base}>
                        <button onClick={(e) => handleCreateNewFlakey(e, this.props.history)} style={selectedStyles.button} >Create Flakey</button>
                        {/* editFlakeyMode ? 
                            <button className="Header__btn Header__editBtn" onClick={handleEditFlakey}>Cancel</button>
                        : 
                            <button className="Header_btn Header__editBtn" onClick={handleEditFlakey}>Edit Flakey</button>
                        */}
                        
                        <button onClick={(e) => handleToFlakeysView(e, this.props.history)} style={selectedStyles.button}>See My Flakeys</button>
                    </div>
                </div>
                }

                <div className="Header__logInfoContainer">

                    <LoggedInUserIndicator userName={userName} photoURL={photoURL} />

                    {userAuth ?
                        <button onClick={(e) => logout(e, history)} style={selectedStyles.button}>Log Out</button>              
                        :
                        <button onClick={(e) => login(e, history)} style={selectedStyles.button}>Log In</button>              
                    }

                </div>

            </header>
        );

    }
}

Header = Radium(Header);
export default Header;