import React, { Component } from "react";
import css from './Modal.module.css';

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
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { picture, isOpen } = this.props;

    return (
      <div className={`${css.Overlay} ${isOpen ? "open" : ""}`}>
        <div className={css.Modal}>
          <img src={picture.largeImageURL} alt={picture.tags} />
        </div>
      </div>
    );
  }
}
