import styles from "../../styles/Evernote.module.scss";
import { useState } from "react";

export default function NoteOperations() {
  const [inputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");

  const inputToggle = () => {
    setInputVisible(!inputVisible);
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
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
