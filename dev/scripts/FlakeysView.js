import      React                       from 'react';
import      ReactDOM                    from 'react-dom';

import FlakeyCard from './components/FlakeyCard';

class FlakeysView extends React.Component {
    render() {
        const user = this.props.user;

        return (
            <div>
                {this.props.flakeys.map( flakey => {
                    return(
                         <FlakeyCard key={flakey.id}
                            isOwner={user.uid === flakey.owner.uid}
                            handleClick={(e)=> this.props.handleFlakeySelection(e, flakey.id, this.props.history)}
                            flakey={flakey}
                        />

                        
                    )
                })}
            </div>
        )
    }
}


export default FlakeysView;