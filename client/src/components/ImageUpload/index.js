import React, { useEffect } from "react";
import { CloudinaryContext } from "cloudinary-react";
import { openUploadWidget } from "../../utils/CloudinaryService";
import "../../index.css";

import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PRODUCT } from "../../utils/mutations";
// import { Button, Container } from "react-bootstrap";

function ImageUpload(props) {

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  let uploadComplete = 0;

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "toomanyphotos",
      // tags: [tag],
      sources: ["local"],
      uploadPreset: "tficxpf5",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "close" && uploadComplete === 1) {
          window.location.replace("/product/" + props.id);
        }
        if (photos.event === "success") {

          const baseURL =
            "https://res.cloudinary.com/toomanyphotos/image/upload/";
          uploadComplete = 1;

          updateProduct({
            variables: {
              _id: props.id,
              image: baseURL + photos.info.public_id + "." + photos.info.format,
            },
          });
        }
      } else {
        console.log("Photo upload error! Specific details can be found below.");
        console.log(error);
      }
    });
  };

  useEffect(() => {

    if (props.submit == 1) {
      beginUpload();
    }
  }, [props]);

  return (
    <CloudinaryContext cloudName="toomanyphotos">

    </CloudinaryContext>
  );
}

export default ImageUpload;
