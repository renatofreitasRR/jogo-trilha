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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useParams } from "next/navigation";

interface Image {
  IMGCODIGO: number;
  IMGNOME: string;
  IMGURL: string;
  TMACODIGO: number;
}

const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const toast = useToast();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get(`/imagens/getallbytema/${id}`);
        setImages(response.data);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchImages();
  }, []);

  async function handleDelete(id: any) {
    try {
      await api.delete(`/imagens/${id}`);

      toast({
        title: "Exclusão de Imagem",
        description: "Imagem excluída com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      const filter = images.filter((x) => x.IMGCODIGO != id);
      setImages(filter);
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
    }
  }

  return (
    <Box p={8}>
      <Breadcrumb mt={4} mb={4}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href='/pages/temas/lista'>Temas</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Imagens</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading mb={4}>Lista de Imagens</Heading>
      <Link href={`/pages/images/criar/${id}`}>
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
          {images.map((image, index) => (
            <Tr key={index}>
              <Td>
                <Image
                  src={image.IMGURL}
                  alt={image.IMGNOME}
                  boxSize="200px"
                  objectFit="cover"
                />
              </Td>
              <Td>{image.IMGNOME}</Td>
              <Td>
                <Link href={`/pages/images/editar/${image.IMGCODIGO}`}>
                  <EditIcon />
                </Link>
                {"      "}|{"      "}
                {images.length > 1 &&
                  <DeleteIcon
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(image.IMGCODIGO ?? 0)}
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

export default ImageList;
