import React    from 'react';
import services from './services';

import FlakeyCardViewHeader from './components/FlakeyCardViewHeader';
import FlakeyCard from './components/FlakeyCard';

class FlakeyCardView extends React.Component {
    constructor() {
        super();

        this.state = {
            flakey: null,
            editMode: false, 
            isNew: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);

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

    handleCommitToFlakey(e) {
        e.preventDefault();

        const uid = this.props.user.uid;
        const flakeyId = this.state.flakey.id;

        services.addFlakeyToUser(uid, flakeyId);

        console.log("Clicked Commit to Flakey", uid, flakeyId);
    }

    handleFlakeySubscription(flakeyObj) {
        if(flakeyObj) {

            services.dbFlakeyToFlakey(flakeyObj)
                .then( flakey => {
                    this.setState({ flakey });
                });
        }
    }

    handleHeaderClick(e) {
        e.preventDefault();
        const target = e.target;
        const name = target.name;

        if (name === "edit" || name === "cancel") {
            this.toggleEditMode();
        }
    }

    toggleEditMode() {
        this.setState({ editMode: !this.state.editMode });
    }

    handleSubmit(e, flakey) {
        e.preventDefault();
        this.props.handleFlakeySubmit(e, flakey);

        this.setState({ 
            editMode: false,
            isNew: false
        });
    }

    render() {
        const user = this.props.user;
        const flakey = this.state.flakey; //|| {title: '', event: '', amount: 0, dateCreated: 0, dateExpires: 0, owner: '', members: [], flakedMembers: [], description: '', expired: false, complete: false};

        const { isNew, editMode } = this.state;
        
        let isOwner;
        if (flakey !== null) {
           isOwner = (user.uid === (flakey.owner.uid));
        }

        console.log('From FlakeyCardView', flakey);

        return (
            <div>
                <FlakeyCardViewHeader
                    editMode={editMode}
                    handleClick={this.handleHeaderClick} />
                {flakey ? (
                    <FlakeyCard
                            isOwner={isOwner}
                            isNew={isNew}
                            editMode={editMode}
                            fullDisplayMode={true}
                            handleSubmit={this.handleSubmit}
                            handleCommitToFlakey={this.handleCommitToFlakey}
                            flakey={flakey}
                    />
                ) : (
                    <h3>No Flakey to show here!</h3>
                )}

            </div>
        );
    }


}


export default FlakeyCardView;