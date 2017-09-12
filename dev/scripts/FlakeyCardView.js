import React    from 'react';
import services from './services';

import FlakeyCard from './components/FlakeyCard';

class FlakeyCardView extends React.Component {
    constructor() {
        super();

        this.state = {
            flakey: null, 
        }
    }

    componentDidMount() {
        const flakeyId = this.props.match.params.flakeyId;

        services.getFlakey(flakeyId)
        .then( flakeyObj => {
            return services.dbFlakeyToFlakey(flakeyObj);
        })
        .then(flakey => {
            this.setState({ flakey });
        });
    }




    render() {
        const user = this.props.user;
        const flakey = this.state.flakey;

        return (
            <div>
                {this.state.flakey ? (
                    <FlakeyCard
                            isOwner={user.uid === flakey.owner.uid}
                            editMode={true}
                            fullDisplayMode={true}
                            handleSubmit={this.props.handleFlakeySubmit}
                            flakey={this.state.flakey}
                    />
                ) : (
                    <h3>No Flakey to show here!</h3>
                )}

            </div>
        );
    }


}


export default FlakeyCardView;