import React from 'react';
import Radium from 'radium';
import moment from 'moment';

import style from '../style.js';

import services from '../services.js';

import FlakeyContentContainer   from './FlakeyContentContainer.js';
import FlakeyPrimaryActionArea  from './FlakeyPrimaryActionArea.js';
import FlakeyEditActionArea     from './FlakeyEditActionArea.js';
import FlakeyFlakers            from './FlakeyFlakers.js';
import FlakeyMembers            from './FlakeyMembers.js';
import FlakeyCreatedOn          from './FlakeyCreatedOn.js';
import FlakeyCreatedBy          from './FlakeyCreatedBy.js';
import FlakeyDescription        from './FlakeyDescription.js';
import FlakeyPunishmentAmount   from './FlakeyPunishmentAmount.js';
import FlakeyExpirationTimer    from './FlakeyExpirationTimer.js';
import FlakeyEventName          from './FlakeyEventName.js';
import ShareKeyButton           from './ShareKeyButton.js';
import FlakeyEditButton         from './FlakeyEditButton.js'



//Flakey card view modes: small view, large view
//Flakey card function modes: view, edit
//Flakey user states: member, owner



let styles = {
    base: {

        backgroundColor: style.colors.light,
        borderRadius: '8px',
        boxShadow: style.dropShadow.primary,

        overflow: 'hidden',
        
    },

    small: {
        fontSize: `${style.cardFontSizeBase * 0.6}rem`,
    },

    large: {
        margin: '0 auto',
        minWidth: '400px',
        maxWidth: '700px',

        fontSize: style.fontSize.cardHeading,
    },
}

var buttonStyles = {
    base: {
        // width: '32%',
        maxWidth: '40em',
        margin: '0 2%',

        border: 'none',
        backgroundColor: style.colors.accent,
        boxShadow: style.dropShadow.primary,

        color: style.colors.accentText,
        fontSize: '0.8em',
        fontFamily: style.fontFamily.secondary,
        fontWeight: style.fontWeight.heavy,
        textTransform: 'uppercase',

        '@media (max-width: 30em)': {
            fontSize: '0.5em'
        }
    },
}

var flakedTextStyles = {
    base: {
        padding: '2%',

        color: style.colors.accentText,
        fontSize: '1em',
        fontFamily: style.fontFamily.secondary,
        fontWeight: style.fontWeight.heavy,
        textTransform: 'uppercase',
    }
}

var buttonsContainerStyles = {
    base: {
        display: 'flex',
        justifyContent: 'flex-end',
        
    },
    small: {
        width: '80%',
    },
    large: {
        width: '40%',
    }

}


