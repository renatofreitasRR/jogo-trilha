"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Image as Peca,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useToast,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { api } from "@/app/services/api";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface Peca {
  id?: number;
  pcanome: string;
  pcaurl: string;
  pcapreco: number;
  tmacodigo: number;
}

const PecaList: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchPecas = async () => {
      try {
        const response = await api.get("/pecas");
        setPecas(response.data);
      } catch (error) {
        console.error("Erro ao buscar peças:", error);
      }
    };

    fetchPecas();
  }, []);

  async function handleDelete(id: any) {
    try {
      await api.delete(`/pecas/${id}`);

      toast({
        title: "Exclusão de Peça",
        description: "Peça excluída com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      const filter = pecas.filter((x) => x.id != id);
      setPecas(filter);
    } catch (error) {
      console.error("Erro ao atualizar peça:", error);
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Lista de Peças</Heading>
      <Button mt={4} mb={8} colorScheme="teal">
        <Link href={`/pages/pecas/criar`}>Cadastrar</Link>
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Imagem</Th>
            <Th>Nome</Th>
            <Th>Preço</Th>
            {/* <Th>Código do Tema</Th> */}
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pecas.map((peca, index) => (
            <Tr key={index}>
              <Td>
                <Peca
                  src={peca.pcaurl}
                  alt={peca.pcanome}
                  boxSize="200px"
                  objectFit="cover"
                />
              </Td>
              <Td>{peca.pcanome}</Td>
              <Td>R${peca.pcapreco.toFixed(2)}</Td>
              {/* <Td>{image.tmacodigo}</Td> */}
              <Td>
                <Link href={`/pages/pecas/editar/${peca.id}`}>
                  <EditIcon />
                </Link>
                {"      "}|{"      "}
                <DeleteIcon
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(peca.id ?? 0)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PecaList;
