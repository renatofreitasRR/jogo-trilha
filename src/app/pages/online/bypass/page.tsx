"use client"

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { setLocalItem } from "@/app/utils/sessionStorage";
import { Box, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import styles from "./styles.module.css";

interface RoomsProps {
    room: string;
    users: number;
}

export default function ByPass() {
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState<RoomsProps[]>([]);
    const router = useRouter()

    async function submitForm(e: FormEvent) {
        e.preventDefault();
        router.push(`/pages/online/board/${room}`);
    }

    async function getRooms() {
        const connection = new HubConnectionBuilder()
            .withUrl(`${process.env.WEBSOCKET_ROUTE}/game`)
            .configureLogging(LogLevel.Information)
            .build();

        connection.on("RoomsAvailable", (rooms) => {
            setRooms(rooms);
        });

        await connection.start();
        await connection.invoke("SendGroups");
    }

    useEffect(() => {
        getRooms();
    }, []);

    function joinRoom(room: string) {
        router.push(`/pages/online/board/${room}`);
    }

    return (
        <Box p={8} display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="gray.100">
            <Box p={6} bg="white" borderRadius="md" boxShadow="lg">
                <h1>
                    Bem-vindo ao Jogo Trilha Online!
                </h1>
                <form onSubmit={submitForm}>
                    <FormControl id="room" mb={4}>
                        <FormLabel>Nome da Sala</FormLabel>
                        <Input
                            type="text"
                            placeholder="Digite aqui o nome da sala"
                            onChange={(e) => setRoom(e.currentTarget.value)}
                            required
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" width="full">
                        Entrar
                    </Button>
                </form>

                <h2 className={styles.available_room_title}>Salas disponíveis</h2>
                <div className={styles.available_room_container}>
                    {rooms.map(room => (
                        <button
                            key={room.room}
                            type="button"
                            className={styles.available_room}
                            onClick={() => joinRoom(room.room)}
                        >
                            Sala {room.room} - {room.users} usuário(s)
                        </button>

                    ))}
                </div>

            </Box>
        </Box>
    );
}