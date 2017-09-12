import React from 'react';

class FlakeyCardViewHeader extends React.Component {


    render() {
        const { handleClick } = this.props;

        const { editMode } = this.props;

        return (
            <header>
                {editMode && <button name="cancel" onClick={handleClick}>Cancel</button>}
                {!editMode && <button name="edit" onClick={handleClick}>Edit</button>}
            </header>
        )
    }
}

export default FlakeyCardViewHeader;