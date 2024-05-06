import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { WebSocketContext } from "../../contexts/webSocketContext";

export function AwaitModal() {
    const { onClose } = useDisclosure()
    const { canStart } = useContext(WebSocketContext);

    console.log("CAN START", canStart);

    return (
        <>
            <Modal
                isOpen={!canStart}
                onClose={onClose}
                closeOnOverlayClick={false}
                closeOnEsc={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Por favor, aguarde!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <h2>Aguardando segundo jogador!</h2>

                        <Spinner />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}