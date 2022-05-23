import React from 'react';
import PropTypes from 'prop-types';

class Avaliacao extends React.Component {
  render() {
    const { email, productRate, rating } = this.props;
    return (
      <div className="comentario-produto">
        <h2>{ email }</h2>
        <p>{ rating }</p>
        <p>{ productRate }</p>
      </div>
    );
  }
}

Avaliacao.propTypes = {
  email: PropTypes.string.isRequired,
  productRate: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};

export default Avaliacao;
