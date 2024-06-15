"use client"

import { getLocalItem } from '@/app/utils/sessionStorage';
import { useAudio } from '../../shared/hooks/useAudio';
import PerfilFrame from '../perfil/components/perfilFrame';
import styles from './styles.module.css';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { playClickAudio } = useAudio();
  const [userName, setUserName] = useState("");
  const router = useRouter();



  useEffect(() => {
    function getUser() {
      const userString = window?.localStorage?.getItem("usuario");

      if (userString) {
        const userParsed = JSON.parse(userString);
        setUserName(userParsed.usrnome);
        return userParsed.usrnome;
      }
      else {
        router.push("/")

        return ""

      }
    }
  }, [])



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
            <h1>Bem vindo {userName} !</h1>
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
