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
                uid: '',
                flakeyIds: [],
            },
            flakeys: [],
            focusedFlakey: {id: ''},
            flakeyForm: {},
        };

        this.handleUserSubscription = this.handleUserSubscription.bind(this);
        this.handleFlakeySubscription = this.handleFlakeySubscription.bind(this);
        this.dbFlakeyToFlakey = this.dbFlakeyToFlakey.bind(this);
        this.dbUserToUser = this.dbUserToUser.bind(this);

        this.handleFlakeySelection = this.handleFlakeySelection.bind(this);
        this.handleFlakeyChange = this.handleFlakeyChange.bind(this);

    }

    handleFlakeySelection(flakeyId) {
        if(this.state.focusedFlakey.id !== flakeyId) {
            console.log('focusedFlakey reset.');
            this.setState({ 
                focusedFlakey: this.state.flakeys[flakeyId],
            });
        }
    }

    handleFlakeyChange(e) {
        e.preventDefault();
        console.log('logged changes.');
        const focusedFlakey = this.state.focusedFlakey;

        console.log(e.target.value);

        focusedFlakey[e.target.name] = e.target.value;

        this.setState({ focusedFlakey });
    }

    handleUserSubscription(userObj) {
        const user = this.dbUserToUser(userObj);
        console.log('From User Subscription handle: ', user);

        //unsubscribe to old flakeys
        this.state.user.flakeyIds.map( (flakeyId) => {
            services.unsubscribeToFlakey(flakeyId);
        });

        //convert flakeyIds object to an array
        const flakeyIds = [];
        for (let key in user.flakeyIds) {
            flakeyIds.push(key);
        }
        user.flakeyIds = flakeyIds;

        //subscribe to new flakeys
        user.flakeyIds.map( (flakeyId) => {
            services.subscribeToFlakey(flakeyId, this.handleFlakeySubscription);
        });

        

        this.setState({ user });

    }

    handleFlakeySubscription(flakeyObj) {
        this.dbFlakeyToFlakey(flakeyObj)
            .then( flakey => {
                const flakeys = Object.assign({}, this.state.flakeys);

                flakeys[flakey.id] = flakey;

                console.log('From Flakeys Subscription handle: ', flakey);

                this.setState({ flakeys });
            });

    }

    dbFlakeyToFlakey(flakeyObj) {
        const flakey = Object.assign({}, flakeyObj);

        //make date readable
        flakey.dateExpiresFormatted = moment(flakey.dateExpires).format('MMMM Do YYYY, h:mm:ss a');

        flakey.dateCreatedFormatted = moment(flakey.dateCreated).format('MMMM Do YYYY, h:mm:ss a');

        //create a list of user ids to get info about.
        const userids = [flakey.owner];
        for (let uid in flakey.members) {
            userids.push(uid);
        }

        return services.getUsersByUid(userids)
            .then( userArray => {

                flakey.owner = {
                    uid: userArray[0].uid,
                    name: userArray[0].name
                };

                //remove owner
                userArray.splice(0, 1);

                //expand out member information for Flakey
                flakey.members = userArray.map( user => {
                    return {uid: user.uid, name: user.name}
                });

                //ensure flakedMembers are in sync
                if ('flakedMembers' in flakey) {
                    const flakedMembersArray = [];
                    flakey.members.map( member => {
                        if (member.uid in flakey.flakedMembers) {
                            flakedMembersArray.push(flakey);
                        }
                    });

                    flakey.flakedMembers = flakedMembersArray;
                }

                return flakey;

            });

    }

    dbUserToUser(userObj) {
        return userObj;
    }

    componentDidMount() {
        services.subscribeToUser('-KtgPURrKqTSpsRVEO3F', this.handleUserSubscription);

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
        //create convenient array for flakeys
        const flakeys = [];
        for (let key in this.state.flakeys) {
            flakeys.push(this.state.flakeys[key]);
        }

        return (
            <div>
                <Header userName={this.state.user.name} {...this.header} />

                <FlakeysView user={this.state.user} 
                            flakeys={flakeys}
                            focusedFlakey={this.state.focusedFlakey}
                            handleFlakeySelection={this.handleFlakeySelection}
                            handleFlakeyChange={this.handleFlakeyChange}/>
                {/*<CreateFlakeyView   handleSubmit={this.handleCreateFlakeySubmit}
                                    handleCancel={this.handleCreateFlakeyCancel}handleChange={this.handleCreateFlakeyChange}formVals={this.state.createFlakeyVals}/>*/}
                {/*<EditFlakeyView handleSubmit={this.handleEditFlakeySubmit}
                                handleCancel={this.handleEditFlakeyCancel}handleChange={this.handleEditFlakeyChange}
                                handleDelete={this.handleEditFlakeyDelete}formVals={this.state.editFlakeyVals}/>*/}

                

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));