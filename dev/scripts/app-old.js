import      React                       from 'react';
import      ReactDOM                    from 'react-dom';
import  { 
            BrowserRouter as Router, 
            Route, 
            Link 
        }                               from 'react-router-dom';
import      moment                      from 'moment';

import      firebase                    from './firebase';
import      services                    from './services';

import      Header                      from './components/Header';
import      FlakeyCard                  from './components/FlakeyCard';
import      FlakeysView                 from './FlakeysView';
import      CreateFlakeyView            from './CreateFlakeyView';
import      EditFlakeyView              from './EditFlakeyView';

const dbUsersRef = firebase.database().ref('users/');
const dbFlakeysRef = firebase.database().ref('flakeys/');
// dbUsersRef.push({
//     name: 'Bob',
//     email: 'bob@gma.com',
//     flakey_ids: {},
//     uid: '123'
// });

// dbUsersRef.push({
//     name: 'Sally',
//     email: 'sally@gma.com',
//     flakey_ids: {},
//     uid: '1234'
// });

// dbUsersRef.push({
//     name: 'Jake',
//     email: 'jake@gma.com',
//     flakey_ids: {},
//     uid: '12345'
// });

// dbFlakeysRef.push({
//     owner: '123',
//     title: 'Better show',
//     event: 'Concert',
//     amount: 10.50,
//     members: {'123': true},
//     flakedMembers: {},
//     id: '',
//     dateExpires: 0,
//     dateCreated: 0,
//     expired: false,
//     deleted: false,
//     complete: false,
//     description: 'This should be good.',
// });

// dbFlakeysRef.push({
//     owner: '123',
//     title: 'Salsa',
//     event: 'Concert',
//     amount: 10.50,
//     members: {'1234': true},
//     flakedMembers: {},
//     id: '',
//     dateExpires: 0,
//     dateCreated: 0,
//     expired: false,
//     deleted: false,
//     complete: false,
//     description: 'Thisasda',
// });

// dbFlakeysRef.push({
//     owner: '123',
//     title: 'Latin',
//     event: 'Concert',
//     amount: 10.50,
//     members: {'1234': true,'12345': true},
//     flakedMembers: {},
//     id: '',
//     dateExpires: 0,
//     dateCreated: 0,
//     expired: false,
//     deleted: false,
//     complete: false,
//     description: 'asdadsThis should be good.',
// });

// dbFlakeysRef.push({
//     owner: '12345',
//     title: 'Chicken',
//     event: 'Concert',
//     amount: 10.50,
//     members: {'1234':true,'123':true},
//     flakedMembers: {},
//     key: '',
//     expired: false,
//     deleted: false,
//     complete: false,
//     description: 'zxcvxzcvThis should be good.',
// });



class App extends React.Component {
    constructor() {
        super();

        this.header = {
            title: "Flakey"
        };


        this.state = {
            user: {
                name: '',
                email: '',
                uid: ''
            },
            flakeys: [],
            createFlakeyVals: {
                title: '',
                event: '',
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('HH:mm'),
                amount: 0.00,
                description: '',
            },
            editFlakeyVals: {},
            currentFlakey: {},
        };


        this.handleCreateFlakeyCancel = this.handleCreateFlakeyCancel.bind(this);
        this.handleCreateFlakeySubmit = this.handleCreateFlakeySubmit.bind(this);
        this.handleCreateFlakeyChange = this.handleCreateFlakeyChange.bind(this);

        this.handleEditFlakeyCancel = this.handleEditFlakeyCancel.bind(this);
        this.handleEditFlakeyChange = this.handleCreateFlakeyChange.bind(this);
        this.handleEditFlakeyDelete = this.handleEditFlakeyDelete.bind(this);
        this.handleEditFlakeySubmit = this.handleEditFlakeySubmit.bind(this);

        this.handleFlakeyCommit = this.handleFlakeyCommit.bind(this);
    }

    handleFlakeyCommit(e) {
        e.preventDefault();
        console.log('Flakey commit pressed. Need to complete.');
    }

    handleCreateFlakeyCancel(e) {
        e.preventDefault();
        console.log('Create Flakey Cancelled. Need to complete');
    }

