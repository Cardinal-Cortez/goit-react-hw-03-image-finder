import React, { Component } from "react"


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
        this.setState({ search: "" });
    }
    render() {
        
        return (
            <header className="searchbar">
                <form className="form" onSubmit={this.handleSubmit}>
                    <button type="submit" className="button">
                        <span className="button-label">Search</span>
                    </button>
                    <input
                        className="input"
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
