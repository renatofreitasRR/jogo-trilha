import styles from './styles.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>Bem vindo</h1>
      <Link className={styles.link} href='board'>
        <strong>Multiplayer Local</strong>
      </Link>
      <Link className={`${styles.link} ${styles.link_disabled}`} title='Em desenvolvimento' href='#'>
        <strong>Multiplayer Online</strong>
      </Link>
    </main>
  );
}
