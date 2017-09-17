import React from 'react';

class FlakeyPunishmentAmount extends React.Component {
    render() {
        const {editMode, handleChange, amount, uneditedAmount} = this.props;

        return (
            <div>
            Punishment Amount:
            { editMode ?
                    <label>
                        <span style={{display:'none'}}>Punishment amount:</span>
                        <input type="text" name="amount" onChange={handleChange} value={Number(amount)} />
                    </label>
                :
                    <span className="FlakeyCard__entry-nonEdit">${Math.round(uneditedAmount * 100) / 100}</span>
            } 
            </div>
        );
    }

}

export default FlakeyPunishmentAmount;