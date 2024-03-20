'use client'
import { useContext } from "react";
import Dot from "../dot";
import styles from "./index.module.css";
import { BoardContext } from "../../contexts/boardContext";

interface LayerProps {
    layer: number;
}

export default function Layer({ layer }: LayerProps) {
    const { boardDots } = useContext(BoardContext);

    return (
        <div className={`${styles.layer_container} ${styles[`layer_${layer}`]}`}>
            {boardDots.map(dot => (
                dot.main_layer == layer
                &&
                <Dot
                    key={dot.id}
                    dot={dot}
                />
            ))}
        </div>
    );
}