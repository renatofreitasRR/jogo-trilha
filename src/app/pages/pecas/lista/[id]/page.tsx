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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { api } from "@/app/services/api";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useParams } from "next/navigation";

interface Peca {
  PCACODIGO: number;
  PCANOME: string;
  PCAURL: string;
  TMACODIGO: number;
}

const PecaList: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[]>([]);
  const toast = useToast();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchPecas = async () => {
      try {
        const response = await api.get(`/pecas/getallbytema/${id}`);

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

      const filter = pecas.filter((x) => x.PCACODIGO != id);
      setPecas(filter);
    } catch (error) {
      console.error("Erro ao atualizar peça:", error);
    }
  }

  return (
    <Box p={8}>
      <Breadcrumb mt={4} mb={4}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href='/pages/temas/lista'>Temas</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Peças</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading mb={4}>Lista de Peças</Heading>
      <Link href={`/pages/pecas/criar/${id}`}>
        <Button mt={4} mb={8} colorScheme="teal">
          Cadastrar
        </Button>
      </Link>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Imagem</Th>
            <Th>Nome</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pecas.map((peca, index) => (
            <Tr key={index}>
              <Td>
                <Peca
                  src={peca.PCAURL}
                  alt={peca.PCANOME}
                  boxSize="200px"
                  objectFit="cover"
                />
              </Td>
              <Td>{peca.PCANOME}</Td>
              <Td>
                <Link href={`/pages/pecas/editar/${peca.PCACODIGO}`}>
                  <EditIcon />
                </Link>
                {"      "}|{"      "}

                {
                  pecas.length > 1 &&
                  <DeleteIcon
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(peca.PCACODIGO ?? 0)}
                  />
                }

              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PecaList;
