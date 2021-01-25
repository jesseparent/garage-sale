import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Spinner from '../components/ImageUploadSpinner'
import Images from '../components/ImageUploadShowImage'
import Buttons from '../components/ImageUploadButtons'
import { API_URL } from '../config'
import '../imageUpload.css'

import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PRODUCT } from "../utils/mutations";

function ImageUpload() {

  const [imageState, setImageState] = useState({
    uploading: false,
    images: []
  })

  const { id } = useParams();

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const onChange = e => {
    console.log(imageState)
    const files = Array.from(e.target.files)
    setImageState({ uploading: true })

    const formData = new FormData()

    // console.log(e.target.files[0].name)
    files.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch(`${API_URL}/image-upload`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(images => {

        // https://res.cloudinary.com/toomanyphotos/image/upload/
        // filename and format from cloudinary
        const baseURL = 'https://res.cloudinary.com/toomanyphotos/image/upload/'

        // console.log(images[0].public_id);
        // console.log(images[0].format);

        // set globalstate here

        // console.log('this is the passed id from the url')
        // console.log(id)

        updateProduct({
          variables: {
            _id: id,
            image: baseURL + images[0].public_id + '.' + images[0].format,
          }
        });

        setImageState({
          uploading: false,
          images: images
        })

        console.log('successfully uploaded')
      })
  }

  const removeImage = id => {
    setImageState({
      images: this.state.images.filter(image => image.public_id !== id)
    })
  }

  const content = () => {
    switch (true) {
      case imageState.uploading:
        return <Spinner />
      case imageState.images.length > 0:

        // console.log(images);
        return <Images images={imageState.images} removeImage={removeImage} />
      default:
        return <Buttons onChange={onChange} />
    }
  }

  return (
    <div>
      <div className='buttons'>
        {content()}
      </div>
    </div>
  )

}

export default ImageUpload;