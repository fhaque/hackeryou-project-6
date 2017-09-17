import React from 'react';

class FlakeyDescription extends React.Component {
    render() {
        const {editMode, handleChange, description, uneditedDescription} = this.props;

        return (
            <div>
            Description:
            { editMode ? 
                    <label>
                    <span style={{display:'none'}}>Description:</span>
                        <textarea name="description" onChange={handleChange} value={description} />
                    </label>   
                :
                    <p className="FlakeyCard__description">{uneditedDescription}</p>
            }
            </div>
        );
    }
}

export default FlakeyDescription;