import React from 'react';
import { Redirect } from 'react-router-dom';
import { getProducts } from '../components/Functions';
import CartProducts from '../components/CartProduct';

class ShoppingCart extends React.Component {
  constructor() {
    super();

    this.state = {
      Valortotal: 0,
      returnProducts: [],
      redirect: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('addProductCart')) {
      this.recoverProducts();
    }
  }

  recoverProducts = () => {
    const products = getProducts();

    this.setState({
      returnProducts: products,
    });
  }

  handleClick = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { returnProducts, Valortotal, redirect } = this.state;
    const ProductCheck = returnProducts.length > 0;

    if (redirect) {
      return <Redirect to="/Checkout" />;
    }
    return (
      <section>
        {ProductCheck
          ? (
            <div>
              <p>Produtos no Carrinho</p>
              { returnProducts.map((prod) => (<CartProducts
                key={ prod.ProductsId }
                ProductsName={ prod.ProductsName }
                ProductsPrice={ prod.ProductsPrice }
                ProductsImg={ prod.ProductsImg }
                ProductsId={ prod.ProductsId }
                stateUpdate={ this.recoverProducts }
              />
              )) }
              <p>
                {`Valor total: ${Valortotal} `}
              </p>
            </div>
          )
          : (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>
          )}
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.handleClick }
        >
          Finalizar Compra
        </button>
      </section>
    );
  }
}

export default ShoppingCart;
