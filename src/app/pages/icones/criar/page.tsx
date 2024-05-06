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

const IconeCadastro: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const [icnnome, setIcnnome] = useState("");
  const [icnurl, setIcnurl] = useState("");
  const [icnpreco, setIcnpreco] = useState("");
  const [tmacodigo, setTmaCodigo] = useState(1);

  const handleSave = async () => {
    try {
      await api.post("/icones", {
        icnnome,
        icnurl,
        icnpreco: Number(icnpreco),
        tmacodigo,
      });

      toast({
        title: "Cadastro de Ícones",
        description: "Ícone cadastrado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/icones/lista");
    } catch (error) {
      console.error("Erro ao cadastrar ícone:", error);
    }
  };

  return (
    <Box>
      <FormControl id="icnnome" mt={4}>
        <FormLabel>Nome do Ícone</FormLabel>
        <Input value={icnnome} onChange={(e) => setIcnnome(e.target.value)} />
      </FormControl>
      <FormControl id="icnpreco" mt={4}>
        <FormLabel>Preço da Imagem</FormLabel>
        <Input
          type="number"
          value={icnpreco}
          onChange={(e) => setIcnpreco(e.target.value)}
        />
      </FormControl>
      <FormControl id="icnurl" mt={4}>
        <FormLabel>URL do Ícone</FormLabel>
        <Input
          type="text"
          value={icnurl}
          onChange={(e) => setIcnurl(e.target.value)}
        />
      </FormControl>
      <FormControl id="icnurl" mt={4}>
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

export default IconeCadastro;
