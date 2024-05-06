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

  async function handleDelete(id: any) {
    try {
      await api.delete(`/images/${id}`);

      toast({
        title: "Exclusão de Imagem",
        description: "Imagem excluída com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      const filter = images.filter((x) => x.id != id);
      setImages(filter);
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
            {/* <Th>Código do Tema</Th> */}
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
              {/* <Td>{image.tmacodigo}</Td> */}
              <Td>
                <Link href={`/pages/images/editar/${image.id}`}>
                  <EditIcon />
                </Link>
                {"      "}|{"      "}
                <DeleteIcon
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(image.id ?? 0)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ImageList;
