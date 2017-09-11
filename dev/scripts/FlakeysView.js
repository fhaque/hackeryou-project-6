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
                        handleChange={this.props.handleFlakeyChange}
                        
                        {...(this.props.focusedFlakey.id === flakey.id) ? this.props.focusedFlakey : flakey}
                        
                         />
                    )
                })}
            </div>
        )
    }
}


export default FlakeysView;