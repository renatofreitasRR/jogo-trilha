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

interface Image {
  id?: number;
  imgnome: string;
  imgurl: string;
  imgpreco: number;
  tmacodigo: number;
}

const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get("/images");
        setImages(response.data);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchImages();
  }, []);

  async function handleDelete(id: number) {
    try {
      await api.delete(`/images/${id}`);

      toast({
        title: "Atualização de Imagem",
        description: "Dados atualizados com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
    }
  }

  return (
    <Box>
      <Heading mb={4}>Lista de Imagens</Heading>
      <Button mt={4} colorScheme="teal">
        <Link href={`/pages/images/criar`}>Cadastrar</Link>
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Imagem</Th>
            <Th>Nome</Th>
            <Th>Preço</Th>
            <Th>Código do Tema</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {images.map((image, index) => (
            <Tr key={index}>
              <Td>
                <Image
                  src={image.imgurl}
                  alt={image.imgnome}
                  boxSize="200px"
                  objectFit="cover"
                />
              </Td>
              <Td>{image.imgnome}</Td>
              <Td>R${image.imgpreco.toFixed(2)}</Td>
              <Td>{image.tmacodigo}</Td>
              <Td>
                <Link href={`/pages/images/editar/${image.id}`}>Editar</Link>|
                <span onClick={() => handleDelete(image.id ?? 0)}>Excluir</span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ImageList;
