import  React       from 'react';
import  ReactDOM    from 'react-dom';
import  Radium      from 'radium';

import  style       from './style.js';

import  FlakeyCard  from './components/FlakeyCard';

var styles = {
    base: {
        display: 'flex',
        justifyContent: 'spaceEvenly',
        alignItems: 'center',
        flexWrap: 'wrap',

        margin: '0 auto',
    },
}

var cardStyles = {
    base: {
        width: '33.33%',
        minWidth: '300px',

        padding: '5%',
        margin: '0 auto',
    },
}

class FlakeysView extends React.Component {

    checkMemberFlaked(flakey, user) {
        let memberFlaked = false;
        
        if ('flakedMembers' in (flakey || {}) ) {
            const flakedMember = flakey.flakedMembers.filter( member => member.uid === user.uid);
            
            memberFlaked = (flakedMember.length !== 0);
        }
    }

    render() {
        const user = this.props.user;

        return (
            <div style={styles.base}>
                {this.props.flakeys.map( flakey => {
                    return(
                        <div style={cardStyles.base}>
                         <FlakeyCard key={flakey.id}
                            fullDisplayMode={false}
                            memberFlaked={this.checkMemberFlaked}
                            isOwner={user.uid === flakey.owner.uid}
                            handleClick={(e)=> this.props.handleFlakeySelection(e, flakey.id, this.props.history)}
                            flakey={flakey}
                        />
                        </div>
                    )
                })}
            </div>
        )
    }
}

FlakeysView = Radium(FlakeysView);
export default FlakeysView;