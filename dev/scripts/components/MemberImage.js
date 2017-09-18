import React from 'react';
import Radium from 'radium';
import ReactHover from 'react-hover';

import style from '../style.js';

var photoStyles = {
    base: {
        borderRadius: '50%',
        width: '100%'
    }
}

var toolTipStyles = {
    base: {
        padding: '4px 6px',
        borderRadius: '2px',
        boxShadow: style.dropShadow.primary,

        fontFamily: style.fontFamily.primary,
        fontWeight: style.fontWeight.medium,
        fontSize: '0.5em',
        color: style.colors.light,

        backgroundColor: style.colors.dark,
    }
}

class MemberImage extends React.Component {
    render() {
        const {name, photoURL} = this.props;

        return (
            <ReactHover options={{followCursor:false}}>
                <ReactHover.Trigger>
                    <img style={photoStyles.base} src={photoURL} alt={`photo of ${name}`}/>
                </ReactHover.Trigger>
                <ReactHover.Hover>
                    <p style={toolTipStyles.base}>{name}</p>
                </ReactHover.Hover>
            </ReactHover>
        );
    }
}

MemberImage = Radium(MemberImage);
export default MemberImage;