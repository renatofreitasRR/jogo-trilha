"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Image as Icone,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/app/services/api";

interface Icone {
  icnnome: string;
  icnurl: string;
  icnpreco: number;
  tmacodigo: number;
}

const IconeEdit: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [icone, setIcone] = useState<Icone | null>(null);
  const [icnnome, setIcnnome] = useState("");
  const [icnurl, setIcnUrl] = useState("");
  const [icnpreco, setIcnpreco] = useState(0);

  useEffect(() => {
    const fetchIcone = async () => {
      try {
        const response = await api.get(`/icones?id=${id}`);

        setIcone(response.data[0]);
        setIcnnome(response.data[0].icnnome);
        setIcnpreco(response.data[0].icnpreco);
        setIcnUrl(response.data[0].icnurl);
      } catch (error) {
        console.error("Erro ao buscar ícone:", error);
      }
    };

    if (id) {
      fetchIcone();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await api.patch(`/icones/${id}`, {
        ...icone,
        icnurl: icnurl,
        icnnome: icnnome,
        icnpreco: icnpreco,
      });

      toast({
        title: "Atualização de Ícone",
        description: "Dados atualizados com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/icones/lista");
    } catch (error) {
      console.error("Erro ao atualizar ícones:", error);
    }
  };

  return (
    <Box p={8}>
      {!icone ? (
        <div>Carregando...</div>
      ) : (
        <>
          <Icone
            src={icone.icnurl}
            alt={icone.icnnome}
            boxSize="200px"
            objectFit="cover"
          />
          <FormControl id="icnnome" mt={4}>
            <FormLabel>Nome do Ícone</FormLabel>
            <Input
              value={icnnome}
              onChange={(e) => setIcnnome(e.target.value)}
            />
          </FormControl>
          <FormControl id="icnpreco" mt={4}>
            <FormLabel>Preço do Ícone</FormLabel>
            <Input
              type="number"
              value={icnpreco}
              onChange={(e) => setIcnpreco(Number(e.target.value))}
            />
          </FormControl>
          <FormControl id="icnpreco" mt={4}>
            <FormLabel>URL do Ícone</FormLabel>
            <Input
              type="text"
              value={icnurl}
              onChange={(e) => setIcnUrl(e.target.value)}
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

export default IconeEdit;
