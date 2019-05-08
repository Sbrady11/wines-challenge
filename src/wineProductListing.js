import React from 'react';

const WineProductListing = props => {
  return(
    <div>
    <input type="radio" />
    <b>{props.productName}</b> + 2 Bonus Bottles & Glasses <b> JUST ${props.price} </b>
    <p>As requested in spec, #of bottles returned from API: {props.numberOfBottles}</p>
    </div>
  )
}

export default WineProductListing;