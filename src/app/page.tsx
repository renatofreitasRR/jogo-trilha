"use client"

import PerfilFrame from './pages/perfil/components/perfilFrame';
import { useAudio } from './shared/hooks/useAudio';
import styles from './styles.module.css';
import Link from 'next/link'

export default function Home() {
  const { playClickAudio } = useAudio();

  return (
    <main className={styles.container}>
      <div className={styles.machine}>
        <div className={styles.screen}>
          <div id={styles["IconePerfilFrameMenuInicial"]}>
            <Link href="/pages/perfil">
              <PerfilFrame url={'https://img.lovepik.com/png/20231028/Cartoon-cute-pixel-style-art-dog-Pixel-puppy-Yellow-dog_383168_wh860.png'}>
              </PerfilFrame>
            </Link>
          </div>
          <div className={styles.menu}>
            <Link
              href="/pages/board"
              className={`${styles.button_play} ${styles.button_menu}`}
              onClick={playClickAudio}
            />
            <Link
              href="/pages/online/bypass"
              className={`${styles.button_rank} ${styles.button_menu}`}
              onClick={playClickAudio}
            />
            <Link
              href="/pages/loja"
              className={`${styles.button_store} ${styles.button_menu}`}
              onClick={playClickAudio}
            />
          </div>
        </div>
      </div>
    </main >
  );
}
