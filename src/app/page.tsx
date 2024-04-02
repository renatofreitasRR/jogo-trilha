import styles from './styles.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>Bem vindo</h1>
      <a className={styles.link} href='board'>
        <strong>Multiplayer Local</strong>
      </a>
      <a className={`${styles.link} ${styles.link_disabled}`} title='Em desenvolvimento' href='#'>
        <strong>Multiplayer Online</strong>
      </a>
    </main>
  );
}
