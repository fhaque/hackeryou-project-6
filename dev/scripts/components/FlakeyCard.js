import React from 'react';
import moment from 'moment';

import FlakeyMemberChecklist from './FlakeyMemberChecklist';

//Flakey card view modes: small view, large view
//Flakey card function modes: view, edit
//Flakey user states: member, owner

class FlakeyCard extends React.Component {
    constructor() {
        super();
        this.state = {
            flakey: null,
            editMode: false,
            isOwner: false,
            fullDisplayMode: false,
            isNew: false,

            //form specific inputs
            date: null,
            time: null,
            membersToRemove: [],
            membersToFlakedMembers: [],

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {

        //initialize membersToFlakedMembers for checklist
        const membersToFlakedMembers = [];

        if ('flakedMembers' in this.props.flakey) {
            console.log('flaked members', this.props.flakey.flakedMembers);
            this.props.flakey.flakedMembers.forEach( (member) => {
                membersToFlakedMembers.push(member.uid);
            });
        }

        this.setState({ 
            flakey: Object.assign({}, this.props.flakey),
            isNew: this.props.isNew || false,
            isOwner: this.props.isOwner || false,
            editMode: this.props.editMode || false,
            fullDisplayMode: this.props.fullDisplayMode || false,
            date: moment(this.props.flakey.dateExpires).format('YYYY-MM-DD'),
            time: moment(this.props.flakey.dateExpires).format('HH:mm'),
            membersToFlakedMembers: membersToFlakedMembers,
        });
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

        // console.log(flakey);

        this.setState({ flakey });

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

            // console.log(membersToFlakedMembers, membersToRemove);

            this.setState({ membersToFlakedMembers, membersToRemove })
        } else {
            flakey[name] = value;
        }

        this.setState({ flakey });
    } 

    removeFromArray(array, val) {
        const index = array.indexOf(val);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    

    render() {

        const {title, event, amount, dateCreated, dateExpires, owner, members, flakedMembers, description, expired, complete} = this.state.flakey || {title: '', event: '', amount: 0, dateCreated: 0, dateExpires: 0, owner: '', members: [], flakedMembers: [], description: '', expired: false, complete: false};

        let {editMode, isOwner, fullDisplayMode, isNew} = this.state;

        /* TODO: remove */
        // editMode = true;
        // isOwner = true;
        // isNew = true;
        // fullDisplayMode = true;

        const date= this.state.date;
        const time= this.state.time;
        const dateCreatedFormatted = moment(dateCreated).format('MMMM Do YYYY, h:mm:ss a');
        const dateExpiresFormatted = moment(dateExpires).format('MMMM Do YYYY, h:mm:ss a');

        /* ***** */

        const handleChange = this.handleChange || null;
        // const handleSubmit = this.props.handleSubmit;
        const handleClick = this.props.handleClick || null;

        return (
            <div className="FlakeyCard" onClick={handleClick} onSubmit={this.handleSubmit}>
                <form>
                { (editMode && isOwner) ?
                    <label>
                        Flakey Title:
                        <input type="text" name="title" onChange={handleChange} value={title} />
                    </label>
                : <h3>{title}</h3>}

                <p>Event Name: 
                { (editMode && isOwner) ? (
                    <label>
                        <span style={{display:'none'}}>Event Name</span>
                        <input type="text" name="event" onChange={handleChange} value={event} />
                    </label>
                    ) : ( 
                    <span>{event}</span>)}
                </p>

                <p>This Flakey Expires On: 
                { (isNew && editMode && isOwner) ? (
                    <span>
                        <label>
                            Date:
                            <input type="date" name="date" onChange={handleChange} value={date || moment().format('YYYY-MM-DD')} />
                        </label>
                        <label>
                            Time:
                            <input type="time" name="time" onChange={handleChange} value={time || moment().format('HH:mm')} />
                        </label>
                    </span>
                ) : (
                    <span>{dateExpiresFormatted}</span>)}
                </p>

                <p>Punishment: 
                { (isNew && editMode && isOwner) ? (
                    <label>
                        <span style={{display:'none'}}>Punishment amount:</span>
                        <input type="text" name="amount" onChange={handleChange} value={amount} />
                    </label>
                ) : (
                    <span>${Math.round(amount * 100) / 100}</span>)}
                
                </p>

                <p>Description:</p>
                { (editMode && isOwner) ? (
                    <label>
                    <span style={{display:'none'}}>Description:</span>
                        <textarea name="description" onChange={handleChange} value={description} />
                    </label>   
                ) : (
                    <p>{description}</p>)}

                <p>Created by: <span>{owner.name}</span></p>
                <p>Created On: <span>{dateCreatedFormatted}</span></p>
                {fullDisplayMode && <p>Potential Flakers:</p>}
                {fullDisplayMode &&
                    ((isOwner && editMode && !complete) ? 
                        <FlakeyMemberChecklist 
                            members={members}
                            owner={owner}
                            membersToFlakedMembers={this.state.membersToFlakedMembers}
                            membersToRemove={this.state.membersToRemove}
                            expired={expired}
                            complete={complete}
                            flakedMembers={flakedMembers}
                            handleChange={this.handleChange} />
                    : 
                        <ul>
                            {members.map( (member) => {
                                return (
                                    <li key={member.uid}>{member.name}</li>
                                );
                            })}
                        </ul>
                    )
                }
                
                {isOwner && <button>Save & Commit to Flakey</button>}
                {!isOwner && <button>Commit to Flakey</button>}
            </form>
            {isOwner && <button>Cancel</button>}
            {isOwner && <button>Delete</button>}
            </div>
        ); 

    }
}

export default FlakeyCard;