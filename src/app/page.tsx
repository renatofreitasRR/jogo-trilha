"use client"

import Login from './pages/login/page';
import PerfilFrame from './pages/perfil/components/perfilFrame';
import { useAudio } from './shared/hooks/useAudio';
import styles from './styles.module.css';
import Link from 'next/link'

export default function InitialPage() {
  return (
    <Login />
  );
}
