const style = {
    colors: {
        primary: '#24C6DC',
        primaryVeryLight: 'rgba(36, 198, 220, 0.21)',
        secondary: '#514A9D',
        light: '#FFFFFF',
        dark: '#1B065E',
        accent: '#FF47DA',
        text: '#001011',
        accentText: '#FFFFFF',
        heading: '#FF47DA',
        mute: '#e5e3e3', //'#757780',
        alertPrimary: '#F8333C',
        alertSecondary: '#DB2763', 
        affirmPrimary: '#44af69',
        
    },

    fontSize: {
        headingPrimary: '3.6rem',
        lgBtn: '1.8rem',
        indicatorText: '1.8rem',
        cardHeading: '3.2rem',
        cardEntryLabel: '0.45em'
    },

    fontWeight: {
        light: 300,
        medium: 400,
        heavy: 700
    },

    fontFamily: {
        primary: `'Open Sans', sans-serif`,
        secondary: `'Roboto', sans-serif`
    },

    dropShadow: {
        primary:  '0px 0px 5px 0px rgba(0,0,0,0.65)',
        inset: 'inset 0px 0px 5px 0px rgba(0,0,0,0.52)',
        text: '0px 0px 5px rgba(0, 0, 0, 0.4)',
    },


}

style.cardFontSizeBase = 3.2; //rem

style.fontSize = {
    headingPrimary: '3.6rem',
    lgBtn: '1.8rem',
    indicatorText: '1.8rem',
    cardHeading: `${style.cardFontSizeBase}rem`,
    cardEntryLabel: '0.65em'
};

style.el = {};

style.el.button = {
    base: {
        color: style.colors.accentText,
        backgroundColor: style.colors.accent,

        // fontSize: '1.5rem',
        fontWeight: style.fontWeight.heavy,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap', 
        
        border: 'none',

        boxShadow: style.dropShadow.primary,
    },
}

style.el.labelStyles = {
    base: {
        marginBottom: style.fontSize.cardEntryLabel,
        textTransform: 'uppercase',
        fontSize: style.fontSize.cardEntryLabel,
        fontFamily: style.fontFamily.primary,
        fontWeight: style.fontWeight.medium,
        textTransform: 'uppercase',
        
    },
}

style.el.formInput = {
    base: {
        border: 'none',
        borderRadius: '2px',
        backgroundColor: style.colors.primaryVeryLight,
    }
}

export default style;