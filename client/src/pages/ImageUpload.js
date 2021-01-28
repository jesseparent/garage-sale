import React, { useState } from 'react';
import { CloudinaryContext } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "../utils/CloudinaryService";
import '../index.css';

import { useParams } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PRODUCT } from "../utils/mutations";

function ImageUpload(props) {
  const [images, setImages] = useState([])

  const { id } = useParams();

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  let uploadComplete = 0;


  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "toomanyphotos",
      // tags: [tag],
      sources: ['local'],
      uploadPreset: "tficxpf5"
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      

      if (!error) {
        // if (photos.event == "close" && uploadComplete == 1) {
        //   props.history.push('/product/' + id);
        // }

        console.log('!error')
        console.log(photos);

        if (photos.event === 'success') {
          // setImages([...images, photos.info.public_id])

          const baseURL = 'https://res.cloudinary.com/toomanyphotos/image/upload/'
          uploadComplete = 1;

          console.log('uploadcomplete update')   
          console.log(uploadComplete)

          console.log("success")
          console.log(photos)

          // updateProduct({
          //   variables: {
          //     _id: id,
          //     image: baseURL + photos.info.public_id + '.' + photos.info.format,
          //   }
          // });       
         
        }
      } else {
        console.log('Photo upload error! Specific details can be found below.')
        console.log(error);
      }
    })
  }

  return (
    <CloudinaryContext cloudName="toomanyphotos">
      <div>
        <section>
          {/* {images.map(i => <img src={i} alt="" />)} */}
          <button onClick={() => beginUpload()}>Upload Image</button>
        </section>
      </div>

      
    </CloudinaryContext>
  );
}

export default ImageUpload;