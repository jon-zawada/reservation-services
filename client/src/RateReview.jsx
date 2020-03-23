/* eslint-disable react/prop-types */
import React from 'react';
import styled from './Styles.jsx';
import star from './pics/star.svg';

const { Price, Star } = styled;

const RateReview = ({ rate, avg, total }) => (
  <div>
    <div id="rate">
      <Price>{`$${rate}`}</Price>
      <span> per night</span>
    </div>
    <div id="reviews">
      <Star src={star} />
      {`${avg}(${total} reviews)`}
    </div>
  </div>
);

export default RateReview;
