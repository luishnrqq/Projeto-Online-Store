import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './Product.module.css';
import { addProducts } from './Functions';

class Product extends React.Component {
  clickToSave = () => {
    const { product } = this.props;
    const { title, thumbnail, price, id } = product;
    addProducts({
      ProductsId: id,
      ProductsPrice: price,
      ProductsName: title,
      ProductsImg: thumbnail });
  }

  render() {
    const { product } = this.props;
    const { title, price, thumbnail, id } = product;

    return (
      <section className={ style.product }>
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <div id={ id } data-testid="product">
            <h3>{ title }</h3>
            <img src={ thumbnail } alt="prduct" />
            <p>{ price }</p>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.clickToSave }
        >
          Add ao Carrinho
        </button>
      </section>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default Product;
