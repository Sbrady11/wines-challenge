import React from 'react';

const WineProductListing = props => {
  return(
    <div>
    <h2>{props.productName}</h2>
    <h2>{props.numberOfBottles}</h2>
    <h2>{props.price}</h2>
    </div>
  )
}

export default WineProductListing;