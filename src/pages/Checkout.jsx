import React from 'react';
import { getProducts } from '../components/Functions';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      returnProducts: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('addProductCart')) {
      this.recoverProducts();
    }
  }

  recoverProducts = () => {
    const products = getProducts();
    products.forEach((id) => {
      fetch(`https://api.mercadolibre.com/items/${id}`)
        .then((response) => response.json())
        .then((data) => this.setState((prevState) => ({
          returnProducts: [...prevState.returnProducts, data],
        })));
    });
  }

  render() {
    const { returnProducts } = this.state;

    return (
      <section>
        <section>
          <p>Revise seus Produtos</p>
          { returnProducts.map(({ title, thumbnail, price }) => (
            <div key={ title }>
              <img src={ thumbnail } alt={ title } />
              <p>{ title }</p>
              <p>{ price }</p>
            </div>
          )) }
          <p>Total:</p>
        </section>
        <section>
          <p>Informações do Comprador</p>
          <form>
            <label htmlFor="fullName">
              <input
                id="fullName"
                data-testid="checkout-fullname"
                type="text"
                placeholder="Nome Completo"
              />
            </label>
            <label htmlFor="email">
              <input
                id="email"
                data-testid="checkout-email"
                type="text"
                placeholder="Email"
              />
            </label>
            <label htmlFor="cpf">
              <input
                id="cpf"
                data-testid="checkout-cpf"
                type="text"
                placeholder="CPF"
              />
            </label>
            <label htmlFor="phone">
              <input
                id="phone"
                data-testid="checkout-phone"
                type="text"
                placeholder="Telefone"
              />
            </label>
            <label htmlFor="cep">
              <input
                id="cep"
                data-testid="checkout-cep"
                type="text"
                placeholder="CEP"
              />
            </label>
            <label htmlFor="address">
              <input
                id="address"
                data-testid="checkout-address"
                type="text"
                placeholder="Endereço"
              />
            </label>
            <label htmlFor="complement">
              <input
                id="complement"
                type="text"
                placeholder="Complemento"
              />
            </label>
            <label htmlFor="number">
              <input
                id="number"
                type="text"
                placeholder="Número"
              />
            </label>
            <label htmlFor="city">
              <input
                id="city"
                type="text"
                placeholder="Cidade"
              />
            </label>
            <label htmlFor="state">
              <input
                id="state"
                type="text"
                placeholder="Estado"
              />
            </label>
          </form>
        </section>
        <section>
          <p>Método de Pagamento</p>
          <label htmlFor="ticket">
            <input id="ticket" type="radio" />
            Boleto
          </label>
          <p>Cartão de Crédito</p>
          <label htmlFor="card">
            <input id="card" type="radio" />
            Visa
          </label>
          <label htmlFor="card">
            <input id="card" type="radio" />
            MasterCard
          </label>
          <label htmlFor="card">
            <input id="card" type="radio" />
            Elo
          </label>
        </section>
        <button type="button">Comprar</button>
      </section>
    );
  }
}

export default Checkout;
