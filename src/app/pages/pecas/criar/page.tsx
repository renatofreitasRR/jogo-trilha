"use client";

import { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { api } from "@/app/services/api";

const PecaCadastro: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const [pcanome, setPcanome] = useState("");
  const [pcaurl, setPcaurl] = useState("");
  const [pcapreco, setPcapreco] = useState("");
  const [tmacodigo, setTmaCodigo] = useState(1);

  const handleSave = async () => {
    try {
      await api.post("/pecas", {
        pcanome: pcanome,
        pcaurl: pcaurl,
        pcapreco: Number(pcapreco),
        tmacodigo,
      });

      toast({
        title: "Cadastro de Peças",
        description: "Peça cadastrada com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/pecas/lista");
    } catch (error) {
      console.error("Erro ao cadastrar peça:", error);
    }
  };

  return (
    <Box p={8}>
      <FormControl id="pcanome" mt={4}>
        <FormLabel>Nome da Peça</FormLabel>
        <Input value={pcanome} onChange={(e) => setPcanome(e.target.value)} />
      </FormControl>
      <FormControl id="pcapreco" mt={4}>
        <FormLabel>Preço da Peça</FormLabel>
        <Input
          type="number"
          value={pcapreco}
          onChange={(e) => setPcapreco(e.target.value)}
        />
      </FormControl>
      <FormControl id="pcaurl" mt={4}>
        <FormLabel>URL da Peça</FormLabel>
        <Input
          type="text"
          value={pcaurl}
          onChange={(e) => setPcaurl(e.target.value)}
        />
      </FormControl>
      <FormControl id="pcaurl" mt={4}>
        <FormLabel>ID do Tema</FormLabel>
        <Input
          type="number"
          value={tmacodigo}
          onChange={(e) => setTmaCodigo(Number(e.target.value))}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleSave}>
        Salvar
      </Button>
    </Box>
  );
};

export default PecaCadastro;
