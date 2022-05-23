import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchProducts from '../components/SearchProducts';
import SideBar from '../components/SideBar';
import style from './Search.module.css';

class Search extends React.Component {
  render() {
    return (
      <section className={ style.search }>
        <section className="products">
          <SideBar
            { ...this.props }
          />
          <SearchProducts
            { ...this.props }
          />
          <Link
            to="/ShoppingCart"
            data-testid="shopping-cart-button"
          >
            <span role="img" aria-label="emojiCarrinho">🛒</span>
          </Link>
        </section>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </section>
    );
  }
}

Search.propTypes = {
  CategoryId: PropTypes.string.isRequired,
};

export default Search;
