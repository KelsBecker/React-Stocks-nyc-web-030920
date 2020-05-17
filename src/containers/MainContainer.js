import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    displayStocks: [],
    portfolioStocks: [],
    sortType: '',
    filterValue: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(response => response.json())
    .then(data => this.setState({
      stocks: data,
      displayStocks: data
    }))
  }

  buyStock = (stock) => {
    if (!this.state.portfolioStocks.includes(stock)){
      this.setState({
        portfolioStocks:[...this.state.portfolioStocks, stock]
      })
    }
  }

  sellStock = (stock) => {
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(currentStock => currentStock !== stock)
    })
  }


  sortStocks = (event) => {
    let sortedStocks = [...this.state.displayStocks]
    if (event === 'Alphabetically') {
      sortedStocks.sort((a,b) => (a.ticker > b.ticker) ? 1 : -1)
    } else if (event === 'Price') {
      sortedStocks.sort((a,b) => (a.price > b.price) ? 1 : -1)
    }
    this.setState({
      displayStocks: sortedStocks,
      sortType: event
    })
  }

  filterStocks = (event) => {
    let filteredStocks = [...this.state.stocks]
    if (event !== 'All') {
      this.setState({
        displayStocks: filteredStocks.filter(stock => stock.type === event)
      })
    } else {
      this.setState({
        displayStocks: filteredStocks
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <SearchBar 
        sortStocks={this.sortStocks} 
        sortType={this.state.sortType}
        filterStocks={this.filterStocks}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
              displayStocks={this.state.displayStocks} 
              buyStock={this.buyStock}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer   
              portfolioStocks={this.state.portfolioStocks}
              sellStock={this.sellStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
