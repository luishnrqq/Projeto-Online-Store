import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addProducts } from '../components/Functions';
import Avaliacao from '../components/Avaliacao';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
      email: '',
      productRate: '',
      rating: '',
      avaliations: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetch(`https://api.mercadolibre.com/items/${id}`)
      .then((response) => response.json())
      .then((data) => this.setState({
        product: data,
      }));
    this.recebeLocalStorage();
  }

  clickToSave = () => {
    const { product } = this.state;
    const { title, thumbnail, price, id } = product;
    addProducts({
      ProductsId: id,
      ProductsPrice: price,
      ProductsName: title,
      ProductsImg: thumbnail });
  }

  submitAvaliation = (event) => {
    event.preventDefault();
    const {
      email,
      productRate,
      rating,
    } = this.state;
    const rate = { email, productRate, rating };
    this.setState(({ avaliations }) => (
      { avaliations: [...avaliations, rate] }
    ), this.saveLocalStorage);
  }

  saveLocalStorage = () => {
    const { avaliations } = this.state;
    localStorage.setItem('avaliacoes', JSON.stringify(avaliations));
  }

  recebeLocalStorage = () => {
    const getFromStorage = JSON.parse(localStorage.getItem('avaliacoes'));
    if (!getFromStorage || (getFromStorage.lenght === 0)) {
      this.saveLocalStorage();
    } else {
      this.setState({ avaliations: getFromStorage });
      localStorage.setItem('avaliacoes', [JSON.stringify(getFromStorage)]);
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { product, avaliations } = this.state;
    const { title, thumbnail, price, attributes } = product;
    const { email, productRate } = this.props;
    return (
      <section>
        <p data-testid="product-detail-name">{ title }</p>
        <p>
          R$
          { price }
        </p>
        <img src={ thumbnail } alt="product-name" />
        <section>
          <p>Especificações Técnicas</p>
          {attributes
          && attributes.map((atributos) => (
            <div key={ atributos.id }>
              <span>{`${atributos.name}:${atributos.value_name}`}</span>
            </div>
          ))}
        </section>
        <Link
          to="/ShoppingCart"
          data-testid="shopping-cart-button"
        >
          <span role="img" aria-label="emojiCarrinho">🛒</span>
        </Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.clickToSave }
        >
          Add ao Carrinho
        </button>
        <section>
          <form className="avaliacao">
            <label htmlFor="email-input">
              <h3>Avaliações</h3>
              <input
                data-testid="product-detail-email"
                type="email"
                name="email"
                id="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="check-boexes">
              1
              <input
                data-testid="1-rating"
                type="radio"
                name="rating"
                value="1"
                onClick={ this.handleChange }
              />
              2
              <input
                data-testid="2-rating"
                type="radio"
                name="rating"
                value="2"
                onClick={ this.handleChange }
              />
              3
              <input
                data-testid="3-rating"
                type="radio"
                name="rating"
                value="3"
                onClick={ this.handleChange }
              />
              4
              <input
                data-testid="4-rating"
                type="radio"
                name="rating"
                value="4"
                onClick={ this.handleChange }
              />
              5
              <input
                data-testid="5-rating"
                type="radio"
                name="rating"
                value="5"
                onClick={ this.handleChange }
              />
            </label>
            <label htmlFor="message-input">
              <textarea
                name="productRate"
                id="productRate"
                value={ productRate }
                data-testid="product-detail-evaluation"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.submitAvaliation }
            >
              Avaliar
            </button>
          </form>
        </section>
        <section className="todas-avaliacoes">
          {avaliations
            .map((rating) => (
              <Avaliacao
                key={ rating.productRate }
                email={ rating.email }
                productRate={ rating.productRate }
                rating={ rating.rating }
              />
            ))}
        </section>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.number),
  }).isRequired,
  email: PropTypes.string.isRequired,
  productRate: PropTypes.string.isRequired,
};

export default ProductDetails;
