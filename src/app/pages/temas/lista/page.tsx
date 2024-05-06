"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Image,
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

interface Tema {
  id?: number;
  tmacodigo: number;
  tmanome: string;
}

const TemasList: React.FC = () => {
  const [temas, setTemas] = useState<Tema[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get("/temas");
        setTemas(response.data);
      } catch (error) {
        console.error("Erro ao buscar tenas:", error);
      }
    };

    fetchImages();
  }, []);

  async function handleDelete(id: any) {
    try {
      await api.delete(`/temas/${id}`);

      toast({
        title: "Exclusão de Imagem",
        description: "Imagem excluída com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      const filter = temas.filter((x) => x.id != id);
      setTemas(filter);
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Lista de Temas</Heading>
      <Button mt={4} mb={8} colorScheme="teal">
        <Link href={`/pages/temas/criar`}>Cadastrar</Link>
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {temas.map((tema, index) => (
            <Tr key={index}>
              <Td>{tema.tmanome}</Td>
              <Td>
                <Link href={`/pages/temas/editar/${tema.id}`}>
                  <EditIcon />
                </Link>
                {"      "}|{"      "}
                <DeleteIcon
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(tema.id ?? 0)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TemasList;
