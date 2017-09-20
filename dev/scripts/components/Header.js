import React from 'react';
import LoggedInUserIndicator from './LoggedInUserIndicator';
import AddFlakeyKeyBar from './AddFlakeyKeyBar';

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


        return (
            <header className="Header">
                <h1 className="Header__title">{title}</h1>
                {userAuth &&
                <div className="Header__loggedInUserUI">
                    <AddFlakeyKeyBar className="Header__addFlakeyKeyBar" handleSubmit={this.handleSubmit} />
                    <div className="Header__btnContainer">
                        <button onClick={(e) => handleCreateNewFlakey(e, this.props.history)} >Create New Flakey</button>
                        {/* editFlakeyMode ? 
                            <button className="Header__btn Header__editBtn" onClick={handleEditFlakey}>Cancel</button>
                        : 
                            <button className="Header_btn Header__editBtn" onClick={handleEditFlakey}>Edit Flakey</button>
                        */}
                        
                        <button onClick={(e) => handleToFlakeysView(e, this.props.history)}>See My Flakeys</button>
                    </div>
                </div>
                }

                <LoggedInUserIndicator userName={userName} photoURL={photoURL} className="Header__loggedInUserIndicator" />

                {userAuth ?
                    <button onClick={(e) => logout(e, history)}>Log Out</button>              
                    :
                    <button onClick={(e) => login(e, history)}>Log In</button>              
                }


            </header>
        );

    }
}

export default Header;