import axios from "axios";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Container } from "reactstrap";
import "./UploadMultiImage.css";

interface Props {
  apiKey: string;
  cloudName: string;
  presetname: string;
}

const UploadMultiImage = (props: Props) => {
  const { apiKey, cloudName, presetname } = props;

  const [image, setImage] = useState({ array: [] } as any);
  const [loading, setLoading] = useState(false);

  const imagePreview = () => {
    // if (image[0]?.array?.length !== 0) {
    //   console.log(image[0]?.array);
    // }

    return (
      <div>
        {image[0]?.array?.length !== 0 &&
          image[0]?.array?.map((url: string, index: number) => {
            return (
              <img
                key={index}
                src={url}
                alt={`image ${index}`}
                style={{ maxWidth: "125px" }}
              />
            );
          })}
      </div>
    );
  };

  const handleOnDrop = (files: any) => {
    const uploaders = files.map((file: any) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", presetname);
      formData.append("api_key", apiKey);
      setLoading(true);
      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        )
        .then((rs) => {
          const data = rs.data;
          //   console.log(data);

          const fileUrl = data.secure_url;
          //   console.log(fileUrl);

          let spectificArrayObject = image.array;
          spectificArrayObject.push(fileUrl);
          const newObj = [...[image], spectificArrayObject];

          setImage(newObj);
        })
        .catch((error) => {
          console.log("Upload image failed", error.message);
        });
    });

    axios.all(uploaders).then(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <Container>
          <Dropzone
            /* @ts-ignore */
            className="dropzone"
            onDrop={handleOnDrop}
            onChange={(e: any) => setImage(e.target.value)}
            value={image}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <span>📁</span>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
          {imagePreview()}
        </Container>
      )}
    </div>
  );
};

export default UploadMultiImage;
