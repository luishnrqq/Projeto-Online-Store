import React from 'react';
import PropTypes from 'prop-types';
import { removeProduct } from './Functions';

export default class CartProducts extends React.Component {
  constructor() {
    super();

    this.state = {
      ProductsId: 0,
      ProductsQuantity: 1,
      ProductsPrice: 0,
      ProductsName: '',
      ProductsImg: '',
    };
  }

  componentDidMount() {
    this.StateUpdate();
  }

  QuantiUp = () => {
    const { ProductsQuantity } = this.state;
    const plusNewQuanty = ProductsQuantity + 1;
    this.setState({
      ProductsQuantity: plusNewQuanty,
    });
    this.forceUpdate();
  }

  QuantiDown = () => {
    const { ProductsQuantity, ProductsId } = this.state;
    const minusNewQuanty = ProductsQuantity - 1;
    const MINIMUN_PROD_CART = 1;
    const { stateUpdate } = this.props;

    if (ProductsQuantity === MINIMUN_PROD_CART) {
      removeProduct(ProductsId, stateUpdate);
    } else {
      this.setState({
        ProductsQuantity: minusNewQuanty,
      });
    }
  }

  StateUpdate = () => {
    const { ProductsName, ProductsPrice, ProductsImg, ProductsId } = this.props;

    this.setState({
      ProductsName,
      ProductsPrice,
      ProductsImg,
      ProductsId,
    });
  }

  render() {
    const { ProductsQuantity, ProductsName, ProductsPrice,
      ProductsImg, ProductsId } = this.state;
    const { stateUpdate } = this.props;
    return (
      <section>
        <img
          src={ ProductsImg }
          alt="imagem do produto"
        />
        <p data-testid="shopping-cart-product-name">
          {ProductsName}
        </p>
        <p>
          {ProductsPrice}
        </p>

        <button
          type="button"
          onClick={ this.QuantiUp }
          data-testid="product-increase-quantity"
        >
          ➕
        </button>
        <p data-testid="shopping-cart-product-quantity">{ProductsQuantity}</p>
        <button
          type="button"
          onClick={ this.QuantiDown }
          data-testid="product-decrease-quantity"
        >
          ➖
        </button>
        <button
          type="button"
          onClick={ () => removeProduct(ProductsId, stateUpdate) }
        >
          ✖️
        </button>
      </section>
    );
  }
}

CartProducts.propTypes = {
  ProductsName: PropTypes.string.isRequired,
  ProductsPrice: PropTypes.number.isRequired,
  ProductsImg: PropTypes.string.isRequired,
  ProductsId: PropTypes.string.isRequired,
  stateUpdate: PropTypes.func.isRequired,
};
