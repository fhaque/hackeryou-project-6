import      React                       from 'react';
import      ReactDOM                    from 'react-dom';

import FlakeyCard from './components/FlakeyCard';

class FlakeysView extends React.Component {
    render() {
        return (
            <div>
                {this.props.flakeys.map( flakey => {
                    return(
                         <FlakeyCard key={flakey.id}
                            handleClick={()=> this.props.handleFlakeySelection(flakey.id)}
                            handleSubmit={this.props.handleFlakeySubmit}
                            flakey={flakey}
                        />

                        
                    )
                })}
            </div>
        )
    }
}


export default FlakeysView;