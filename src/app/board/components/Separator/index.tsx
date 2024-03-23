import styles from "./index.module.css";

interface SeparatorProps {
    position: 'top' | 'bottom' | 'left' | 'right';
}

export default function Separator({ position }: SeparatorProps) {
    return (
        <div className={` ${styles.separator_container} ${styles[position]} `}></div>
    )
}