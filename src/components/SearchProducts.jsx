import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Product from './Product';
import style from './SearchProducts.module.css';

class SearchProducts extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.showProduct = this.showProduct.bind(this);

    this.state = {
      responseAPI: [],
      searchInput: '',
      id: '',
    };
  }

  componentDidUpdate() {
    const { CategoryId } = this.props;
    const { id } = this.state;

    if (id !== CategoryId) {
      this.UpdadeID();
    }
  }

  handleChange({ target }) {
    this.setState({
      searchInput: target.value,
    });
  }

  UpdadeID = () => {
    const { CategoryId } = this.props;
    this.setState({
      id: CategoryId,
    }, () => this.showProduct());
  }

  showProduct() {
    const { id, searchInput } = this.state;

    getProductsFromCategoryAndQuery(id, searchInput).then((response) => {
      this.setState({
        responseAPI: [...response.results],
      });
    });
  }

  render() {
    const { responseAPI, searchInput } = this.state;
    return (
      <section className={ style.searchProducts }>
        <label htmlFor="text-input">
          <input
            id="text-input"
            data-testid="query-input"
            type="text"
            value={ searchInput }
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" data-testid="query-button" onClick={ this.showProduct }>
          Pesquisar
        </button>
        {responseAPI.map((product) => (
          <Product key={ product.id } product={ product } data-testid="product" />
        ))}
      </section>
    );
  }
}

SearchProducts.propTypes = {
  CategoryId: PropTypes.string.isRequired,
};

export default SearchProducts;
