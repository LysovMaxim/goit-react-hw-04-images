import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';
import css from './App.module.css';

export const App = () => {
  const [pictureName, setPictureName] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [showeModal, setShoweModal] = useState(false);
  const [urlPicture, setUrlPicture] = useState('');

  const hendleSubmit = event => {
    event.preventDefault();
    const value = event.currentTarget.elements.pictureName.value;
    if (value.trim() === '') {
      alert('Enter the title');
      return;
    }
    if (value === pictureName) {
      alert(`You have already entered the word ${value}`);
      return;
    }
    setPictureName(value.toLowerCase());
    setPictures([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(() => page + 1);
  };

  const onModal = url => {
    setShoweModal(!showeModal);
    setUrlPicture(url);
  };

  useEffect(() => {
    if (!pictureName) {
      return;
    }
    setStatus('pending');
    fetch(
      `https://pixabay.com/api/?q=${pictureName}&page=${page}&key=34851334-286cf58f2651b78053c9b207d&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(picture => {
        setPictures(prevState => [...prevState, ...picture.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [pictureName, page]);

  return (
    <div className={css.App}>
      {status === 'rejected' && <h1>{error.message}</h1>}
      <Searchbar onSubmit={hendleSubmit} />
      <ImageGallery pictures={pictures} onModal={onModal} />
      {showeModal && <Modal onClose={onModal} urlPhoto={urlPicture} />}

      {status === 'pending' && <Loader />}
      {pictures.length >= 12 && <Button onClick={onLoadMore} />}
    </div>
  );
};
