/* eslint-disable react/prop-types */
import React from 'react';
import styled from './Styles.jsx';

// const focalId = 7;

const { BoxInv, Info } = styled;

const Pricing = ({
  rate, service, occupancy, nights
}) => (
  <BoxInv>
    <Info>
      <div>
        {`$${rate} x ${nights} nights`}
      </div>
      <div>
        {rate * nights}
      </div>
    </Info>
    <hr />
    <Info>
      <div>Service Fee</div>
      <div>{service}</div>
    </Info>
    <hr />
    <Info>
      <div> Occupancy taxes and fees</div>
      <div> {occupancy} </div>
    </Info>
    <hr />
    <Info>
      <div> Total </div>
      <div> {rate * nights + occupancy + service} </div>
    </Info>
  </BoxInv>
);

export default Pricing;
