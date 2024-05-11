"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/app/services/api";

interface Tema {
  id?: number;
  tmacodigo: number;
  tmanome: string;
}

const ImageEdit: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [tema, setTema] = useState<Tema | null>(null);
  const [tmanome, settmanome] = useState("");

  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const response = await api.get(`/temas?id=${id}`);

        setTema(response.data[0]);
        settmanome(response.data[0].tmanome);
      } catch (error) {
        console.error("Erro ao buscar temas:", error);
      }
    };

    if (id) {
      fetchTemas();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await api.patch(`/temas/${id}`, {
        ...tema,
        tmanome,
      });

      toast({
        title: "Atualização de Tema",
        description: "Dados atualizados com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/temas/lista");
    } catch (error) {
      console.error("Erro ao atualizar tema:", error);
    }
  };

  return (
    <Box p={8}>
      {!tema ? (
        <div>Carregando...</div>
      ) : (
        <>
          <FormControl id="tmanome" mt={4}>
            <FormLabel>Nome do Tema</FormLabel>
            <Input
              value={tmanome}
              onChange={(e) => settmanome(e.target.value)}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleSave}>
            Salvar
          </Button>
        </>
      )}
    </Box>
  );
};

export default ImageEdit;
