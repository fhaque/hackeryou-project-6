import      React                       from 'react';
import      ReactDOM                    from 'react-dom';
import      moment                      from 'moment';

class FlakeyEditForm extends React.Component {

    render() {
        const {handleSubmit, handleCancel, handleChange, handleDelete} = this.props;

        const {title, event, date, time, amount, description} = this.props.formVals;

        const newEntry = this.props.newEntry;
        const disabled = (!newEntry) ? "disabled" : "";
        const hide = !newEntry;

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Flakey Title:
                    <input type="text" name="title" onChange={handleChange} value={title} />
                </label>
                <label>
                    Event Name:
                    <input type="text" name="event" onChange={handleChange} value={event} />
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
                <label>
                    Description:
                    <textarea name="description" onChange={handleChange} value={description} />
                </label>                
                <input type="submit" value="Commit to Flakey" />
                <button onClick={handleCancel}>Cancel</button>
                { hide && <button onClick={handleDelete}>Delete Flakey</button> }
            </form>
        );

    }
}

export default FlakeyEditForm;