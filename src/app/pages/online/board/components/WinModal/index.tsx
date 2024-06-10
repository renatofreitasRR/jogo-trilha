"use client"

import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { WebSocketContext } from "../../contexts/webSocketContext";
import styles from "./styles.module.css";

export function WinModal() {
    const { onClose } = useDisclosure()
    const { playerWin, connection } = useContext(WebSocketContext);



    return (
        <>
            <Modal
                isOpen={playerWin != undefined && playerWin == connection?.connectionId}
                onClose={onClose}
                closeOnOverlayClick={false}
                closeOnEsc={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Vencedor!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <h2 className={styles.title}>Parabéns, você venceu!</h2>

                        <img src={"/assets/background/win.gif"} />

                        <div className={styles.buttons}>
                            <button>
                                Jogar Novamente
                            </button>

                            <button>
                                Sair
                            </button>
                        </div>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}