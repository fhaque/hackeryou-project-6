import React from 'react';

class FlakeyEditActionArea extends React.Component {
    render() {
        const innerContent = this.props.children;

        return (
            <div>
                {innerContent}
            </div>
        );
    }
}

export default FlakeyEditActionArea;