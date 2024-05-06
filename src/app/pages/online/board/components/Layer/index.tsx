'use client'
import { useContext } from "react";
import Dot from "../Dot";
import styles from "./index.module.css";
import { WebSocketContext } from "../../contexts/webSocketContext";

interface LayerProps {
    layer: number;
}

export default function Layer({ layer }: LayerProps) {
    const { boardDots } = useContext(WebSocketContext);

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