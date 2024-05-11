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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { api } from "@/app/services/api";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useParams } from "next/navigation";

interface Icone {
  icncodigo: number;
  icnnome: string;
  icnurl: string;
  tmacodigo: number;
}

const IconeList: React.FC = () => {
  const [icones, setIcones] = useState<Icone[]>([]);
  const toast = useToast();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchIcones = async () => {
      try {
        const response = await api.get(`/icones/getallbytema/${id}`);
        setIcones(response.data);
      } catch (error) {
        console.error("Erro ao buscar ícones:", error);
      }
    };

    fetchIcones();
  }, []);

  async function handleDelete(id: any) {
    try {
      await api.post(`/icones/delete/${id}`);

      toast({
        title: "Exclusão de Ícone",
        description: "Ícone excluído com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      const filter = icones.filter((x) => x.icncodigo != id);
      setIcones(filter);
    } catch (error) {
      console.error("Erro ao atualizar ícone:", error);
    }
  }

  return (
    <Box p={8}>
      <Breadcrumb mt={4} mb={4}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href='/pages/temas/lista'>Temas</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Ícones</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading mb={4}>Lista de Ícones</Heading>
      <Link href={`/pages/icones/criar/${id}`}>
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
              <Td>
                <Link href={`/pages/icones/editar/${icone.icncodigo}`}>
                  <EditIcon />
                </Link>
                {"      "}|{"      "}

                {icones.length > 1 &&
                  <DeleteIcon
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(icone.icncodigo ?? 0)}
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

export default IconeList;
