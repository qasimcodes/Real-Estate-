import React, {useState, useCallback} from 'react';
import {useParams} from "react-router-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from 'react-images';

const ImageGallery = ({photos}) => {
  /* state */
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] =  useState(false);
  /* hook */
  const params = useParams();

const openLightbox = useCallback((event, {photo, index}) => {
  setCurrent(index);
  setIsOpen(true);
}, []);

const closeLightbox = () => {
  setCurrent(0);
  setIsOpen(false);
}


  return (
    <> 
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
          {isOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel curretnIndex={current} views={photos.map((p) => ({
                ...p, 
                srcset: p.srcSet,
                caption: p.title
                }))} />
            </Modal>
          ): null}
      </ModalGateway>
    </>
  )
}

export default ImageGallery
