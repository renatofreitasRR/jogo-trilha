"use client";
import Link from 'next/link';
import styles from '../../styles.module.css';

const Jetsons: React.FC = () => {


    return (
        <>

            {/*ARRUMAR O HREF AQUI, TEM QUE VOLTAR A PAGINA PRINCIPAL*/}
            <Link href="../../page.tsx">
                <div id={styles["Logo"]}> </div>
            </Link>

            <div id={styles["Conteiner"]}>
                <div id={styles["Maquina"]}>
                    <div id={styles["Tela"]}>

                        {/*ARRUMAR O HREF AQUI, TEM QUE VOLTAR A PAGINA PRINCIPAL*/}

                        <Link href='../../pages/loja' id={styles["Voltar"]}>
                            <div id={styles["BotaoVoltar"]}>   </div>
                        </Link>

                        <div id={styles["SaldoImg"]}>
                            <div id={styles["SaldoTxt"]}>
                                {/*AQUI VAI A FUNÇÃO QUE DEVE RETORNAR O SALDO NA CONTA DO USUÁRIO*/}
                                {/*AQUI TAMBÉM PRECISA LINKAR COM A TELA DE SALDO, PRA UM HREF */}
                                9999
                            </div>
                        </div>

                        <div id={styles["ViewJetsons"]}></div>

                        <Link href='../../pages/confirmaCompraJetsons'>
                            <div id={styles["BotaoComprar"]}></div>
                        </Link>


                    </div>
                </div>
            </div>

        </>
    );
};

export default Jetsons;

