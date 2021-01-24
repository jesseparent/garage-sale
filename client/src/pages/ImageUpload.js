import React, { Component } from 'react'
import Spinner from '../components/ImageUploadSpinner'
import Images from '../components/ImageUploadShowImage'
import Buttons from '../components/ImageUploadButtons'
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