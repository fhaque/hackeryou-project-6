import      React                       from 'react';
import      ReactDOM                    from 'react-dom';

import FlakeyCard from './components/FlakeyCard';

class FlakeysView extends React.Component {
    render() {
        return (
            <div>
                {this.props.flakeys.map( flakey => {
                    return(
                        <FlakeyCard key={flakey.id} expand={false} onlyCanCommit={this.props.onlyCanCommit} {...flakey} />
                    )
                })}
            </div>
        )
    }
}


export default FlakeysView;