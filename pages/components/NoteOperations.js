import styles from "../../styles/Evernote.module.scss";
import { useState } from "react";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import "react-quill/dist/quill.snow.css";

export default function NoteOperations() {
  const [inputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const dbInstance = collection(database, "notes");

  const inputToggle = () => {
    setInputVisible(!inputVisible);
  };

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteDesc("");
      setNoteTitle("");
    });
  };

  const addDesc = (value) => {
    setNoteDesc(value);
  };

  return (
    <>
      <div className={styles.btnContainer}>
        <button className={styles.button} onClick={inputToggle}>
          Add a New Note
        </button>
      </div>

      {inputVisible ? (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            onChange={(event) => setNoteTitle(event.target.value)}
            placeholder="Enter the title..."
          />
          <div className={styles.ReactQuill}>
            <ReactQuill onChange={addDesc} />
          </div>
          <button className={styles.saveBtn} onClick={saveNote}>
            Save Note
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
