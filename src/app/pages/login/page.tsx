"use client";
import { useForm } from "react-hook-form";
import styles from './styles.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { api } from "@/app/services/api";

interface LoginFormulario {
    email: string;
    senha: string;
}

const LoginFormularioSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Campo email é obrigatório" })
        .email("O Campo precisa estar em um formato de email válido"),

    senha: z
        .string()
        .min(1, { message: "Campo senha é obrigatório" })
});

const Login: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormulario>({
        resolver: zodResolver(LoginFormularioSchema)
    });

    function enviarFormulario(loginFormulario: LoginFormulario) {
        console.log("RECEBI OS DADOS", loginFormulario);

        //envia pra api
    }


    return (
        <form className={styles.form_login} onSubmit={handleSubmit(enviarFormulario)}>

            <input {...register('email')} placeholder="1" className={styles.input_login} />
            {errors.email?.message}

            <input {...register('senha')} placeholder="2" className={styles.input_login} />
            {errors.senha?.message}

            <button className={styles.button_login}>Salvar</button>
        </form>
    );
};

export default Login;
