import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { WebSocketContext } from "../../contexts/webSocketContext";

export function AwaitTurnModal() {
    const { onClose } = useDisclosure()
    const { awaitTurn } = useContext(WebSocketContext);

    return (
        <>
            <Modal
                isOpen={awaitTurn}
                onClose={onClose}
                closeOnOverlayClick={false}
                closeOnEsc={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Por favor, aguarde!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <h2>Aguarde a sua vez de jogar!</h2>
                        <Spinner />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}