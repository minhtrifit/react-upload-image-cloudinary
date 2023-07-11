import axios from "axios";
import { useEffect, useState, useRef } from "react";

interface Props {
  cloudName: string;
  presetname: string;
}

const UploadImage = (props: Props) => {
  const { cloudName, presetname } = props;

  const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (uploadFile) {
      // @ts-ignore: Object is possibly 'null'.
      formRef.current.click();
    }
  }, [uploadFile]);

  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setLoadingUpload(true);

      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("upload_preset", presetname);

      const rs = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      setCloudinaryImage(rs.data.secure_url);
      setLoadingUpload(false);
    } catch (error: any) {
      console.log("Upload image failed:", error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div className="App">
      {loadingUpload ? (
        <p>Loading...</p>
      ) : (
        <div>
          <section className="left-side">
            <form>
              <h3> Upload Images to Cloudinary Cloud Storage</h3>
              <div>
                <input
                  type="file"
                  onChange={(event) => {
                    // @ts-ignore: Object is possibly 'null'.
                    setUploadFile(event.target.files[0]);
                  }}
                />
              </div>
              <button
                hidden
                ref={formRef}
                onClick={(e) => {
                  handleUpload(e);
                }}
              >
                Upload
              </button>
            </form>
          </section>
          <section className="right-side">
            <h3>The resulting image will be displayed here</h3>
            {cloudinaryImage && <p>Image url: {cloudinaryImage}</p>}
            {cloudinaryImage && <img src={cloudinaryImage} />}
          </section>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
