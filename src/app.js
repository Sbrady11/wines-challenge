import React from 'react';
import WineProductListing from './wineProductListing';

class App extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    wineItems:[],
    state: ''
  }
}

componentDidMount() {
  fetch('https://www.wsjwine.com/api/offer/0033008')
  .then(results => results.json())
  .then(data => 
    this.setState({
      wineItems : data.response.mainItems,
    })
  )
}

  render() {
    return(
      <div>
       {this.state.wineItems.map(item => {
         return(
           <WineProductListing
              productName = {item.product.name}
              key={item.product.id}
              numberOfBottles = {item.product.skus[0].numberOfBottles}
              price = {item.listPrice} />
         )
       })}
       <pre>
        <code>
          {JSON.stringify(this.state, null, 4)}
          </code>
        </pre>
        
      </div>
    );
  }
}

export default App