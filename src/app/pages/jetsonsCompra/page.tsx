"use client";
import styles from '../../styles.module.css';

const Jetsons: React.FC = () => {


    return (
        <>
            
            {/*ARRUMAR O HREF AQUI, TEM QUE VOLTAR A PAGINA PRINCIPAL*/}
            <a href="../../page.tsx">
                <div id={styles["Logo"]}> </div>
            </a> 

            <div id={styles["Conteiner"]}>
                <div id={styles["Maquina"]}>
                    <div id={styles["Tela"]}>

                        {/*ARRUMAR O HREF AQUI, TEM QUE VOLTAR A PAGINA PRINCIPAL*/}

                        <a href='../../pages/loja' id={styles["Voltar"]}>
                            <div id={styles["BotaoVoltar"]}>   </div>
                        </a>
                        
                        <div id={styles["SaldoImg"]}>
                            <div id={styles["SaldoTxt"]}>
                                {/*AQUI VAI A FUNÇÃO QUE DEVE RETORNAR O SALDO NA CONTA DO USUÁRIO*/}
                                {/*AQUI TAMBÉM PRECISA LINKAR COM A TELA DE SALDO, PRA UM HREF */}
                                9999 
                            </div>
                        </div>

                        <div id={styles["ViewJetsons"]}></div>
                        
                        <a href='../../pages/confirmaCompraJetsons'> 
                            <div id={styles["BotaoComprar"]}></div>
                        </a>
                        

                    </div>
                </div>
            </div>

        </>
    );
};

export default Jetsons;

