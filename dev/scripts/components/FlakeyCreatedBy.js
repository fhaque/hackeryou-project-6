import React from 'react';
import Radium from 'radium';
import ReactHover from 'react-hover';

import style from '../style.js';

import MemberImage from './MemberImage.js';

var styles = {
    base: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
}

var labelStyles = style.el.labelStyles;

var memberImageStyles = {
    base: {
        position: 'relative',
        right: 0,
        width: '20%',
        minWidth: '50px',
    }
}

class FlakeyCreatedBy extends React.Component {
    render() {
        const {name, photoURL} = this.props;

        return (
            <div style={styles.base}>
                <p style={labelStyles.base}>Created by</p>
                <div style={memberImageStyles.base}>
                    <MemberImage 
                        name={name}
                        photoURL={photoURL}
                    />
                </div>
                
            </div>
        );
    }
}

FlakeyCreatedBy = Radium(FlakeyCreatedBy);
export default FlakeyCreatedBy;