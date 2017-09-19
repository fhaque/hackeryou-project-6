import React from 'react';
import Radium from 'radium';

import style from '../style.js';

var labelStyles = style.el.labelStyles;

var amountStyles = {
    base: {
        color: style.colors.alertPrimary,
        fontSize: '2.5em',
        fontFamily: style.fontFamily.secondary,
        fontWeight: style.fontWeight.heavy,
        
    }
}

class FlakeyPunishmentAmount extends React.Component {
    render() {
        const {editMode, handleChange, amount, uneditedAmount} = this.props;

        return (
            <div>
            { editMode ?
                    <label>
                        <span>Punishment amount:</span>
                        <input type="number" name="amount" onChange={handleChange} value={Number(amount)} />
                    </label>
                :
                    <div>
                        <p style={labelStyles.base}>Punishment</p>
                        <p style={amountStyles.base}>${Number(uneditedAmount).toFixed(2)}</p>
                    </div>
                    
            } 
            </div>
        );
    }

}

FlakeyPunishmentAmount = Radium(FlakeyPunishmentAmount);
export default FlakeyPunishmentAmount;