import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'


const baseUrl = 'https://res.cloudinary.com/toomanyphotos/image/upload/'
const imgFileName = 'zudjnabovuixrkkeym0r.jpg'

const GetImage = () => {
  return (
    // props.images.map((image, i) =>
    <div className='fadein'>
      <div 
        // onClick={() => props.removeImage(image.public_id)} 
        // className='delete'
      >
        <FontAwesomeIcon icon={faTimesCircle} size='2x' />
      </div>
      <img src={baseUrl + imgFileName} alt='' />
    </div>
  // )
  );
};

export default GetImage;