import React from 'react';
import Radium from 'radium';

import style from '../style.js';

var styles = {
    base: {

    }
};

var buttonStyles = style.el.button;

var inputStyles = {
    base: {
        fontFamily: style.fontFamily.primary,
    }
}

class AddFlakeyKeyBar extends React.Component {
    constructor() {
        super();

        this.state = {
            flakeyId: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });

        console.log(name);

    }

    render() {

        return (
            <form className="AddFlakeyKeyBar" style={styles.base} onSubmit={(e) => this.props.handleSubmit(e, this.state.flakeyId)}>
                <input style={inputStyles.base} type="text" name="flakeyId" value={this.state.flakeyId} onChange={this.handleChange} placeholder="Enter shared Flakey key." />
                <input type="submit" value="View Flakey" style={buttonStyles.base} />
            </form>
        );
    }
}

AddFlakeyKeyBar = Radium(AddFlakeyKeyBar);
export default AddFlakeyKeyBar;