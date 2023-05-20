import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ urlPhoto, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);
  });

  const hendleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const hendleBeckdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={hendleBeckdropClick}>
      <div className={css.Modal}>
        <img src={urlPhoto.url} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  urlPhoto: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};
