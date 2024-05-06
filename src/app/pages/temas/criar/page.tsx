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

const TemaCadastro: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const [tmanome, setTmanome] = useState("");

  const handleSave = async () => {
    try {
      await api.post("/temas", {
        tmanome,
      });

      toast({
        title: "Cadastro de Temas",
        description: "Tema cadastrado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/temas/lista");
    } catch (error) {
      console.error("Erro ao cadastrar imagem:", error);
    }
  };

  return (
    <Box p={8}>
      <FormControl id="tmanome" mt={4}>
        <FormLabel>Nome do Tema</FormLabel>
        <Input value={tmanome} onChange={(e) => setTmanome(e.target.value)} />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleSave}>
        Salvar
      </Button>
    </Box>
  );
};

export default TemaCadastro;
