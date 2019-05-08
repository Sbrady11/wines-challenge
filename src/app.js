import React from 'react';
import WineProductListing from './wineProductListing';
import StateLocationOutput from './stateLocationOutput';

class App extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    wineItems:[],
    zipcode: '',
    zipReturn: {},
    stateCode:'',
    defaultText: 'Enter Zip to populate City and State'
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
    stateCode: data.response.stateCode,
    defaultText: ''
  }))
  );
}

  render() {
    const state = this.state.stateCode;
    const defaultText = this.state.defaultText;
      let message;
      let zipResponse;

      if (state === "CT"){
        message = <p>This is the conditional message that appears if the 
        user has selected a CT zipcode</p>
      } else {
        message
      } 

      if(defaultText === ''){
        zipResponse = <StateLocationOutput city = {this.state.zipReturn.city} stateCode = {this.state.zipReturn.stateCode} />
      } else {
        zipResponse
      }

    return(
      <div>
        <form>
          <div className="title"><span>Step 1</span><div className="section-header">Which Case Would You Like?</div></div>
          <p>Whatever you choose, we'll add in two bonus Cabs and two crystal 
            glasses and you'll have the complete pacakge - worth over $250 - 
            for ONLY $69.99 (plus $19.99 shipping & applicable tax; please allow 
            5-10 days for delivery, depending on shipping state).</p>
          <fieldset>
            {this.state.wineItems.map(item => {
              return(
                <WineProductListing productName = {item.product.name} key={item.product.id} numberOfBottles = {item.product.skus[0].numberOfBottles} price = {item.listPrice} /> 
                  )
            })}
          </fieldset>
        </form>
              
       <form>
        <div className="title"><span>Step 2</span><div className="section-header">State Selector</div></div>
          <label><div className="label-title">ZIP</div>
            <input type="text" value={this.state.zipcode} onChange={this.handleChange} /> <i>{this.state.defaultText}</i>
            <div className="state-response">
              {zipResponse}
            </div>
          </label>
          {message}
       </form> 
      </div>
    );
  }
}

export default App