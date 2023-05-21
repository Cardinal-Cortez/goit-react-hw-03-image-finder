import React, { Component } from "react"
import { ImageGalleryItem } from "components/ImageGalleryItem";
import { Loader } from "components/Loader";

export class ImageGallery extends Component {
    state = {
        pictures: null,
        error: null,
        status: 'idle'
    }
    componentDidMount() {
        if (this.props.search) {
            this.setState({ status: 'pending'});
            fetch(`https://pixabay.com/api/?q=${this.props.search}&page=1&key=35198425-4c40430781db1dbcd425bce9c&image_type=photo&orientation=horizontal&per_page=12`)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(new Error(`Not found image ${this.props.search}`))
                })
                .then((data) => this.setState({ pictures: data.hits, status: 'resolved' }))
                .catch((error) => this.setState({ error, status: 'rejected' }));
        };
    };

    render() {
        const { pictures, error, status } = this.state;

        if (status === 'idle') {
            return <h1>Pleace, read text</h1>
        }
        if (status === 'pending') {
            return <Loader />
        }
        if (status === 'rejected') {
            return alert(error.message)
        }
        if (status === 'resolved') {
            return ( 
                < ul className="gallery" >
                    {pictures.hits.map((picture) => (
                        <ImageGalleryItem key={picture.id} picture={picture} />
                    ))}
            </ul>
        );
        }
        
    }
};


