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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { api } from "@/app/services/api";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";

interface Tema {
  tmacodigo: number;
  tmapreco: number;
  tmanome: string;
}

const TemasList: React.FC = () => {
  const [temas, setTemas] = useState<Tema[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get("/temas/getall");

        console.log("RESPONSE", response);
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

      const filter = temas.filter((x) => x.tmacodigo != id);
      setTemas(filter);
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
    }
  }

  return (
    <Box p={8}>

      <Breadcrumb mt={4} mb={4}>
        {/* <BreadcrumbItem>
          <BreadcrumbLink href='#'>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
        </BreadcrumbItem> */}

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Temas</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading mb={4}>Lista de Temas</Heading>
      <Link href={`/pages/temas/criar`}>
        <Button mt={4} mb={8} colorScheme="teal">
          Cadastrar
        </Button>
      </Link>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Imagens</Th>
            <Th>Ícones</Th>
            <Th>Peças</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {temas.map((tema, index) => (
            <Tr key={index}>
              <Td>{tema.tmanome}</Td>
              <Td>
                <Link href={`/pages/images/lista/${tema.tmacodigo}`}>
                  <ViewIcon />
                </Link>
              </Td>
              <Td>
                <Link href={`/pages/icones/lista/${tema.tmacodigo}`}>
                  <ViewIcon />
                </Link>
              </Td>
              <Td>
                <Link href={`/pages/pecas/lista/${tema.tmacodigo}`}>
                  <ViewIcon />
                </Link>
              </Td>
              <Td>
                <Link href={`/pages/temas/editar/${tema.tmacodigo}`}>
                  <EditIcon />
                </Link>
                {"      "}|{"      "}
                <DeleteIcon
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(tema.tmacodigo ?? 0)}
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
