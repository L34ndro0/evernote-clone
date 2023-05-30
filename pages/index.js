import Head from "next/head";
import styles from "../styles/Evernote.module.scss";
import NoteOperations from "./components/NoteOperations";
import NoteDetails from "./components/NoteDetails";
import { useState } from "react";

function Home() {
  const [ID, setID] = useState(null);

  const getSingleNote = (id) => {
    setID(id);
  };

  return (
    <>
      <Head>
        <title>Evernote Clone</title>
        <meta name="description" content="This is a Evernote Clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.left}>
            <NoteOperations getSingleNote={getSingleNote} />
          </div>
          <div className={styles.right}>
            <NoteDetails ID={ID} />
          </div>
        </div>
      </main>
    </>
  );
}
export default Home;
