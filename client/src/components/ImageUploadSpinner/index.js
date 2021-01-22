import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons'


const ImageUploadSpinner = () => {
  return (
    <div className='spinner fadein'>
      <FontAwesomeIcon icon={faBowlingBall} size='5x' color='#3B5998' />
    </div>
  );
};

export default ImageUploadSpinner;
