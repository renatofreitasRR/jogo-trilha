"use client"

import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'
import { setLocalItem } from "@/app/utils/sessionStorage";
import { Box, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";


export default function ByPass() {
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');
    const router = useRouter()

    async function submitForm(e: FormEvent) {
        e.preventDefault();
        router.push(`/pages/online/board/${room}`);
        setLocalItem("nome", userName);
    }

    return (
        <Box p={8} display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="gray.100">
            <Box p={6} bg="white" borderRadius="md" boxShadow="lg">
                <h1>
                    Bem-vindo ao Jogo Trilha Online!
                </h1>
                <form onSubmit={submitForm}>
                    <FormControl id="username" mb={4} mt={8}>
                        <FormLabel>Nome do Usuário</FormLabel>
                        <Input
                            type="text"
                            placeholder="Digite aqui o nome do seu usuário"
                            onChange={(e) => setUserName(e.currentTarget.value)}
                            required
                        />
                    </FormControl>
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
            </Box>
        </Box>
    );
}