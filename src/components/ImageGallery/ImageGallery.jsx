import React, { Component } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem";
import { Loader } from "components/Loader";
import { Modal } from "components/Modal";
import { ButtonLoadMore } from "components/Button";
import PropTypes from "prop-types";
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    error: null,
    status: 'idle',
    selectedPicture: null,
    page: 1,
    loading: false
  };

  componentDidMount() {
    this.fetchPictures();
  }
  
componentDidUpdate(prevProps, prevState) {
  if (prevProps.search !== this.props.search) {
    this.setState(
      {
        pictures: [],
        page: 1,
        status: 'pending' 
      },
      () => {
        this.fetchPictures();
      }
    );
  } else if (prevState.page !== this.state.page) {
    this.fetchPictures();
  }
}


  fetchPictures() {
    const { search } = this.props;
    const { page } = this.state;

      if (search) {
      const url = `https://pixabay.com/api/?q=${search}&page=${page}&key=35198425-4c40430781db1dbcd425bce9c&image_type=photo&orientation=horizontal&per_page=12`;
      
    this.setState({ loading: true });
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`Not found image ${search}`);
        })
        .then((data) => {
          this.setState((prevState) => ({
              pictures: [...prevState.pictures, ...data.hits],
              totalImages: data.total,
            status: 'resolved'
          }), () => {
            if (page > 1) {
              const galleryEl = document.querySelector(`.${css.imageGallery}`);
              if (galleryEl) {
                const { height: cardHeight } = galleryEl.getBoundingClientRect();
                window.scrollBy({
                  top: cardHeight * 2,
                  behavior: 'smooth'
                });
              }
            }
          });
        })
        .catch((error) => this.setState({ error, status: 'rejected' }))
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handleImageClick = (picture) => {
    this.setState({ selectedPicture: picture });
  };

  handleCloseModal = () => {
    this.setState({ selectedPicture: null });
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        status: 'pending',
        loading: true 
      }),

    );
  };

  render() {
    const { pictures, error, status, selectedPicture, loading } = this.state;

    if (status === 'idle') {
      return (
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>
          Please, read text
        </h1>
      );
    }
    if (status === 'pending' && pictures.length === 0) {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }
    if (status === 'resolved') {
      return (
          <div>
            {loading && <Loader />}
          <ul className={css.imageGallery}>
            {pictures.map((picture) => (
              <ImageGalleryItem
                key={picture.id}
                picture={picture}
                onImageClick={this.handleImageClick}
              />
            ))}
          </ul>
              
          {selectedPicture && (
            <Modal
              picture={selectedPicture}
              isOpen={true}
              onClose={this.handleCloseModal}
            />
          )}
          
          <ButtonLoadMore onLoadMore={this.handleLoadMore} />
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
    search: PropTypes.string.isRequired,
  };
