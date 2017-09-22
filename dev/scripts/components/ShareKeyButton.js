import React from 'react';
import Radium from 'radium';
import CopyToClipboard from 'react-copy-to-clipboard';

import style from '../style.js';

var styles = {
    base: {
        // display: 'block',
        // width: '100%',
        // maxWidth: '40em',

        padding: '6%',

        border: 'none',
        boxShadow: style.dropShadow.primary,

        color: style.colors.accentText,
        fontSize: '0.5em',
        fontFamily: style.fontFamily.secondary,
        fontWeight: style.fontWeight.heavy,
        textTransform: 'uppercase',

        // '@media (max-width: 30em)': {
        //     fontSize: '0.4em'
        // }
    },

    copied: {
        backgroundColor: style.colors.affirmPrimary,
    },

    normal: {
        backgroundColor: style.colors.accent
    }

}

class ShareKeyButton extends React.Component {
    constructor() {
        super();

        this.state = {
            copied: false,
        }

        this.handleCopy = this.handleCopy.bind(this);
    }

    handleCopy() {
        this.setState({copied: true});

        setTimeout( () => this.setState({copied: false}), 2000 );
    }

    render() {
        const {id} = this.props;
        const {copied} = this.state;

        const selectedStyles = [styles.base];

        selectedStyles.push(copied ? styles.copied : styles.normal);

        return (
            <CopyToClipboard 
                text={id}
                onCopy={this.handleCopy}>

                <button className="primaryCardBtn" style={selectedStyles}>
                    {copied && 'Copied'}
                    {!copied && 'Share Key'}
                </button>

            </CopyToClipboard>
        );
    }
}

ShareKeyButton = Radium(ShareKeyButton);
export default ShareKeyButton;