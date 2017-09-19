import React from 'react';
import Radium from 'radium';

import style from '../style.js';

import FlakeyMemberChecklist from './FlakeyMemberChecklist.js';
import MemberImage from './MemberImage.js';

var labelStyles = style.el.labelStyles;

var membersListStyles = {
    base: {
        display: 'flex',
        listStyleType: 'none',
    }
}

var membersItemStyles = {
    base: {
        width: '10%',
        marginLeft: '-3%',
    }
}

var memberImageStyles = {
    base: {
        position: 'relative',
        right: 0,
        // width: '20%',
    }
}


class FlakeyMembers extends React.Component {
    render() {
        const {editMode, members, uneditedMembers, owner, membersToFlakedMembers, membersToRemove, flakedMembers, handleChange} = this.props;

        return (
            <div>
                <p style={labelStyles.base}>Participants:</p>

            {editMode ? 
                <FlakeyMemberChecklist 
                    members={members}
                    owner={owner}
                    membersToFlakedMembers={membersToFlakedMembers}
                    membersToRemove={membersToRemove}
                    flakedMembers={flakedMembers}
                    handleChange={handleChange} />
            : 
                <ul style={membersListStyles.base}>
                    {uneditedMembers.map( (member) => {
                        return (
                            <li key={member.uid} style={membersItemStyles.base}>
                                <div style={memberImageStyles.base}>
                                    <MemberImage 
                                        name={member.name}
                                        photoURL={member.photoURL}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            }
            </div>
        );
    }
}

FlakeyMembers = Radium(FlakeyMembers);
export default FlakeyMembers;