"use client"

import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'
import { setLocalItem } from "@/app/utils/localStorage";


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
        <main>
            <section>
                <h1>Bem vindo ao Jogo Trilha Online!</h1>
                <form onSubmit={submitForm}>
                    <input
                        type="text"
                        placeholder="Digite aqui o nome do seu usuário"
                        onChange={(e) => setUserName(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder="Digite aqui o nome da sala"
                        onChange={(e) => setRoom(e.currentTarget.value)}
                    />
                    <button
                        type="submit"
                    >Entrar</button>
                </form>
            </section>
        </main>
    );
}