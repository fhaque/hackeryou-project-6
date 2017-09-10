import      React                       from 'react';
import      ReactDOM                    from 'react-dom';
import      moment                      from 'moment';

class FlakeyEditForm extends React.Component {

    render() {
        const handleSubmit = this.props.handleSubmit;
        const handleCancel = this.props.handleCancel;
        const handleChange = this.props.handleChange;
        const {title, event, date, time, amount} = this.props.formVals;
        const newEntry = this.props.newEntry;
        const disabled = (!newEntry) ? "disabled" : "";

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Flakey Title:
                    <input type="text" name="title" onChange={handleChange} value={title} disabled={disabled} />
                </label>
                <label>
                    Event Name:
                    <input type="text" name="event" onChange={handleChange} value={event} disabled={disabled} />
                </label>
                <div>
                    <p>This Flakey Expires On:</p>
                    <label>
                        Date:
                        <input type="date" name="date" onChange={handleChange} value={date} disabled={disabled} />
                    </label>
                    <label>
                        Time:
                        <input type="time" name="time" onChange={handleChange} value={time} disabled={disabled} />
                    </label>
                </div>
                <label>
                    Punishment Amount:
                    <input type="text" name="amount" onChange={handleChange} value={amount} disabled={disabled} />
                </label>
                <input type="submit" value="Commit Flakey" />
                <button onClick={handleCancel}>Cancel</button>
            </form>
        );

    }
}


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