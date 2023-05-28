import React, { Component } from "react"
import css from './Searchbar.module.css';
import PropTypes from "prop-types";

export class Searchbar extends Component{
    state = {
        search: "",
    }
    handleQueryChange = (e) => {
        this.setState({ search: e.currentTarget.value.toLowerCase() });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.search.trim() === '') return
        this.props.onSubmit(this.state.search);
        // this.setState({ search: "" });
    }
    render() {
        
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>
                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="search"
                        onChange={this.handleQueryChange}
                        value={this.state.search}
                    />
                </form>
            </header>
        );
    }
};
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };