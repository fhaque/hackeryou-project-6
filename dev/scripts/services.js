import firebase from './firebase';

// const dbRef = firebase.database().ref();
const dbUsersRef = firebase.database().ref('users/');
const dbFlakeysRef = firebase.database().ref('flakeys/');

const services = {
    // uid: '',
    // dbUser: {},
};

// services.init = function(uid) {
//     services.setUid(uid);
//     services.setDbUser();
// };

// services.setUid = function(uid) {
//     this.uid = uid;
// };

// services.setDbUser = function() {
//     this.dbUser = firebase.database().ref(`users/${this.uid}`);
// }; 

services.getUserByUid = function(uid) {
    const dbUser = dbUsersRef.child(uid);
    return dbUser.once('value');
};

services.getFlakey = function(flakeyId) {
    const dbFlakey = dbFlakeysRef.child(flakeyId);
    return dbFlakey.once('value')
            .then( (snapshot) => snapshot.val());
};

services.getFlakeys = function(flakeyIdArray) {
    const promises = flakeyIdArray.map( (flakeyid) => {
        return services.getFlakey(flakeyid);
    });

    return Promise.all(promises);
};

services.createFlakeyObj = function() {
    return {
        owner: '',
        title: '',
        event: '',
        amount: 0,
        members: [''],
        flakedMembers: [''],
        key: '',
        expired: false,
        deleted: false,
        complete: false,
        description: '',
    };
};

services.saveNewFlakey = function(flakeyObj) {
    const key = dbFlakeysRef.push().key;
    const updates = {};

    //save the flakey database id into the flakey
    flakeyObj.id = key;
    updates[key] = flakeyObj;

    services.validateAndCorrectFlakey(flakeyObj);

    return dbFlakeysRef.update(updates)
        .then( val => true )
        .catch( err => {
            console.log('Services: failed to save Flakey');
            return err;
        });
};

services.validateAndCorrectFlakey = function(flakeyObj) {
    //validate that owner is a member
    if ( !flakeyObj.members.includes( flakeyObj.owner ) ) {
        flakeyObj.members.push( flakeyObj.owner );
    }

    //validate that if flakey is not expired, flakedMembers is empty
    if ( !flakeyObj.expired ) {
        flakeyObj.flakedMembers = [''];
    }
} 



export default services;