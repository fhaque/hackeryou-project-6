import React from 'react';

class FlakeyMemberChecklist extends React.Component {

    render() {
        const {members, owner} = this.props;
        const {expired, complete} = this.props;

        const {membersToRemove, membersToFlakedMembers} = this.props;

        // console.log(membersToFlakedMembers, membersToRemove);

        const handleChange = this.props.handleChange;

        return (
            <div>
                {(!expired && !complete) &&
                    <table>
                        <thead>
                            <tr>
                                <th>Remove</th>
                                <th>Flaked</th>
                                <th>Member</th>
                            </tr>
                        </thead>
                        <tbody>
                    {members.map( (member) => {
                        return (
                            <tr key={member.uid}>
                                <td>
                                    {(owner.uid !== member.uid) && 
                                    <input
                                        type="checkbox" 
                                        checked={this.props.membersToRemove.includes(member.uid)}
                                        name={`remove__${member.uid}`}
                                        onChange={handleChange} />
                                    }
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={this.props.membersToFlakedMembers.includes(member.uid)}
                                        name={`flaked__${member.uid}`}
                                        onChange={handleChange} />
                                </td>
                                <td>
                                    {member.name}
                                </td>
                            </tr>
                        )
                    })} 
                    </tbody>
                    </table>  
                }
            </div>
        )

    }


}

export default FlakeyMemberChecklist;