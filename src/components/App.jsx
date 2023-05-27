import React, { Component } from "react";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import css from './App.module.css'

export class App extends Component {

  state = {
    search: '',
  }

  handleFormSubmit = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery search={search} />
      </div>
    );
  }
}
