import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.CategoriApi();
  }

  CategoriApi = () => {
    getCategories().then((data) => {
      this.setState({
        categories: [...data],
      });
    });
  }

  render() {
    const { categories } = this.state;
    const { getCategoryId } = this.props;
    return (
      <aside>
        { categories.map((Category) => (
          <div
            key={ Category.id }
          >
            <label
              htmlFor={ Category.name }
            >
              <input
                type="radio"
                name="CategoryId"
                value={ Category.id }
                id={ Category.name }
                data-testid="category"
                onClick={ getCategoryId }
              />
              {Category.name}
            </label>
            <br />
          </div>
        ))}
      </aside>
    );
  }
}

SideBar.propTypes = {
  getCategoryId: PropTypes.func.isRequired,
};
