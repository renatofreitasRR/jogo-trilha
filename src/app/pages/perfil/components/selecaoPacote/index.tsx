'use client'
import styles from './index.module.css';

interface SelecaoPacoteProps {
    ativo: boolean;
    nome: String;
    idx: number;
    onClick: Function;
}

export default function SelecaoPacote({ ativo, nome, idx, onClick }: SelecaoPacoteProps) {

    return (
        <div className={`
        ${styles.pacote_container}
    `}>
            <button onClick={() => onClick()}>
                <li key={idx}>{nome + (ativo ? " (Ativo)" : "")}</li>
            </button>
        </div>
    );
}