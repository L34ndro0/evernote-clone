import styles from "../../styles/Evernote.module.scss";
import { useState, useEffect } from "react";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import "react-quill/dist/quill.snow.css";

export default function NoteOperations() {
  const [inputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [notesArray, setNotesArray] = useState([]);
  const dbInstance = collection(database, "notes");

  useEffect(() => {
    getNotes();
  }, []);

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
      getNotes();
    });
  };

  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setNotesArray(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
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
            value={noteTitle}
          />
          <div className={styles.ReactQuill}>
            <ReactQuill onChange={addDesc} value={noteDesc} />
          </div>
          <button className={styles.saveBtn} onClick={saveNote}>
            Save Note
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.noteDisplay}>
        {notesArray.map((note) => {
          return (
            <div className={styles.notesInner}>
              <h4>{note.noteTitle}</h4>              
            </div>
          );
        })}
      </div>
    </>
  );
}
