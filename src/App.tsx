import UploadMultiImage from "./components/UploadMultiImage";
import "./App.css";

function App() {
  const cloudName = "dn2h31tcb";
  const presetname = "rv4vadwe";
  const apiKey = "391454387398821";

  return (
    <div>
      {/* <ImageUpload cloudName={cloudName} presetname={presetname} /> */}
      <UploadMultiImage
        apiKey={apiKey}
        cloudName={cloudName}
        presetname={presetname}
      />
    </div>
  );
}

export default App;
