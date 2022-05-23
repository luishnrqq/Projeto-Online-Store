import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      CategoryId: '',
    };
  }

  getCategoryId = ({ target }) => {
    this.setState({
      CategoryId: target.value,
    });
    console.log(target);
  };

  render() {
    const { CategoryId } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Search
                { ...props }
                CategoryId={ CategoryId }
                getCategoryId={ this.getCategoryId }
              />
            ) }
          />

          <Route exact path="/ShoppingCart" component={ ShoppingCart } />
          <Route exact path="/product/:id" component={ ProductDetails } />
          <Route exact path="/Checkout" component={ Checkout } />
        </Switch>
      </BrowserRouter>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default App;
