import { useRef, useState } from "react";
import { storageRef } from "../utils/firebase";

const Upload = () => {
  const [image, setImage] = useState();
  const [url, setUrl] = useState("");
  const [process, setProcess] = useState(0);
  const [pauseRef] = useRef();
  const [resumeRef] = useRef();
  const [cancelRef] = useRef();
  const submit = (e) => {
    e.preventDefault();
    const upload = storageRef.child(`/image/users/${image.name}`).put(image);

    upload.on("state_changed", (snap) => {
      const process = Math.round(snap.bytesTransferred / snap.totalBytes) * 100;
      setProcess(process);
      console.log(process);
    });
    pauseRef.current.addEventListener("click", () => {
      upload.pause();
    });
    cancelRef.current.addEventListener("click", () => {
      upload.cancel();
    });
    resumeRef.current.addEventListener("click", () => {
      upload.resume();
    });
  };
  return (
    <>
      <process process={process} />
      <form action="" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="">File</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
              }
            }}
          />
        </div>
        <button type="submit"> submit</button>
      </form>
      <div className="form-group">
        <button ref={cancelRef}>Cancel</button>
        <button ref={pauseRef}>Pause</button>
        <button ref={resumeRef}>Resume</button>
      </div>
    </>
  );
};

export default Upload;
