import { useEffect, useState } from "react";
import { app, database } from "../../firebaseConfig";
import { doc, getDoc, getDocs,collection, updateDoc } from "firebase/firestore";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import "react-quill/dist/quill.snow.css";
import styles from "../../styles/Evernote.module.scss";

export default function NoteDetails({ ID }) {
  const [singleNote, setSingleNote] = useState({});
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getSingleNote();
  }, [ID]);

  const getSingleNote = async () => {
    if (ID) {
      const singleNote = doc(database, "notes", ID);
      const data = await getDoc(singleNote);
      setSingleNote({ ...data.data(), id: data.id });
    }
  };

  const getEditData = () => {
    setIsEdit(true);
    setNoteTitle(singleNote.noteTitle);
    setNoteDesc(singleNote.noteDesc);
  };

  return (
    <>
      <div>
        <button className={styles.editBtn} onClick={() => getEditData()}>
          Edit
        </button>
        <button className={styles.deleteBtn}>Delete</button>
      </div>
      <h2>{singleNote.noteTitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: singleNote.noteDesc }}></div>
      {isEdit ? (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="Enter the title..."
            onChange={(event) => setNoteTitle(event.target.value)}
            value={noteTitle}
          />
          <div className={styles.ReactQuill}>
            <ReactQuill value={noteDesc} onChange={setNoteDesc} />
          </div>
          <button className={styles.saveBtn}>Update note</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