    handleCreateFlakeySubmit(e) {
        e.preventDefault();
        console.log('Create Flakey Submitted.', this.state.createFlakeyVals);

        const flakeyVals = Object.assign({}, this.state.createFlakeyVals);
        
        //set expiration date
        flakeyVals.dateExpires = moment(this.state.createFlakeyVals.date + 'T' + this.state.createFlakeyVals.time).valueOf();

        //set creation date
        flakeyVals.dateCreated = moment().valueOf();

        //set owner
        flakeyVals.owner = this.state.user.uid;

        //TODO: Need to wire up
        console.log(services.createFlakeyObj(flakeyVals));
    }

    handleCreateFlakeyChange(e) {
        e.preventDefault();
        const createFlakeyVals = this.state.createFlakeyVals;

        createFlakeyVals[e.target.name] = e.target.value;

        this.setState({ createFlakeyVals });

    }

    handleEditFlakeySubmit(e) {
        e.preventDefault();
        const flakeyVals = Object.assign({}, this.state.editFlakeyVals);
        const currentFlakey = Object.assign({}, this.state.currentFlakey);

        //remove any unecessary keys
        for (let key in flakeyVals) {
            if ( !(key in currentFlakey) ) {
                delete flakeyVals[key];
            }
        }

        Object.assign(currentFlakey, flakeyVals);

        this.setState({ currentFlakey });

        //TODO: watch for changes
        services.updateFlakey(currentFlakey);
    } 

    handleEditFlakeyChange(e) {
        e.preventDefault();

        const editFlakeyVals = this.state.editFlakeyVals;

        editFlakeyVals[e.target.name] = e.target.value;

        this.setState({ editFlakeyVals });
    }

    handleEditFlakeyCancel(e) {
        e.preventDefault();
        console.log('Create Flakey Cancelled.');
    }

    handleEditFlakeyDelete(e) {
        e.preventDefault();
        services.deleteFlakey(currentFlakey.id);
    }

    componentDidMount() {
        //TODO: get the uid from Auth
        services.getUserByUid('-KtgPURrKqTSpsRVEO3F')
            //recieve user info and set state
            .then( user => {
                console.log('User obj logged in:', user);
                this.setState({ user });

                return user;
            })
            //request the Flakeys the user is a member of.
            .then( user => {
                const flakeyIds = user.flakeyIds;

                return services.getFlakeys(flakeyIds);
            })
            //recieve the Flakeys and change State
            .then( flakeys => {
                console.log("Flakeys retrieved", flakeys);

                this.setState({ flakeys });
            });


        //populate user info
        // services.getUserByUid('-Ktcn3Bh5w7mZRZKwqwE').then( val => console.log(val.val()));

        // services.getFlakey('-Ktcn3BsQrNOu06AXUoJ')
        // .then( val => console.log(val) );

        // services.getFlakeys(['-Ktcn3BsQrNOu06AXUoJ', '-Ktcn3BsQrNO'] ).then( val => console.log(val) );

//         services.saveNewFlakey({
//     owner: 'Bob',
//     title: 'Better show',
//     event: 'Concert',
//     amount: 10.50,
//     members: {
//         'bill': true,
//         'cat': true
//     },
//     flakedMembers: {
//         'basdf': true,
//     },
//     id: '',
//     expired: false,
//     deleted: false,
//     complete: false,
//     description: 'This should be good.',
// }).then( val => console.log(val));

        // console.log(firebase.auth().currentUser);

        // services.userCommitToFlakey('kiki', '-Ktcn3BsQrNOu06AXUoJ');
    }

    render() {
        return (
            <div>
                <Header userName={this.state.user.name} {...this.header} />
                {/*<FlakeysView user={this.state.user} flakeys={this.state.flakeys} />*/}
                {/*<CreateFlakeyView   handleSubmit={this.handleCreateFlakeySubmit}
                                    handleCancel={this.handleCreateFlakeyCancel}handleChange={this.handleCreateFlakeyChange}formVals={this.state.createFlakeyVals}/>*/}
                {/*<EditFlakeyView handleSubmit={this.handleEditFlakeySubmit}
                                handleCancel={this.handleEditFlakeyCancel}handleChange={this.handleEditFlakeyChange}
                                handleDelete={this.handleEditFlakeyDelete}formVals={this.state.editFlakeyVals}/>*/}

                <FlakeyCard expand={true} 
                            //only allow committing if not owner.
                            handleCommit={this.handleFlakeyCommit}
                            onlyCanCommit={false} {...this.state.flakeys[0]} />

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));