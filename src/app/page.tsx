import styles from './styles.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.machine}>
        <div className={styles.screen}>
          <div className={styles.menu}>
            <Link
              href="/pages/board"
              className={`${styles.button_play} ${styles.button_menu}`}
            />
            <Link
              href="#"
              className={`${styles.button_rank} ${styles.button_menu}`}
            />
            <Link
              href="#"
              className={`${styles.button_store} ${styles.button_menu}`}
            />
          </div>
        </div>
      </div>
    </main >
  );
}
