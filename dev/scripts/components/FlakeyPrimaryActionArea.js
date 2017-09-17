import React from 'react';

class FlakeyPrimaryActionArea extends React.Component {
    render() {
        const innerContent = this.props.children;

        return (
            <div>
                {innerContent}
            </div>
        );
    }
}

export default FlakeyPrimaryActionArea;