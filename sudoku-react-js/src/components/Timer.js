import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOn: false,
            seconds: 0,
            minutes: 0,
            hours: 0
        }
        this.startTimer = this.startTimer.bind(this);
        this.showTime = this.showTime.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    startTimer() {
        this.interval = setInterval(() => {
            if(this.state.seconds >= 59) {
                this.setState(prevState => ({ 
                    minutes: prevState.minutes + 1,
                    seconds: -1
                }));
            }
            if(this.state.minutes >= 59) {
                this.setState(prevState => ({
                    hours: prevState.hours + 1,
                    minutes: -1
                }));
            }
            this.setState(prevState => ({
                seconds: prevState.seconds + 1
            }));
        }, 1000)
    }

    showTime() {
        let sec, min, hr;

        if(this.state.seconds < 10) {
            sec = "0" + this.state.seconds;
        } else {
            sec = this.state.seconds;
        }

        if(this.state.minutes < 10) {
            min = "0" + this.state.minutes;
        } else {
            min = this.state.minutes;
        }

        if(this.state.hours < 10) {
            hr = "0" + this.state.hours;
        } else {
            hr = this.state.hours;
        }

        
        return hr + ":" + min + ":" + sec;
    }


    render() {
        let time = this.showTime();
        return (
            <span>{time}</span>
        );
    }
}

export default Timer;