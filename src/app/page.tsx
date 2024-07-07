import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.homeContainer}>
        홈페이지
        <Navbar/>
      </div>
    </main>
  );
}
