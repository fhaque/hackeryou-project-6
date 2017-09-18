import React from 'react';
import Radium from 'radium';

import style from '../style.js';

import MemberImage from './MemberImage.js';

var labelStyles = {
    base: {
        marginBottom: style.fontSize.cardEntryLabel,
        textTransform: 'uppercase',
        fontSize: style.fontSize.cardEntryLabel,
        fontFamily: style.fontFamily.primary,
        fontWeight: style.fontWeight.medium,
        
    },
}

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

class FlakeyFlakers extends React.Component {
    render() {
        const { members } = this.props;

        return (
            <div>
                <p style={labelStyles.base}>Flakers:</p>
                <ul style={membersListStyles.base}>
                    {members.map( (member) => {
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
            </div>
        );
    }
}

FlakeyFlakers = Radium(FlakeyFlakers);
export default FlakeyFlakers;