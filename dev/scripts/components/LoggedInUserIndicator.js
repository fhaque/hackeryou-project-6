import React from 'react';
import Radium from 'radium';

var styles = {
    base: {
        // border: '1px solid red',
    }
}

class LoggedInUserIndicator extends React.Component {
    render() {

        const {userName, photoURL} = this.props;
        // const {classEnvelope} = props.classes; 
        const photoExists = (photoURL !== "");
        const nameExists = (userName !== "");

        return (
            <div className="LoggedInUserIndicator" style={styles.base}>
            {photoExists && <img className="LoggedInUserIndicator__photo" src={photoURL} alt=""/>}
                
            {nameExists && <p className="LoggedInUserIndicator__greeting">Welcome, {userName}!</p>}
            
            </div>
        );

    }
}

LoggedInUserIndicator = Radium(LoggedInUserIndicator);
export default LoggedInUserIndicator;