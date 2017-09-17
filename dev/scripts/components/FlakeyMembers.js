import React from 'react';
import FlakeyMemberChecklist from './FlakeyMemberChecklist.js';

class FlakeyMembers extends React.Component {
    render() {
        const {editMode, members, uneditedMembers, owner, membersToFlakedMembers, membersToRemove, flakedMembers, handleChange} = this.props;

        return (
            <div>
            Participants:
            {editMode ? 
                <FlakeyMemberChecklist 
                    members={members}
                    owner={owner}
                    membersToFlakedMembers={membersToFlakedMembers}
                    membersToRemove={membersToRemove}
                    flakedMembers={flakedMembers}
                    handleChange={handleChange} />
            : 
                <ul className="FlakeyCard__list">
                    {uneditedMembers.map( (member) => {
                        return (
                            <li key={member.uid} className="FlakeyCard__item">{member.name}</li>
                        );
                    })}
                </ul>
            }
            </div>
        );
    }
}

export default FlakeyMembers;