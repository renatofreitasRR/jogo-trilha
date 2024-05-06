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

const ImageCadastro: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const [imgnome, setImgnome] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const [imgpreco, setImgpreco] = useState("");

  const handleSave = async () => {
    try {
      await api.post("/images", {
        imgnome,
        imgurl,
        imgpreco: Number(imgpreco),
      });

      toast({
        title: "Cadastro de Imagem",
        description: "Imagem cadastrada com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/images/lista");
    } catch (error) {
      console.error("Erro ao cadastrar imagem:", error);
    }
  };

  return (
    <Box>
      <FormControl id="imgnome" mt={4}>
        <FormLabel>Nome da Imagem</FormLabel>
        <Input value={imgnome} onChange={(e) => setImgnome(e.target.value)} />
      </FormControl>
      <FormControl id="imgpreco" mt={4}>
        <FormLabel>Preço da Imagem</FormLabel>
        <Input
          type="number"
          value={imgpreco}
          onChange={(e) => setImgpreco(e.target.value)}
        />
      </FormControl>
      <FormControl id="imgurl" mt={4}>
        <FormLabel>URL da Imagem</FormLabel>
        <Input
          type="text"
          value={imgurl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleSave}>
        Salvar
      </Button>
    </Box>
  );
};

export default ImageCadastro;
