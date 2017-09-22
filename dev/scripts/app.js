import  React                       from 'react';
import  ReactDOM                    from 'react-dom';
import  { 
        BrowserRouter as Router,
        Switch, 
        Route, 
        Link 
        }                           from 'react-router-dom';
import  { StyleRoot }               from 'radium';
        
import  moment                      from 'moment';

import  firebase, 
        { auth, provider }          from './firebase';

import  services                    from './services';

import  Header                      from './components/Header';
import  LandingView                 from './LandingView'
import  FlakeysView                 from './FlakeysView';
import  FlakeyCardView              from './FlakeyCardView'



const dbUsersRef = firebase.database().ref('users/');
const dbFlakeysRef = firebase.database().ref('flakeys/');

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
            userAuth: null,
            flakeys: [],
            focusedFlakey: {id: ''},
            flakeyForm: {},
            editFlakeyMode: false,
        };

        this.handleUserSubscription = this.handleUserSubscription.bind(this);
        this.handleFlakeySubscription = this.handleFlakeySubscription.bind(this);
        // this.dbFlakeyToFlakey = this.dbFlakeyToFlakey.bind(this);
        // this.dbUserToUser = this.dbUserToUser.bind(this);
        // this.flakeyToDbFlakey = this.flakeyToDbFlakey.bind(this);

        this.handleFlakeySelection = this.handleFlakeySelection.bind(this);
        this.handleFlakeyChange = this.handleFlakeyChange.bind(this);
        this.handleFlakeySubmit = this.handleFlakeySubmit.bind(this);

        this.handleCreateNewFlakey = this.handleCreateNewFlakey.bind(this);
        this.handleToFlakeysView = this.handleToFlakeysView.bind(this);
        // this.handleEditFlakey = this.handleEditFlakey.bind(this);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleOnAuthStateChanged = this.handleOnAuthStateChanged.bind(this);


    }

    handleOnAuthStateChanged(userAuth) {

        if (userAuth) {
            return services.getUserByUid(userAuth.uid)
            .then( user => {
                if (user) {
                    return services.subscribeToUser(userAuth.uid, this.handleUserSubscription);
                } else { //create new user
                    const newUser = services.createUserObj();
                    
                    newUser.name = userAuth.displayName;
                    newUser.uid = userAuth.uid;
                    newUser.email = userAuth.email;
                    newUser.photoURL = userAuth.photoURL;

                    return services.saveNewUser(newUser.uid, newUser);
                }

            })
            .then( () => this.setState({ userAuth }));

        } else {
            return Promise.resolve();
        }
    }


    login(e, history) {
        e.preventDefault();

        let userAuth = {};
        auth.signInWithPopup(provider) 
            .then((result) => {
                userAuth = result.user;

                return this.handleOnAuthStateChanged(userAuth);
            })
            .then( () => history.push('/flakeys') );
    
    }

    logout(e, history) {
        e.preventDefault();

        auth.signOut()
            .then( () => {

                for(let flakeyId in this.state.flakeys) {
                    services.unsubscribeToFlakey(flakeyId);
                }    
                    
                return services.unsubscribeToUser(this.state.user.uid);

            })
            .then( () => {
                this.setState({
                    user: services.createUserObj(),
                    flakeys: [],
                    userAuth: null
                });

                //go back home after logout
                history.push(`/`);
            })
    }

    handleToFlakeysView(e, history) {
        e.preventDefault();

        history.push('/flakeys/');
    }

    handleCreateNewFlakey(e, history) {
        e.preventDefault();

        services.createFlakey(this.state.user.uid)
        .then( flakeyId => history.push(`/flakeys/${flakeyId}`) )
    }

    // handleEditFlakey(e) {
    //     e.preventDefault();
    //     toggleEditFlakeyMode();
    // }

    toggleEditFlakeyMode() {
        this.setState({ editFlakeyMode: !this.state.editFlakeyMode });
    }

    handleFlakeySelection(e, flakeyId, history) {
        // if(this.state.focusedFlakey.id !== flakeyId) {
            this.setState({ 
                focusedFlakey: this.state.flakeys[flakeyId],
            });
            history.push(`/flakeys/${flakeyId}`);
        // }
    }

    handleFlakeySubmit(e, flakey) {
        e.preventDefault();

        //put Flakey to complete if already expired since owner
        //making commitment.
        if (flakey.expired) {
            flakey.complete = true;
        }

        //since Flakey being saved, set isNew to false
        flakey.isNew = false;

        //transform data for Firebase DB
        const dbFlakey = services.flakeyToDbFlakey(flakey);


        services.updateFlakey(dbFlakey);
    }

    handleFlakeyChange(e) {
        e.preventDefault();
        const focusedFlakey = this.state.focusedFlakey;

        focusedFlakey[e.target.name] = e.target.value;

        this.setState({ focusedFlakey });
    }

    handleUserSubscription(userObj) {
        const user = services.dbUserToUser(userObj);

        

        //unsubscribe to old flakeys
        this.state.user.flakeyIds.map( (flakeyId) => {
            //unsubscribe to old flakeys
            if (flakeyId !== "") {
                services.unsubscribeToFlakey(flakeyId);
            }
            
        });

        //convert flakeyIds object to an array
        const flakeyIds = [];
        for (let key in user.flakeyIds) {
            flakeyIds.push(key);
        }
        user.flakeyIds = flakeyIds;

        console.log("From user Subscription", user.flakeyIds);

        //subscribe to new flakeys
        user.flakeyIds.map( (flakeyId) => {
            services.subscribeToFlakey(flakeyId, this.handleFlakeySubscription);
        });


        this.setState({ user });

    }

    handleFlakeySubscription(flakeyObj) {
        if(flakeyObj) {

            //check if member of that flakey
            if(this.state.user.uid in flakeyObj.members) {
            
                services.dbFlakeyToFlakey(flakeyObj)
                    .then( flakey => {
                        const flakeys = Object.assign({}, this.state.flakeys);

                        flakeys[flakey.id] = flakey;

                        this.setState({ flakeys });
                    });
            } else {
                const user = Object.assign({}, this.state.user);

                delete user[flakeyObj.id];

                services.updateUser(user);
            }
        }
    }

    // flakeyToDbFlakey(flakey) {
    //     const newflakey = Object.assign({}, flakey);

    //     //convert owner object to title
    //     newflakey.owner = newflakey.owner.uid;

    //     //convert member property array to member property object
    //     const members = {};
    //     newflakey.members.forEach( (member) => {
    //         members[member.uid] = true;
    //     });
    //     newflakey.members = members;

    //     //convert flakedMembers
    //     const flakedMembers = {};
    //     if ('flakedMembers' in flakey) {
    //         newflakey.flakedMembers.forEach( (flakedMember) => {
    //             flakedMembers[flakedMember.uid] = true;
    //         });
    //     }
    //     newflakey.flakedMembers = flakedMembers;

    //     return newflakey;

    // }

    // dbFlakeyToFlakey(flakeyObj) {
    //     const flakey = Object.assign({}, flakeyObj);

    //     //make date readable
    //     // flakey.dateExpiresFormatted = moment(flakey.dateExpires).format('MMMM Do YYYY, h:mm:ss a');

    //     // flakey.dateCreatedFormatted = moment(flakey.dateCreated).format('MMMM Do YYYY, h:mm:ss a');

    //     //create a list of user ids to get info about.
    //     const userids = [flakey.owner];
    //     for (let uid in flakey.members) {
    //         userids.push(uid);
    //     }

    //     console.log("Flakey being converted:", flakey, userids)

    //     return services.getUsersByUid(userids)
    //         .then( userArray => {
    //             console.log('user array:', userArray);
    //             flakey.owner = {
    //                 uid: userArray[0].uid,
    //                 name: userArray[0].name
    //             };

    //             //remove owner
    //             userArray.splice(0, 1);

    //             //expand out member information for Flakey
    //             flakey.members = userArray.map( user => {
    //                 return {uid: user.uid, name: user.name}
    //             });

    //             //ensure flakedMembers are in sync
    //             if ('flakedMembers' in flakey) {
    //                 const flakedMembersArray = [];
    //                 flakey.members.map( member => {
    //                     if (member.uid in flakey.flakedMembers) {
    //                         flakedMembersArray.push(member);
    //                     }
    //                 });

    //                 flakey.flakedMembers = flakedMembersArray;
    //             }

    //             return flakey;

    //         });

    // }


    componentDidMount() {

        auth.onAuthStateChanged(this.handleOnAuthStateChanged);


        //Bob
        // services.subscribeToUser('-Ktcn3Bh5w7mZRZKwqwE', this.handleUserSubscription);

        //Sally
        // services.subscribeToUser('-KtgPURrKqTSpsRVEO3F', this.handleUserSubscription);

        // services.createFlakey('-KtgPURrKqTSpsRVEO3F');



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

        const flakeysViewProps = {
            user: this.state.user,
            flakeys: flakeys,
            focusedFlakey: this.state.focusedFlakey,
            handleFlakeyChange: this.handleFlakeyChange,
            handleFlakeySelection: this.handleFlakeySelection,
            handleFlakeySubmit: this.handleFlakeySubmit
        };

        const flakeyCardViewProps = {
            user: this.state.user,
            handleFlakeyChange: this.handleFlakeyChange,
            handleFlakeySubmit: this.handleFlakeySubmit
        };

        const headerProps = {
            user: this.state.user,
            userAuth: this.state.userAuth,
            handleCreateNewFlakey: this.handleCreateNewFlakey,
            handleToFlakeysView: this.handleToFlakeysView,
            login: this.login,
            logout: this.logout,
        }

        return (
            <StyleRoot>
                <Router>
                    <div>
                    <Route path="/" render={props => <Header {...props} {...headerProps}
                        {...this.header} />} />


                        <Route exact path="/" component={LandingView} />

                    <Switch>
                        <Route exact path="/flakeys" render={props => <FlakeysView {...props} {...flakeysViewProps} />} />
                        
                        <Route exact path="/flakeys/:flakeyId" render={props => <FlakeyCardView {...props} {...flakeyCardViewProps} />} />
                    </Switch>
                    </div>
                </Router>
                {/*<FlakeysView user={this.state.user} 
                            flakeys={flakeys}
                            focusedFlakey={this.state.focusedFlakey}
                            handleFlakeySelection={this.handleFlakeySelection}
                            handleFlakeyChange={this.handleFlakeyChange}
                            handleFlakeySubmit={this.handleFlakeySubmit}/> */}








                {/*<CreateFlakeyView   handleSubmit={this.handleCreateFlakeySubmit}
                                    handleCancel={this.handleCreateFlakeyCancel}handleChange={this.handleCreateFlakeyChange}formVals={this.state.createFlakeyVals}/>*/}
                {/*<EditFlakeyView handleSubmit={this.handleEditFlakeySubmit}
                                handleCancel={this.handleEditFlakeyCancel}handleChange={this.handleEditFlakeyChange}
                                handleDelete={this.handleEditFlakeyDelete}formVals={this.state.editFlakeyVals}/>*/}

                

            </StyleRoot>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));