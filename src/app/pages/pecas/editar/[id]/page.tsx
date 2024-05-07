"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Image as Peca,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/app/services/api";

interface Peca {
  pcanome: string;
  pcaurl: string;
  pcapreco: number;
  tmacodigo: number;
}

const PecaEdit: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [peca, setPeca] = useState<Peca | null>(null);
  const [pcanome, setPcanome] = useState("");
  const [pcaurl, setPcaurl] = useState("");
  const [pcapreco, setPcapreco] = useState(0);

  useEffect(() => {
    const fetchPeca = async () => {
      try {
        const response = await api.get(`/pecas?id=${id}`);

        setPeca(response.data[0]);
        setPcanome(response.data[0].pcanome);
        setPcapreco(response.data[0].pcapreco);
        setPcaurl(response.data[0].pcaurl);
      } catch (error) {
        console.error("Erro ao buscar peça:", error);
      }
    };

    if (id) {
      fetchPeca();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await api.patch(`/pecas/${id}`, {
        ...peca,
        pcaurl: pcaurl,
        pcanome: pcanome,
        pcapreco: pcapreco,
      });

      toast({
        title: "Atualização de Peça",
        description: "Dados atualizados com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/pecas/lista");
    } catch (error) {
      console.error("Erro ao atualizar peças:", error);
    }
  };

  return (
    <Box p={8}>
      {!peca ? (
        <div>Carregando...</div>
      ) : (
        <>
          <Peca
            src={peca.pcaurl}
            alt={peca.pcanome}
            boxSize="200px"
            objectFit="cover"
          />
          <FormControl id="pcanome" mt={4}>
            <FormLabel>Nome da Peça</FormLabel>
            <Input
              value={pcanome}
              onChange={(e) => setPcanome(e.target.value)}
            />
          </FormControl>
          <FormControl id="pcapreco" mt={4}>
            <FormLabel>Preço da Peça</FormLabel>
            <Input
              type="number"
              value={pcapreco}
              onChange={(e) => setPcapreco(Number(e.target.value))}
            />
          </FormControl>
          <FormControl id="pcapreco" mt={4}>
            <FormLabel>URL da Peça</FormLabel>
            <Input
              type="text"
              value={pcaurl}
              onChange={(e) => setPcaurl(e.target.value)}
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

export default PecaEdit;
