import React, { Component } from "react"

export class ImageGalleryItem extends Component {
    render() {
        const {picture} = this.props
        return (
            <li className="gallery-item">
                <img src={picture.webformatURL} alt={picture.tags} />
            </li>
        );
    }
};
