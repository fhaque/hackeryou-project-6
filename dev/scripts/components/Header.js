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
        const {user, title, editFlakeyMode} = this.props;
        const userName = user.name;

        const {handleCreateNewFlakey, handleToFlakeysView} = this.props;


        return (
            <header className="Header">
                <h1 className="Header__title">{title}</h1>
                <AddFlakeyKeyBar handleSubmit={this.handleSubmit} />
                <button onClick={(e) => handleCreateNewFlakey(e, this.props.history)} >Create New Flakey</button>
                {/* editFlakeyMode ? 
                    <button className="Header__btn Header__editBtn" onClick={handleEditFlakey}>Cancel</button>
                : 
                    <button className="Header_btn Header__editBtn" onClick={handleEditFlakey}>Edit Flakey</button>
                */}
                
                <button onClick={(e) => handleToFlakeysView(e, this.props.history)}>See My Flakeys</button>

                <LoggedInUserIndicator userName={userName} className="Header__loggedInUserIndicator" />
            </header>
        );

    }
}

export default Header;