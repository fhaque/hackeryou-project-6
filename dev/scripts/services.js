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
    const dbUser = firebase.database().ref(`users/${uid}`);
    // const dbUser = dbUsersRef.child(uid);
    return dbUser.once('value').then( snapshot => snapshot.val() );
};

services.getUsersByUid = function(uids) {
    let promises = [];

    if ( Array.isArray(uids) ) { //if Array
        promises = uids.map( (uid) => {
            return services.getUserByUid(uid);
        });

    } else { //if plain Object of form {uid: true, ...}
        for (let uid in uids) {
            promises.push( services.getUserByUid(uid) );
        }
    }

    return Promise.all(promises);
}

services.createUserObj = function() {
    return {
        name: '',
        email: '',
        flakeyIds: [''],
        uid: '',
    }
}

services.saveNewUser = function(uid, userObj) {
    services.validateAndCorrectUser(uid, userObj);

    return dbUsersRef.child(userObj.uid).set(userObj)
        .then( val => true )
        .catch( err => {
            console.log('Services: failed to save User');
            return err;
        });
};

services.updateUser = function(userObj) {

    return dbUsersRef.child(userObj.uid).set(userObj)
        .then( () => true )
        .catch( err => {
            console.log('Services: failed to update User.');
            return err;
        });
}

services.validateAndCorrectUser = function(uid, userObj) {
    if (userObj.uid !== uid) {
        userObj.uid = uid;
    }
}

services.subscribeToUser = function(uid, cb) {
    const dbUser = dbUsersRef.child(uid);
    return dbUser.on('value', snapshot => cb(snapshot.val()) );
}

services.unsubscribeToUser = function(uid) {
    const dbUser = dbUsersRef.child(uid);
    dbUser.off();
}

services.subscribeToFlakey = function(flakeyId, cb) {
    const dbFlakey = dbFlakeysRef.child(flakeyId);
    return dbFlakey.on('value', snapshot => cb(snapshot.val()) );
}

services.unsubscribeToFlakey = function(flakeyId) {
    const dbFlakey = dbFlakeysRef.child(flakeyId);
    dbFlakey.off();
}

services.getFlakey = function(flakeyId) {
    const dbFlakey = dbFlakeysRef.child(flakeyId);
    return dbFlakey.once('value')
            .then( (snapshot) => snapshot.val());
};

//accepts flakeyIds as Array or as Object {flakeyid: true, ...}
services.getFlakeys = function(flakeyIds) {
    let promises = [];

    if ( Array.isArray(flakeyIds) ) { //if Array
        promises = flakeyIds.map( (flakeyId) => {
            return services.getFlakey(flakeyId);
        });

    } else { //if plain Object of form {flakeyid: true, ...}
        for (let flakeyId in flakeyIds) {
            promises.push( services.getFlakey(flakeyId) );
        }
    }

    return Promise.all(promises);
};

services.createFlakeyObj = function(flakeyVals) {
    const newVals = Object.assign({}, flakeyVals);

    const newFlakeyObj = {
        owner: '',
        title: '',
        event: '',
        dateExpires: 0,
        dateCreated: 0,
        amount: 0,
        members: {},
        flakedMembers: {},
        id: '',
        expired: false,
        deleted: false,
        complete: false,
        description: '',
    };

    //remove non-valid properties from function argument
    for (let key in newVals) {
        if ( !(key in newFlakeyObj) ) {
            delete newVals[key];
        }
    }

    //write in new values given from parameters
    Object.assign(newFlakeyObj, newVals);

    return newFlakeyObj;
};

services.saveNewFlakey = function(flakeyObj) {
    const key = dbFlakeysRef.push().key;
    const updates = {};

    //save the flakey database id into the flakey
    flakeyObj.id = key;
    updates[key] = flakeyObj;

    services.validateAndCorrectFlakey(flakeyObj);

    return dbFlakeysRef.update(updates)
        .then( () => key )
        .catch( err => {
            console.log('Services: failed to save Flakey');
            return err;
        });
};

services.validateAndCorrectFlakey = function(flakeyObj) {
    //validate that owner is a member
    if ( flakeyObj.owner in flakeyObj.members ) {
        flakeyObj.members[flakeyObj.owner] = true;
    }

    //validate that if flakey is not expired, flakedMembers is empty
    if ( !flakeyObj.expired ) {
        flakeyObj.flakedMembers = {};
    }

    //validate that Flakey is not complete before expiring
    if (!flakeyObj.expired && flakeyObj.complete) {
        return false;
    }

    //TODO: validate no duplicates in members and flakedMembers
    //best solution is to create a Set

    //validate flakedMembers exist in members. If it doesn't, delete it.
    // for (let flakedMember in flakeyObj.flakedMembers) {
        
    //     if ( !(flakedMember in flakeyObj.members) ) {
    //         delete flakeyObj.flakedMembers[flakedMember];
    //     }
    // }

    console.log(flakeyObj);
}

services.userCommitToFlakey = function(uid, flakeyid) {
    return dbFlakeysRef.child(`${flakeyid}/members/${uid}`).set(true)
        .then( () => true )
        .catch( err => {
            console.log('Services: failed to save Flakey');
            return err;
        });
}

services.addFlakeyToUser = function(uid, flakeyid) {
    return dbUsersRef.child(uid).child('flakeyid').update({[flakeyid]: true})
    .then( () => {
        return dbFlakeysRef.child(flakeyid).child('members').update({[uid]: true});
    })
    .then( () => true)
    .catch( err => {
        console.log('Services: failed to add Flakey to User.');
        return err;
    });;
}

//TODO: seperate out the user update from the flakey update.
services.createFlakey = function(uid) {
    const flakey = services.createFlakeyObj({});

    flakey.owner = uid;
    flakey.members = {[uid]: true};
    flakey.dateCreated = Date.now();
    flakey.dateExpires = Date.now() + 9999999999;
    
    const key = dbFlakeysRef.push().key;
    flakey.id = key;

    return dbFlakeysRef.child(key).set(flakey).then( () => {
        return dbUsersRef.child(uid).child('flakeyIds').update({ [key]: true });

        // return services.getUserByUid(uid).then( user => {
        //     user.flakeyIds[key] = true;
        //     return user;
        // })
        // .then( user => {
        //     return services.updateUser(user);
        // });

    })
    .then( () => true )
    .catch( err => {
        console.log('Services: failed to create Flakey');
        return err;
    });
}

services.updateFlakey = function(flakeyObj) {
    // services.validateAndCorrectFlakey(flakeyObj);

    console.log('Services: validated flakey:', flakeyObj);

    return dbFlakeysRef.child(flakeyObj.id).set(flakeyObj)
        .then( () => true )
        .catch( err => {
            console.log('Services: failed to update Flakey');
            return err;
        });
}

services.deleteFlakey = function(flakeyid) {
    console.log('Flakey deleted.');
    return dbFlakeysRef.child(flakeyid).remove()
    .then( () => true )
    .catch( err => {
        console.log('Services: failed to save Flakey');
        return err;
    });
}


// function removeDuplicates(array) {
//     return [...new Set(array)];
// }

function ObjectIsEmpty(flakedMembers) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export default services;