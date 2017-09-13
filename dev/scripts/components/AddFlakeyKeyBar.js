import React from 'react';

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
            <form className="AddFlakeyBar" onSubmit={(e) => this.props.handleSubmit(e, this.state.flakeyId)}>
                <input type="text" name="flakeyId" value={this.state.flakeyId} onChange={this.handleChange} placeholder="Enter shared Flakey key." />
                <input type="submit" value="View Flakey" />
            </form>
        );
    }
}

export default AddFlakeyKeyBar;