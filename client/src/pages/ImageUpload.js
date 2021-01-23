import React, { Component } from 'react'
import Spinner from '../components/ImageUploadSpinner'
// import Images from '../components/ImageUploadShowImage'
// import Buttons from '../components/ImageUploadButtons'
import { API_URL } from '../config'
import '../imageUpload.css'

export default class App extends Component {
  
  state = {
    uploading: false,
    images: []
  }

  onChange = e => {
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })

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
      console.log(images[0].public_id);
      console.log(images[0].format);

      // set globalstate here



      this.setState({ 
        uploading: false,
        images
      })
    })
  }

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    })
  }
  
  render() {
    const { uploading, images } = this.state

    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          // console.log(images);
          return <Images images={images} removeImage={this.removeImage} />
        default:
          return <Buttons onChange={this.onChange} />
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
}



import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons'


const ImageUploadButtons = (props) => {
  return (
    <div className='buttons fadein'>
      <div className='button'>
        <label htmlFor='single'>
          <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />
        </label>
        <input type='file' id='single' onChange={props.onChange} />
      </div>

      <div className='button'>
        <label htmlFor='multi'>
          <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' />
        </label>
        <input type='file' id='multi' onChange={props.onChange} multiple />
      </div>
    </div>
  );
};

export default ImageUploadButtons;
