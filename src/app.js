import React from 'react';
import WineProductListing from './wineProductListing';

class App extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    wineItems:[],
    zipcode: '',
    zipReturn: {},
    stateCode:''
  }

  this.handleChange = this.handleChange.bind(this);
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

handleChange(event){
  let value = event.target.value;
  this.setState({zipcode: value}, () =>
  fetch('https://www.wsjwine.com/api/address/zipcode/'+this.state.zipcode)
  .then(results => results.json())
  .then(data =>
  this.setState({
    zipReturn: data.response,
    stateCode: data.response.stateCode
  }))
  );
  console.log('https://www.wsjwine.com/api/address/zipcode/'+this.state.zipcode)
}

  render() {
    const state = this.state.stateCode
      let message;

      if (state === "CT"){
        message = <h1>MESSAGE</h1>
      } else {
        message
      }
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
       <h1>State Selector</h1>
       to test: 06850, 12345
       <form>
          <label>Zip
          <input type="text" value={this.state.zipcode} onChange={this.handleChange} />
          {this.state.zipReturn.city},  {this.state.zipReturn.stateCode}
          
          </label>
          {message}
       </form>
       <pre>
        <code>
          {JSON.stringify(this.state.zipReturn, null, 4)}
          {JSON.stringify(this.state.zipcode, null, 4)}
          </code>
        </pre>
        
      </div>
    );
  }
}

export default App