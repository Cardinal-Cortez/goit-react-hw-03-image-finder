import React, { Component } from "react";
import css from './Button.module.css';

export class ButtonLoadMore extends Component {
    handleLoadMore = () => {
    this.props.onLoadMore();
  };

  render() {
    return (
      <button onClick={this.handleLoadMore} className={css.Button}>
        Load more
      </button>
    );
  }
}
