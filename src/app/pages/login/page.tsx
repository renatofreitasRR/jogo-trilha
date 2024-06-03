"use client";
import { useForm } from "react-hook-form";
import styles from './styles.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { api } from "@/app/services/api";
import Link from 'next/link'

interface LoginFormulario {
    email: string;
    senha: string;
}

const LoginFormularioSchema = z.object({
    email: z
        .string()
        .min(1, { message: "O campo é obrigatório" })
        .email("Digite um email válido"),

    senha: z
        .string()
        .min(1, { message: "O campo é obrigatório" })
});

const Login: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormulario>({
        resolver: zodResolver(LoginFormularioSchema)
    });

    function enviarFormulario(loginFormulario: LoginFormulario) {
        console.log("RECEBI OS DADOS", loginFormulario);

        //envia pra api
    }

    const FormInput = ({ name, register, errors, ...rest }: any) => (
        <div className="form_control">
            <input {...register(name)} {...rest} />
            {errors[name] && <span className={styles.error_message}>{errors[name].message}</span>}
        </div>
    );

    return (
        <>
        <main className={styles.container}>
        <div className={styles.machine}>
            <div className={styles.screen}>
            <div className={styles.menu}>
                <form className={styles.form_login} onSubmit={handleSubmit(enviarFormulario)}>
                <label className={styles.label_login}>LOGIN</label>

                <input {...register('email')} placeholder="Digite seu usuário" className={styles.input_login} />
                {errors?.email?.message && <span className={styles.error_message}>{errors?.email?.message}</span>}

                <input {...register('senha')} placeholder="Digite sua senha" className={styles.input_login} type="password"/>
                {errors?.senha?.message && <span className={styles.error_message}>{errors?.senha?.message}</span>}
                
                <button className={styles.button_login}>LOGIN</button>
                {/* Arte do botão login - Marinho */}
                <Link href="/pages/cadastro"><button className={styles.button_cadastrar}>CADASTRAR</button></Link>
                {/* Arte do botão cadastrar - Marinho */}
                </form>
            </div>
            </div>
        </div>
    </main >
    </>
    );
};

export default Login;
