import      React                       from 'react';
import      ReactDOM                    from 'react-dom';
import  { 
            BrowserRouter as Router, 
            Route, 
            Link 
        }                               from 'react-router-dom';
import firebase from './firebase';
import services from './services';

import Header from './components/Header';

const dbUsersRef = firebase.database().ref('users/');
const dbFlakeysRef = firebase.database().ref('flakeys/');
// dbUsersRef.push({
//     name: 'Bob',
//     email: 'bob@gma.com',
//     flakey_ids: [''],
//     uid: '123'
// });
// dbFlakeysRef.push({
//     owner: 'Bob',
//     title: 'Better show',
//     event: 'Concert',
//     amount: 10.50,
//     members: ['blah','gwah'],
//     flakedMembers: [''],
//     key: '',
//     expired: false,
//     deleted: false,
//     complete: false,
//     description: 'This should be good.',
// });

class App extends React.Component {
    constructor() {
        super();

        const loggedInUserIndicator = {
            classes: {
                classEnvelope: 'header__loggedInUserIndicator',
            }
        }

        const header = {
            data: {
                title: "Flakey",
            },
            classes: {
                classEnvelope: 'header',
                classTitle: 'header__title',
            },
            children: {
                loggedInUserIndicator,
            },
        };


        this.state = {
            user: {},
            flakeys: [],

            //components
            header,
        };
    }

    componentDidMount() {
        //populate user info
        // services.getUserByUid('-Ktcn3Bh5w7mZRZKwqwE').then( val => console.log(val.val()));

        // services.getFlakey('-Ktcn3BsQrNOu06AXUoJ')
        // .then( val => console.log(val) );

        // services.getFlakeys(['-Ktcn3BsQrNOu06AXUoJ', '-Ktcn3BsQrNO'] ).then( val => console.log(val) );

        services.saveNewFlakey({
    owner: 'Bob',
    title: 'Better show',
    event: 'Concert',
    amount: 10.50,
    members: {
        'bill': true,
        'cat': true
    },
    flakedMembers: {
        'basdf': true,
    },
    id: '',
    expired: false,
    deleted: false,
    complete: false,
    description: 'This should be good.',
}).then( val => console.log(val));

        // console.log(firebase.auth().currentUser);

        // services.userCommitToFlakey('kiki', '-Ktcn3BsQrNOu06AXUoJ');
    }

    render() {
        return (
            <div>
                <Header {...this.state.header} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));