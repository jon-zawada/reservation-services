/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React from 'react';
import $ from 'jquery';
import moment from 'moment';

import RateReview from './RateReview.jsx';
import Pricing from './Pricing.jsx';
import Calendar from './calendar/Calendar.jsx';
import Guests from './Guests.jsx';
import styled from './Styles.jsx';

const focalId = 7;

const { AppWrapper, Reserve } = styled;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationId: '',
      rate: '',
      review_avg: '',
      total_review: '',
      service_fee: '',
      occupancy_tax: '',
      calendarOpen: false,
      guestsOpen: false,
      checkIn: 'Check-in',
      checkOut: 'Checkout',
      adults: 1,
      children: 0,
      infants: 0,
      nights: 1,
      totalPrice: ''
    };

    // bindings
    this.calendarPopUp = this.calendarPopUp.bind(this);
    this.guestPopUp = this.guestPopUp.bind(this);
    this.decrease = this.decrease.bind(this);
    this.increase = this.increase.bind(this);
    this.updateCheckIn = this.updateCheckIn.bind(this);
    this.updateCheckOut = this.updateCheckOut.bind(this);
    this.updateNights = this.updateNights.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
  }

  componentDidMount() {
    this.getFirstReservations();
    this.getLocation();
  }

  // requests
  getFirstReservations() {
    $.ajax({
      method: 'GET',
      url: './reservations',
      data: { id: focalId },
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getLocation() {
    $.ajax({
      method: 'GET',
      url: '/location',
      data: { id: focalId },
      success: (data) => {
        console.log(data);
        this.setState({
          locationId: data[0].id,
          rate: data[0].rate,
          review_avg: data[0].review_avg,
          total_review: data[0].total_review,
          service_fee: data[0].service_fee,
          occupancy_tax: data[0].occupancy_tax
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // sub component helper functions
  increase(event) {
    const { name } = event.target;
    let newState = this.state[name] + 1;
    this.setState({
      [name]: newState
    });
    console.log('increase');
  }

  decrease(event) {
    const { name } = event.target;
    if (this.state[name] > 0) {
      let newState = this.state[name] - 1;
      this.setState({
        [name]: newState
      });
    }
    console.log('decreased');
  }

  calendarPopUp() {
    this.setState({
      calendarOpen: !this.state.calendarOpen
    });
  }

  guestPopUp() {
    this.setState({
      guestsOpen: !this.state.guestsOpen
    });
  }

  updateCheckIn(date){
    this.setState({
      checkIn: date
    })
  }

  updateCheckOut(date){
    this.setState({
      checkOut: date
    })
  }

  updateNights(){
    var momentIn = moment(this.state.checkIn, 'MM.DD.YYYY');
    var momentOut = moment(this.state.checkOut, 'MM.DD.YYYY');
    var difference = momentOut.diff(momentIn, 'days')
    console.log(difference);

    this.setState({
      nights: difference
    });
  }

  updateTotal(){
    this.setState({
      totalPrice: (this.state.service_fee + this.state.occupancy_tax + (this.state.nights * this.state.rate))
    });
  }

  render() {
    return (
      <AppWrapper>
        <RateReview
          rate={this.state.rate}
          avg={this.state.review_avg}
          total={this.state.total_review}
        />
        <hr />
        <div  onClick={this.calendarPopUp}><span>{this.state.checkIn}</span> --> <span>{this.state.checkOut}</span></div>
        {this.state.calendarOpen ? <Calendar updateCheckIn={this.updateCheckIn} updateCheckOut={this.updateCheckOut} updateNights={this.updateNights} updateTotal={this.updateTotal}/> : null}
        <hr />
        <div onClick={this.guestPopUp}>Guests</div>
        <div>{this.state.adults + this.state.infants + this.state.children} guest(s)</div>
          {this.state.guestsOpen ? <Guests increase={this.increase} decrease={this.decrease} adults={this.state.adults} children={this.state.children} infants={this.state.infants}/> : null}
        <hr />
        {this.state.checkIn !== 'Check-in' && this.state.checkOut !== 'Checkout' ? <Pricing
          rate={this.state.rate}
          service={this.state.service_fee}
          occupancy={this.state.occupancy_tax}
          nights={this.state.nights}
        /> : null}
        <Reserve onClick={() => {console.log('hi'); }}>Reserve
        </Reserve>
      </AppWrapper>
    );
  }
}

export default App;
