"use client";
import { useForm } from "react-hook-form";
import styles from './styles.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { api } from "@/app/services/api";
import Link from 'next/link'

    
    interface CadastroFormulario {
        email: string;
        senha: string;
        confirmarSenha: string;
    }

    const CadastroFormularioSchema = z.object({
        email: z
            .string()
            .min(1, { message: "O campo é obrigatório" })
            .email("Insira um e-mail válido"),
    
        senha: z
            .string()
            .min(1, { message: "O campo é obrigatório" }),

        confirmarSenha: z
            .string()
            .min(1, { message: "Confirme sua senha" })
            }).refine(data => data.senha === data.confirmarSenha, {
                message: "As senhas devem ser iguais",
                path: ["confirmarSenha"], // path of error
            });

    const Cadastro: React.FC = () => {
    
        const { register, handleSubmit, formState: { errors } } = useForm<CadastroFormulario>({
            resolver: zodResolver(CadastroFormularioSchema)
        });
    
        function enviarFormulario(cadastroFormulario: CadastroFormulario) {
            console.log("RECEBI OS DADOS", cadastroFormulario);
    
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
                    <div className={styles.menu}></div>

                    <form className={styles.form_cadastro} onSubmit={handleSubmit(enviarFormulario)}>
                        <label className={styles.label_cadastro}>CADASTRO</label>

                        <input {...register('email')} placeholder="Usuário" className={styles.input_cadastrar} />
                        {errors?.email?.message && <span className={styles.error_message}>{errors?.email?.message}</span>}

                        <input {...register('senha')} placeholder="Senha" className={styles.input_cadastrar} type="password"/>
                        {errors?.senha?.message && <span className={styles.error_message}>{errors?.senha?.message}</span>}

                        <input {...register('confirmarSenha')} placeholder="Confirmar senha" className={styles.input_cadastrar} type="password" />
                        {errors?.confirmarSenha?.message && <span className={styles.error_message}>{errors?.confirmarSenha?.message}</span>}


                        <button className={styles.button_salvar}>SALVAR</button> 
                        {/* Arte do botão salvar - Marinho */}
                        <Link href="/pages/login"><button className={styles.button_voltar}>VOLTAR</button></Link>
                        {/* Arte do botão voltar - Marinho */}
                        </form>
            </div>
        </div>
    </main>
            </>
        );
    };

export default Cadastro;
