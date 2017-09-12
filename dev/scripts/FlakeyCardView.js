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
        console.log(flakeyId);

        services.getFlakey(flakeyId)
        .then( flakey => {
            this.setState({ flakey });
        });
    }

    render() {
        return (
            <div>
                {this.state.flakey ? (
                    <FlakeyCard
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