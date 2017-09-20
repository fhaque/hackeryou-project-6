import React from 'react';
import Radium from 'radium';

import style from '../style.js';

var styles = {
    base: {
        fontFamily: style.fontFamily.primary,
        fontWeight: style.fontWeight.medium,
    }
}

var tableStyles = {
    base: {
        width: "100%",
    }
}

var tableHeadingStyles = {
    base: {
        fontWeight: style.fontWeight.medium,
        textTransform: 'uppercase',
        textAlign: 'left',
        fontSize: '0.6em',

        backgroundColor: 'transparent',
    }
}



var tableBodyStyles = {
    base: {
        fontSize: '0.6em',
        backgroundColor: style.colors.primaryVeryLight,
    }
}

var tableCellStyles = {
    base: {
        padding: '2%',
    }
}

class FlakeyMemberChecklist extends React.Component {

    render() {
        const {members, owner} = this.props;;

        const {membersToRemove, membersToFlakedMembers} = this.props;

        const handleChange = this.props.handleChange;

        return (
            <div className="FlakeyMemberChecklist" style={styles.base}>
                <table style={tableStyles.base}>
                    <thead>
                        <tr>
                            <th style={tableHeadingStyles.base}>Remove</th>
                            <th style={tableHeadingStyles.base}>Flaked</th>
                            <th style={tableHeadingStyles.base}>Member</th>
                        </tr>
                    </thead>
                    <tbody style={tableBodyStyles.base}>
                        {members.map( (member) => {
                            return (
                                <tr key={member.uid}>
                                    <td style={tableCellStyles.base}>
                                        {(owner.uid !== member.uid) && 
                                        <input
                                            type="checkbox" 
                                            checked={this.props.membersToRemove.includes(member.uid)}
                                            name={`remove__${member.uid}`}
                                            onChange={handleChange} />
                                        }
                                    </td>
                                    <td style={tableCellStyles.base}>
                                        <input
                                            type="checkbox"
                                            checked={this.props.membersToFlakedMembers.includes(member.uid)}
                                            name={`flaked__${member.uid}`}
                                            onChange={handleChange} />
                                    </td>
                                    <td style={tableCellStyles.base}>
                                        {member.name}
                                    </td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </table>  
            </div>
        )

    }


}

FlakeyMemberChecklist = Radium(FlakeyMemberChecklist);
export default FlakeyMemberChecklist;