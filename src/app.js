import React from 'react';

class App extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    wineItems:[]
  }
}

componentDidMount() {

  fetch('https://www.wsjwine.com/api/offer/0033008')
  .then(results => results.json())
  .then(data => 
    this.setState({
      wineItems : data,
    })
  )
}

  render() {
    return(
      <div>
       <div> Hello from app </div>
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