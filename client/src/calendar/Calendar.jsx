/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prefer-const */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment';
import Weekdays from './Weekdays.jsx';
import styled from '../Styles.jsx';

const {
  Days, Cursor, Arrow, DeadDays
} = styled;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formatContext: moment(),
      today: moment(),
      checkIn: 'Checkin',
      checkOut: 'Checkout'
    };
    // variables
    this.weekdays = moment.weekdays();
    this.short = moment.weekdaysShort();
    this.months = moment.months();

    // bindings
    this.year = this.year.bind(this);
    this.month = this.month.bind(this);
    this.daysInMonth = this.daysInMonth.bind(this);
    this.currentDate = this.currentDate.bind(this);
    this.currentDay = this.currentDay.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.lastMonth = this.lastMonth.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.monthNum = this.monthNum.bind(this);
  }


  year() {
    return this.state.formatContext.format('Y');
  }

  month() {
    return this.state.formatContext.format('MMMM');
  }

  monthNum() {
    return this.state.formatContext.month(this.month()).format('M');
  }

  daysInMonth() {
    return this.state.formatContext.daysInMonth();
  }

  currentDate() {
    return this.state.formatContext.get('date');
  }

  currentDay() {
    return this.state.formatContext.format('D');
  }

  firstDayOfMonth() {
    let { formatContext } = this.state;
    let firstDay = moment(formatContext).startOf('month').format('d');
    return firstDay;
  }

  nextMonth() {
    let { formatContext } = this.state;
    let newMonthContext = { ...formatContext };
    newMonthContext = moment(formatContext).add(1, 'month');
    this.setState({
      formatContext: newMonthContext
    });
  }

  lastMonth() {
    let { formatContext } = this.state;
    let newMonthContext = { ...formatContext };
    newMonthContext = moment(formatContext).subtract(1, 'month');
    this.setState({
      formatContext: newMonthContext
    });
  }

  selectDay(event, day, formatContext) {
    let year = this.year();
    let month = formatContext.format('M');
    let date = `${month}/${day}/${year}`;
    // console.log(date);

    if (this.state.checkIn === 'Checkin') {
      this.props.updateCheckIn(date);
      this.setState({
        checkIn: date
      });
    } else {
      this.props.updateCheckOut(date);
      this.setState({
        checkOut: date
      });
      setTimeout(() => this.props.updateNights(), 0);
      setTimeout(() => this.props.updateTotal(), 1);
    }
  }


  render() {
    let blankDays = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blankDays.push(<td key={i * Math.random()} className="empty-days">{''}</td>);
    }
    let existingDays = [];
    for (let i = 1; i <= this.daysInMonth(); i++) {
      let className = (i === this.currentDay() ? 'day current-day' : 'day');
      let mon = this.monthNum();
      let day = `${this.year()}-${mon < 10 ? `0${mon}` : mon}-${i < 10 ? `0${i}` : i}`;
      let alreadyReserved = true;
      for (let j = 0; j < this.props.reservations.length; j++) {
        let checkIn = this.props.reservations[j].checkin_date;
        let checkout = this.props.reservations[j].checkout_date;
        if (moment(day).isBetween(checkIn, checkout) || moment(day).isSame(checkIn) || moment(day).isSame(checkout)) {
          alreadyReserved = false;
          break;
        }
      }
      let validDay = moment(day).isBefore(moment().subtract(1, 'day'));
      let goodDay = (
        <Days
          key={i}
          className={className}
          onClick={(event) => this.selectDay(event, i, this.state.formatContext)}
        >
          <span>{i}</span>
        </Days>
      );
      let badDay = (
        <DeadDays key={i} className={className}>
          <strike>{i}</strike>
        </DeadDays>
      );
      existingDays.push(validDay || !alreadyReserved ? badDay : goodDay);
    }
    let daysArray = [...blankDays, ...existingDays];
    let rows = [];
    let cells = [];

    daysArray.forEach((row, i) => {
      if ((i % 7) !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === daysArray.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let allDays = rows.map((day, i) => (
      <tr key={i * Math.random()}>{day}</tr>
    ));

    return (
      <div className="calendar-container">
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              <Cursor onClick={this.lastMonth} colSpan="2">
                <Arrow src="/images/arrow-left.svg" alt="" />
              </Cursor>
              <td colSpan="6">{`${this.month()}, ${this.year()}`}</td>
              <Cursor onClick={this.nextMonth} colSpan="2">
                <Arrow src="/images/arrow-right.svg" alt="" />
              </Cursor>

            </tr>
          </thead>
          <tbody>
            <Weekdays weekdays={this.short} />
            {allDays}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
