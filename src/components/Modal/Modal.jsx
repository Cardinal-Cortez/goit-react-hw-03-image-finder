import React, { Component } from "react";
import css from './Modal.module.css';
import PropTypes from "prop-types";

export class Modal extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    document.addEventListener('keyup', this.onCloseModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onCloseModal);
  }

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  onCloseModal = (event) => {
    if (event.code === 'Escape'|| event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { picture, isOpen } = this.props;

    return (
      <div className={`${css.Overlay} ${isOpen ? "open" : ""}`}
      onClick={this.onCloseModal}>
        <div className={css.Modal}>
          <img src={picture.largeImageURL} alt={picture.tags} />
        </div>
      </div>
    );
  }
}

  Modal.propTypes = {
    picture: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  };