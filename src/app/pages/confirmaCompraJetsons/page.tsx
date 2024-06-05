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

                        <div id={styles["ConfirmaCompra"]}>
                            <div id={styles["AreaConfirmacao"]}> 
                            {/*AQUI PRECISA PUXAR O QUANTO TEM NA CONTA, E SUBTRAIR DO PREÇO*/}
                                600 <br />
                                -300 <br/>
                                ---- <br />
                                300 <br />
                            </div>
                        </div>
                        
                        
                        <a href='../../pages/Perfil'> 
                            <div id={styles["BotaoComprar"]}></div>
                            {/*AQUI VAI A FUNÇÃO QUE DEVE EFETUAR A COMPRA*/}
                                {/*AQUI TAMBÉM PRECISA LINKAR COM A TELA DE PERFIL, PRA UM HREF */}
                        </a>
                        

                    </div>
                </div>
            </div>

        </>
    );
};

export default Jetsons;

