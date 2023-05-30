import styles from "../../styles/Evernote.module.scss";
import { useState } from "react";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function NoteOperations() {
  const [inputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const dbInstance = collection(database, "notes");

  const inputToggle = () => {
    setInputVisible(!inputVisible);
  };

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
    });
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
