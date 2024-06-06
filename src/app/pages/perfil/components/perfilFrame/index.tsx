'use client'
import styles from './index.module.css';

interface PerfilFrameProps {
    url: string
}

export default function PerfilFrame({ url }: PerfilFrameProps) {
    return (
        <img className={`
        ${styles.frame_container}`}
            src={url}>
        </img>
    );
}