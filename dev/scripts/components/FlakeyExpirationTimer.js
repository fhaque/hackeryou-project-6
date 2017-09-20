import React from 'react';
import Radium from 'radium';

import moment from 'moment';

import style from '../style.js';

//container style
var styles = {
    base: {
        width: '100%',
        color: style.colors.light, 
    },
}

var labelStyles = style.el.labelStyles;

var timeUnitContainerStyles = {
    base: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        margin: '0 2%',

        textShadow: style.dropShadow.text,
    }
}

var timeStyles = {
    base: {
        display: 'block',
        fontSize: '1.5em',
        fontWeight: style.fontWeight.heavy,
        fontFamily: style.fontFamily.primary,
    }
}

var timeLabelStyles = {
    base: {
        display: 'block',
        fontSize: '0.8em',
        fontWeight: style.fontWeight.medium,
        fontFamily: style.fontFamily.primary,
    }
}

var nonEditStyles = {
    base: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

class FlakeyExpirationTimer extends React.Component {
    
    constructor() {
        super();

        this.state = {
            remainingTime: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            dateExpires: 0,
            timerExpired: false
        }

        this.intervalID = 0;

        this.handleInterval = this.handleInterval.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            dateExpires: nextProps.dateExpires
         });
    }

    componentDidMount() {
        const {dateExpires} = this.props;

        this.intervalID = setInterval(this.handleInterval, 1000);
    }

    handleInterval() {
        const nowPastExpiration = this.state.dateExpires <= Date.now();
        
        //update the time remaining for display
        this.setState({ remainingTime: this.calculateTimeRemaining(this.state.dateExpires) });

        if (nowPastExpiration && !this.state.timerExpired) {
            this.props.handleExpire();
        }
        
        //check if timer expired
        if ( nowPastExpiration ) {
            this.setState({ timerExpired: true });
        } else {
            this.setState({ timerExpired: false });
        }

        

        
    }


    calculateTimeRemaining(date) {
        const now = Date.now();

        const oneSecond = 1000;
        const oneMinute = 60 * oneSecond;
        const oneHour = 60 * oneMinute;
        const oneDay = 24 * oneHour;
        

        let remainingTime = date - now;

        let daysRemaining = Math.floor( remainingTime / oneDay );

        if (daysRemaining < 0) {
            daysRemaining = 0;
        }

        remainingTime = remainingTime - daysRemaining * oneDay;

        let hoursRemaining = Math.floor( remainingTime / oneHour ); 

        if (hoursRemaining < 0) {
            hoursRemaining = 0;
        }

        remainingTime = remainingTime - hoursRemaining * oneHour;

        let minutesRemaining = Math.floor(remainingTime / oneMinute );

        if (minutesRemaining < 0) {
            minutesRemaining = 0;
        }

        remainingTime = remainingTime - minutesRemaining * oneMinute;
        
        let secondsRemaining = Math.floor(remainingTime / oneSecond );
        
        if (secondsRemaining < 0) {
            secondsRemaining = 0;
        }

        return {
            days: daysRemaining,
            hours: hoursRemaining,
            minutes: minutesRemaining,
            seconds: secondsRemaining
        };
    }

    


    render() {
        const {editMode, handleChange, date, time, dateExpires} = this.props;

        const dateExpiresFormatted = moment(dateExpires).format('MMMM Do YYYY, h:mm:ss a');

        const {days, hours, minutes, seconds} = this.state.remainingTime;


        return (
            <div style={styles.base}>
            <p style={labelStyles.base}>Time Remaining</p>
            { editMode ? 
                    <span>
                        <label>
                            Date:
                            <input type="date" name="date" onChange={handleChange} value={date || moment().format('YYYY-MM-DD')} />
                        </label>
                        <label>
                            Time:
                            <input type="time" name="time" onChange={handleChange} value={time || moment().format('HH:mm')} />
                        </label>
                    </span>
                 :
                    <div style={nonEditStyles.base}>
                        <div style={timeUnitContainerStyles.base}>
                            <p style={timeStyles.base}>{days}</p>
                            <p style={timeLabelStyles.base}>days</p>
                        </div>

                        <div style={[timeUnitContainerStyles.base, timeStyles.base]}>:</div>

                        <div style={timeUnitContainerStyles.base}>
                            <p style={timeStyles.base}>{hours}</p>
                            <p style={timeLabelStyles.base}>hrs</p>
                        </div>

                        <div style={[timeUnitContainerStyles.base, timeStyles.base]}>:</div>

                        <div style={timeUnitContainerStyles.base}>
                            <p style={timeStyles.base}>{minutes}</p>
                            <p style={timeLabelStyles.base}>mins</p>
                        </div>

                        <div style={[timeUnitContainerStyles.base, timeStyles.base]}>:</div>

                        <div style={timeUnitContainerStyles.base}>
                            <p style={timeStyles.base}>{seconds}</p>
                            <p style={timeLabelStyles.base}>secs</p>
                        </div>
                    </div>
            }
            
            </div>
        );
    }
}

FlakeyExpirationTimer = Radium(FlakeyExpirationTimer);
export default FlakeyExpirationTimer;

