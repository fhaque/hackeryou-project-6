import React                from 'react';
import Radium               from 'radium';

import services             from './services';
import style                from './style.js';

import FlakeyCardViewHeader from './components/FlakeyCardViewHeader';
import FlakeyCard           from './components/FlakeyCard';

var styles = {
    base: {
        padding: '10%',
    }
}

var flakeyCardStyle = {
    base: {
        width: '100%',
        margin: '0 auto',
    }
}

class FlakeyCardView extends React.Component {
    constructor() {
        super();

        this.state = {
            flakey: null,
            // editMode: false, 
            // isNew: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleHeaderClick = this.handleHeaderClick.bind(this);
        // this.toggleEditMode = this.toggleEditMode.bind(this);

        this.handleFlakeySubscription = this.handleFlakeySubscription.bind(this);
        this.handleCommitToFlakey = this.handleCommitToFlakey.bind(this);
    }

    componentDidMount() {
        const flakeyId = this.props.match.params.flakeyId;

        services.getFlakey(flakeyId)
        .then( flakeyObj => {
            return services.dbFlakeyToFlakey(flakeyObj);
        })
        .then(flakey => {
            services.subscribeToFlakey(flakeyId, this.handleFlakeySubscription);
            this.setState({ flakey });
        });
    }

    componentWillReceiveProps(nextProps) {
        const flakeyId = nextProps.match.params.flakeyId;

        services.getFlakey(flakeyId)
        .then( flakeyObj => {
            return services.dbFlakeyToFlakey(flakeyObj);
        })
        .then(flakey => {
            services.subscribeToFlakey(flakeyId, this.handleFlakeySubscription);
            this.setState({ flakey });
        });


    }

    handleCommitToFlakey(e) {
        e.preventDefault();

        const uid = this.props.user.uid;
        const flakeyId = this.state.flakey.id;

        console.log("Clicked Commit to Flakey", uid, flakeyId);

        services.addFlakeyToUser(uid, flakeyId);

        
    }

    handleFlakeySubscription(flakeyObj) {
        if(flakeyObj) {

            services.dbFlakeyToFlakey(flakeyObj)
                .then( flakey => {
                    this.setState({ flakey });
                });
        }
    }

    // handleHeaderClick(e) {
    //     e.preventDefault();
    //     const target = e.target;
    //     const name = target.name;

    //     if (name === "edit" || name === "cancel") {
    //         this.toggleEditMode();
    //     }
    // }

    // toggleEditMode() {
    //     this.setState({ editMode: !this.state.editMode });
    // }

    handleSubmit(e, flakey) {
        e.preventDefault();
        this.props.handleFlakeySubmit(e, flakey);

        // this.setState({ 
        //     // editMode: false,
        //     // isNew: false
        // });
    }

    render() {
        const { user, editMode } = this.props;
        const flakey = this.state.flakey; //|| {title: '', event: '', amount: 0, dateCreated: 0, dateExpires: 0, owner: '', members: [], flakedMembers: [], description: '', expired: false, complete: false};

        // const { isNew } = this.state;
        
        let isOwner;
        if (flakey !== null) {
           isOwner = (user.uid === (flakey.owner.uid));
        }

        let memberFlaked = false;

        if ('flakedMembers' in (flakey || {}) ) {
            const flakedMember = flakey.flakedMembers.filter( member => member.uid === user.uid);
            
            memberFlaked = (flakedMember.length !== 0);
        }


        return (
            <div style={styles.base}>
                {/*<FlakeyCardViewHeader
                    editMode={editMode}
                    handleClick={this.handleHeaderClick} />*/}
                {flakey ? (
                    <div style={flakeyCardStyle.base}>
                    <FlakeyCard
                            isOwner={isOwner}
                            // isNew={isNew}
                            editMode={editMode || false}
                            memberFlaked={memberFlaked}
                            fullDisplayMode={true}
                            handleSubmit={this.handleSubmit}
                            handleCommitToFlakey={this.handleCommitToFlakey}
                            flakey={flakey}
                    />
                    </div>
                ) : (
                    <h3>No Flakey to show here!</h3>
                )}

            </div>
        );
    }


}

FlakeyCardView = Radium(FlakeyCardView);
export default FlakeyCardView;