import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    console.log('StockContainer Props', this.props)
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.displayStocks.map((stock, index) => <Stock stock={stock} key={index} 
        buyStock={this.props.buyStock}
        />)}
      </div>
    );
  }

}

export default StockContainer;
