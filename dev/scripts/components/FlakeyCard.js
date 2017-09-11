import React from 'react';
import moment from 'moment';

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

        };

        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {

        this.setState({ 
            flakey: Object.assign({}, this.props.flakey),
            isNew: this.props.isNew || false,
            isOwner: this.props.isOwner || false,
            editMode: this.props.editMode || false,
            date: moment(this.props.flakey.dateExpires).format('YYYY-MM-DD'),
            time: moment(this.props.flakey.dateExpires).format('HH:mm'),
        });
    }

    handleChange(e) {
        //TODO: code
        const flakey = this.state.flakey;

        //handle the date and time inputs to convert to dateExpires format
        if (e.target.name === 'date' || e.target.name === 'time') {
            this.setState({ [e.target.name]: e.target.value });

            let dateExpires = 0;

            if (e.target.name === 'date') {
                dateExpires = moment( e.target.value + 'T' + this.state.time).valueOf();
            } else if (e.target.name === 'time') {
                dateExpires = moment( this.state.date + 'T' + e.target.value).valueOf();
            }

            flakey['dateExpires'] = dateExpires;

        } else {
            flakey[e.target.name] = e.target.value;
        }

        this.setState({ flakey });

    } 
    

    render() {

        const {title, event, amount, dateCreated, dateExpires, owner, members, description} = this.state.flakey || {title: '', event: '', amount: 0, dateCreated: 0, dateExpires: 0, owner: '', members: [], description: ''};

        let {editMode, isOwner, fullDisplayMode, isNew} = this.state;

        /* TODO: remove */
        editMode = true;
        isOwner = true;
        isNew = true;
        fullDisplayMode = true;

        const date= this.state.date;
        const time= this.state.time;
        const dateCreatedFormatted = moment(dateCreated).format('MMMM Do YYYY, h:mm:ss a');
        const dateExpiresFormatted = moment(dateExpires).format('MMMM Do YYYY, h:mm:ss a');

        /* ***** */

        const handleChange = this.handleChange;
        const handleSubmit = this.props.handleSubmit;
        const handleClick = this.props.handleClick;

        return (
            <div className="FlakeyCard" onClick={handleClick} onSubmit={(e) => handleSubmit(e, this.state.flakey)}>
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
                {fullDisplayMode && <ul>
                    {members.map( (member) => {
                        return (
                            <li key={member.uid}>{member.name}</li>
                        );
                    })}
                </ul>}
                
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