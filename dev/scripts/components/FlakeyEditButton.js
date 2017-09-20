import React                from 'react';

class FlakeyEditButton extends React.Component {

    render() {
        const {editMode, handleClick} = this.props;

        return (
            <button name="edit" onClick={handleClick}>
                {editMode ? 'Cancel' : 'Edit'}
            </button>
        );
    }
}

export default FlakeyEditButton;