class FlakeyCard extends React.Component {
    constructor() {
        super();
        this.state = {
            flakey: null,
            editMode: false,
            isOwner: false,
            fullDisplayMode: false,
            // isNew: false,

            //form specific inputs
            date: null,
            time: null,
            membersToRemove: [],
            membersToFlakedMembers: [],
            uneditedFlakey: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleExpire = this.handleExpire.bind(this);

    }

    componentWillUnmount() {
        console.log('Flakey Card unmounted.');    
    }


    componentDidMount() {

        //initialize membersToFlakedMembers for checklist
        const membersToFlakedMembers = [];

        if ('flakedMembers' in this.props.flakey) {
            this.props.flakey.flakedMembers.forEach( (member) => {
                membersToFlakedMembers.push(member.uid);
            });
        }

        this.setState({ 
            flakey: Object.assign({}, this.props.flakey),
            uneditedFlakey: Object.assign({}, this.props.flakey),
            // isNew: this.props.flakey.isNew || false,
            isOwner: this.props.isOwner || false,
            editMode: this.props.editMode || this.props.flakey.isNew || false,
            fullDisplayMode: this.props.fullDisplayMode || false,
            date: moment(this.props.flakey.dateExpires).format('YYYY-MM-DD'),
            time: moment(this.props.flakey.dateExpires).format('HH:mm'),
            membersToFlakedMembers: membersToFlakedMembers,
        });
    }

    componentWillReceiveProps(nextProps) {
        const {flakey} = nextProps;
        const uneditedFlakey = Object.assign({}, flakey);

        this.setState({ uneditedFlakey });

        //force edit mode if Flakey is new.
        this.setState({ editMode: uneditedFlakey.isNew });

        if(!this.state.editMode) {
            this.setState({ 
                flakey: uneditedFlakey,
                //TODO: when new Flakey created, the React Route doesn't unmount Flakey. Instead calls this method! So, date and time need to be updated manually. Would be nice not to have totrack these.
                //See https://github.com/ReactTraining/react-router/blob/800991cd2044293718fccd3763b9d91c2f811296/docs/guides/ComponentLifecycle.md
                date: moment(uneditedFlakey.dateExpires).format('YYYY-MM-DD'),
                time: moment(uneditedFlakey.dateExpires).format('HH:mm'),
             });
        }


        //initialize membersToFlakedMembers for checklist
        const membersToFlakedMembers = [];

        if ('flakedMembers' in uneditedFlakey) {
            uneditedFlakey.flakedMembers.forEach( (member) => {
                membersToFlakedMembers.push(member.uid);
            });
        }

        this.setState({ membersToFlakedMembers });
    }

    handleClick(e) {
        e.preventDefault();
        const target = e.target;
        const name = target.name;

        //toggle whether in edit mode or not
        if (name === "edit") {
            this.setState({ editMode: !this.state.editMode });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let flakey = Object.assign({}, this.state.flakey);

        //remove members that were selected for removal by user
        flakey.members = flakey.members.filter( (member) => {
            return !this.state.membersToRemove.includes(member.uid);
        });


        flakey.flakedMembers = flakey.members.filter( (member) => {
            return this.state.membersToFlakedMembers.includes(member.uid);
        });




        this.setState({ 
            flakey,
            editMode: !this.state.editMode,
         });

        this.props.handleSubmit(e, flakey);
    }

    handleChange(e) {
        //TODO: code
        const flakey = Object.assign({},this.state.flakey);
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        

        //handle the date and time inputs to convert to dateExpires format
        if (name === 'date' || name === 'time') {
            this.setState({ [name]: value });

            let dateExpires = 0;

            if (name === 'date') {
                dateExpires = moment( value + 'T' + this.state.time).valueOf();
            } else if (name === 'time') {
                dateExpires = moment( this.state.date + 'T' + value).valueOf();
            }

            flakey['dateExpires'] = dateExpires;

        } else if (target.type === 'checkbox') { //from FlakeyMemberChecklist
            const membersToFlakedMembers = this.state.membersToFlakedMembers;
            const membersToRemove = this.state.membersToRemove;

            const [checkboxName, checkboxId] = name.split('__');
            //update the members checklist state
            if (checkboxName === 'remove') {
                
                (value) ? membersToRemove.push(checkboxId) : this.removeFromArray(membersToRemove, checkboxId);
            } else if (checkboxName === 'flaked') {
                (value) ? membersToFlakedMembers.push(checkboxId) : this.removeFromArray(membersToFlakedMembers, checkboxId);
            }


            this.setState({ membersToFlakedMembers, membersToRemove })
        } else {
            flakey[name] = value;
        }

        this.setState({ flakey });
    }
    
    handleExpire() {
        services.signalFlakeysExpireCheck();
    }

    removeFromArray(array, val) {
        const index = array.indexOf(val);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    
    isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    render() {

        let {isOwner, fullDisplayMode, memberFlaked} = this.props;
        

        let {title, event, amount, dateCreated, dateExpires, owner, members, flakedMembers, description, expired, complete, id} = this.state.flakey 
        || 
        {title: '', event: '', amount: 0, dateCreated: 0, dateExpires: 0, owner: '', members: [], flakedMembers: [], description: '', expired: false, complete: false, id: ''};

        const uneditedFlakey = (!this.isEmpty(this.state.uneditedFlakey)) ?
            this.state.uneditedFlakey
        : 
        {title: '', event: '', amount: 0, dateCreated: 0, dateExpires: 0, owner: '', members: [], flakedMembers: [], description: '', expired: false, complete: false, id:''};


        //TODO: deprecate this
        // isNew = (this.state.uneditedFlakey.dateExpires === 63177120000000);
        const isNew = uneditedFlakey.isNew || false;
        //force editMode
        const editMode = this.state.editMode || uneditedFlakey.isNew;
        expired = uneditedFlakey.expired;
        complete = uneditedFlakey.complete;


        const date= this.state.date;
        const time= this.state.time;


        /* ***** */

        const handleChange = this.handleChange || null;
        const handleExpire = this.handleExpire;
        // const handleSubmit = this.props.handleSubmit;
        const handleClick = this.props.handleClick || null;

        const handleCommitToFlakey = this.props.handleCommitToFlakey || null;

        return (
            <div 
                style={[styles.base ,fullDisplayMode ? styles.large : styles.small]}
                onSubmit={this.handleSubmit}
            >
                
                <form className="FlakeyCard__form">
                    <FlakeyContentContainer
                        bottomDivider={true}
                        items={fullDisplayMode ? 1 : 2}
                    >
                        <FlakeyEventName
                            editMode={editMode && isOwner}
                            handleChange={handleChange}
                            event={event}
                            uneditedEvent={uneditedFlakey.event}
                        />

                        { fullDisplayMode && 
                            <FlakeyEditButton handleClick={this.handleClick} editMode={editMode} />
                        }

                        { !fullDisplayMode &&
                            <FlakeyCreatedBy 
                                name={owner.name}
                                photoURL={owner.photoURL}
                                moreStyles={{ textAlign: 'right' }}
                            />
                        }

                    </FlakeyContentContainer>
                
                    <FlakeyContentContainer
                        bottomDivider={true}
                        items={1}
                        bgStyle={!expired ? 'gradientNormal' : 'gradientAlert'}
                    >
                        <FlakeyExpirationTimer 
                            editMode={isNew && editMode && isOwner}
                            handleChange={handleChange}
                            handleExpire={handleExpire}
                            date={date}
                            time={time}
                            dateExpires={uneditedFlakey.dateExpires}
                        />
                    </FlakeyContentContainer>

                    <FlakeyContentContainer
                        bottomDivider={true}
                        items={2}
                    >
                        <FlakeyPunishmentAmount 
                            editMode={isNew && editMode && isOwner}
                            handleChange={handleChange}
                            amount={amount}
                            uneditedAmount={uneditedFlakey.amount}
                        />

                        { fullDisplayMode &&
                            <FlakeyCreatedBy 
                                name={owner.name}
                                photoURL={owner.photoURL}
                                moreStyles={{ textAlign: 'right' }}
                            />
                        }

                    </FlakeyContentContainer>

                {fullDisplayMode &&
                    <FlakeyContentContainer
                        bottomDivider={true}
                    >

                        {fullDisplayMode &&
                            <FlakeyMembers 
                                editMode={isOwner && editMode && !complete}
                                members={members}
                                uneditedMembers={uneditedFlakey.members}
                                owner={owner}
                                membersToFlakedMembers={this.state.membersToFlakedMembers}
                                membersToRemove={this.state.membersToRemove}
                                flakedMembers={flakedMembers}
                                handleChange={this.handleChange}
                            />
                        }

                        {(fullDisplayMode && uneditedFlakey.flakedMembers && !editMode) &&
                            <FlakeyFlakers 
                                members={uneditedFlakey.flakedMembers}
                            />
                        }

                    </FlakeyContentContainer>
                }

                {fullDisplayMode &&
                    <FlakeyContentContainer
                        bottomDivider={true}
                    >
                
                        <FlakeyDescription
                            editMode={editMode && isOwner}
                            handleChange={handleChange}
                            description={description}
                            uneditedDescription={uneditedFlakey.description}
                        />

                    </FlakeyContentContainer>
                }

                
                {/*<p>Copy & Share Key to Others: <span className="FlakeyCard__entry-nonEdit">{id}</span></p>
                */}

                {/*<FlakeyCreatedOn 
                    dateCreated={uneditedFlakey.dateCreated}
                />*/}

                {fullDisplayMode &&
                    <FlakeyEditActionArea bottomDivider={true}>
                        {(fullDisplayMode && editMode && isOwner && !expired) && <button style={buttonStyles.base}>Save Flakey</button>}

                        {(fullDisplayMode && isOwner && expired && !complete) && <button style={buttonStyles.base}>Lock Flakey</button>}
                    </FlakeyEditActionArea>
                }
                
            </form>
            
            
            
                <FlakeyPrimaryActionArea alert={expired && complete && memberFlaked} bottomDivider={false}>
                    {(expired && complete && memberFlaked) && <p style={flakedTextStyles.base}>You Flaker!</p>}

                    <div style={[buttonsContainerStyles.base, fullDisplayMode ? buttonsContainerStyles.large : buttonsContainerStyles.small]}>
                        <ShareKeyButton id={id} />

                        {(fullDisplayMode && !isOwner && !expired) && <button onClick={handleCommitToFlakey} style={buttonStyles.base}>Commit to Flakey</button>}

                        { !fullDisplayMode && <button onClick={handleClick} style={buttonStyles.base}>Details</button> }
                    </div>
                    {/* (fullDisplayMode && isOwner) && <button>Delete</button> */}
                </FlakeyPrimaryActionArea>         
            </div>
            //TODO: add Delete feature to above button.
        ); 

    }
}

FlakeyCard = Radium(FlakeyCard);
export default FlakeyCard;