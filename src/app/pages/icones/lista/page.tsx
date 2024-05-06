"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Image as Icone,
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

interface Icone {
  id?: number;
  icnnome: string;
  icnurl: string;
  icnpreco: number;
  tmacodigo: number;
}

const IconeList: React.FC = () => {
  const [icones, setIcones] = useState<Icone[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchIcones = async () => {
      try {
        const response = await api.get("/icones");
        setIcones(response.data);
      } catch (error) {
        console.error("Erro ao buscar ícones:", error);
      }
    };

    fetchIcones();
  }, []);

  async function handleDelete(id: any) {
    try {
      await api.delete(`/icones/${id}`);

      toast({
        title: "Exclusão de Ícone",
        description: "Ícone excluído com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      const filter = icones.filter((x) => x.id != id);
      setIcones(filter);
    } catch (error) {
      console.error("Erro ao atualizar ícone:", error);
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Lista de Ícones</Heading>
      <Button mt={4} mb={8} colorScheme="teal">
        <Link href={`/pages/icones/criar`}>Cadastrar</Link>
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
          {icones.map((icone, index) => (
            <Tr key={index}>
              <Td>
                <Icone
                  src={icone.icnurl}
                  alt={icone.icnnome}
                  boxSize="200px"
                  objectFit="cover"
                />
              </Td>
              <Td>{icone.icnnome}</Td>
              <Td>R${icone.icnpreco.toFixed(2)}</Td>
              {/* <Td>{image.tmacodigo}</Td> */}
              <Td>
                <Link href={`/pages/icones/editar/${icone.id}`}>
                  <EditIcon />
                </Link>
                {"      "}|{"      "}
                <DeleteIcon
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(icone.id ?? 0)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default IconeList;
