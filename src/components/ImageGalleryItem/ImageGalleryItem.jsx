import React, { Component } from "react"
import css from './ImageGalleryItem.module.css'

export class ImageGalleryItem extends Component {

    heandleClick = () => {
        const { picture, onImageClick } = this.props;
        onImageClick(picture);
    };

    render() {
        const { picture } = this.props;
        return (
            
            <li className={css.ImageGalleryItem}>
                <img className={css.ImageGalleryItemImage}
                    src={picture.webformatURL}
                    alt={picture.tags}
                    onClick={this.heandleClick}
                />
            </li>
        );
    }
};
