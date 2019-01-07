import React from 'react';

export default class Time extends React.Component {
  state = {
    time: new Date()
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: new Date() })
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTimeHHMM = () => {
    const { time } = this.state;
    const hour = (time.getHours() > 12) ? time.getHours() - 12 : time.getHours();
    const minute = (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes();
    return `${hour} : ${minute}`
  }

  getTimeHHMMMilitary = () => {
    const { time } = this.state;
    const hour = time.getHours();
    const minute = (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes();
    return `${hour} : ${minute}`
  }

  render() {
    const { time } = this.state;
    const { children } = this.props;
    const { getTimeHHMM, getTimeHHMMMilitary } = this;

    let day;
    switch (time.getDay()) {
      case 0: day = 'Sunday'; break;
      case 1: day = 'Monday'; break;
      case 2: day = 'Tuesday'; break;
      case 3: day = 'Wednesday'; break;
      case 4: day = 'Thursday'; break;
      case 5: day = 'Friday'; break;
      case 6: day = 'Saturday'; break;
      default: day = null;
    }
    let month
    switch(time.getMonth()) {
      case 0: month = 'Jan'; break;
      case 1: month = 'Feb'; break;
      case 2: month = 'Mar'; break;
      case 3: month = 'Apr'; break;
      case 4: month = 'May'; break;
      case 5: month = 'Jun'; break;
      case 6: month = 'Jul'; break;
      case 7: month = 'Aug'; break;
      case 8: month = 'Sep'; break;
      case 9: month = 'Oct'; break;
      case 10: month = 'Nov'; break;
      case 11: month = 'Dec'; break;
    }

    return (
      children({ time, day, month, getTimeHHMM, getTimeHHMMMilitary, })
    )
  }
}