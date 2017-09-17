import React from 'react';

class FlakeyFlakers extends React.Component {
    render() {
        const { members } = this.props;

        return (
            <div>
                Flakers:
                <ul className="FlakeyCard__list">
                    {members.map( (member) => {
                        return (
                            <li key={member.uid} className="FlakeyCard__item">{member.name}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default FlakeyFlakers;