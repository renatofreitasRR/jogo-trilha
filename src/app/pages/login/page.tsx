"use client";
import { useForm } from "react-hook-form";
import styles from './styles.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { api } from "@/app/services/api";
import Link from 'next/link'
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { getLocalItem, setLocalItem } from "@/app/utils/sessionStorage";
import { useEffect } from "react";

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

    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        const userString = getLocalItem("usuario");

        if (userString) {
            const userParsed = JSON.parse(userString);
            router.push("/pages/home")
        }
    })

    async function enviarFormulario(loginFormulario: LoginFormulario) {

        try {

            const response = await api.post('auth/login', loginFormulario);

            const result = await response.data;

            setLocalItem("usuario", JSON.stringify(result));

            toast({
                title: "Login",
                description: "Login Realizado com sucesso!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            router.push("/pages/home")
        }
        catch (error: any) {
            toast({
                title: "Login",
                description: "Erro ao realizar login, email ou senha inválidos",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }

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

                                <input {...register('senha')} placeholder="Digite sua senha" className={styles.input_login} type="password" />
                                {errors?.senha?.message && <span className={styles.error_message}>{errors?.senha?.message}</span>}


                                <div className={styles.buttons}>
                                    <button className={styles.button_login}>LOGIN</button>
                                    <Link href="/pages/cadastro" className={styles.button_login}>CADASTRAR</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </main >
        </>
    );
};

export default Login;
