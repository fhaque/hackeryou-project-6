import      React                       from 'react';
import      ReactDOM                    from 'react-dom';
import      FlakeyEditForm              from './components/FlakeyEditForm';

class CreateFlakeyView extends React.Component {
    render() {
        return (
            <div>
                <FlakeyEditForm newEntry={true} 
                                handleSubmit={this.props.handleSubmit} handleCancel={this.props.handleCancel}
                                handleChange={this.props.handleChange}
                                formVals={this.props.formVals}/>
            </div>
        )
    }
}

export default CreateFlakeyView;