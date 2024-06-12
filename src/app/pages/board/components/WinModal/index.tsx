"use client"

import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import styles from "./styles.module.css";
import { BoardContext } from "../../contexts/boardContext";

export function WinModal() {
    const { onClose } = useDisclosure();
    const { gameOver, playerWin, resetAll } = useContext(BoardContext);

    return (
        <>
            <Modal
                isOpen={gameOver}
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
                        <h2 className={styles.title}>Parabéns, jogador {playerWin != undefined && playerWin == 1 ? "Azul" : "Vermelho"} foi o vencedor!</h2>

                        <img src={playerWin != undefined && playerWin == 1 ? "/assets/blue_win.gif" : "/assets/red_win.gif"} />

                        <div className={styles.buttons}>
                            <button
                                onClick={resetAll}
                            >
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