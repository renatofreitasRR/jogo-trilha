"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/app/services/api";

interface Image {
  imgnome: string;
  imgurl: string;
  imgpreco: number;
  tmacodigo: number;
}

const ImageEdit: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [image, setImage] = useState<Image | null>(null);
  const [imgnome, setImgnome] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const [imgpreco, setImgpreco] = useState(0);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await api.get(`/images?id=${id}`);

        setImage(response.data[0]);
        setImgnome(response.data[0].imgnome);
        setImgpreco(response.data[0].imgpreco);
        setImgUrl(response.data[0].imgurl);
      } catch (error) {
        console.error("Erro ao buscar imagem:", error);
      }
    };

    if (id) {
      fetchImage();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await api.patch(`/images/${id}`, {
        ...image,
        imgurl,
        imgnome,
        imgpreco,
      });

      toast({
        title: "Atualização de Imagem",
        description: "Dados atualizados com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/images/lista");
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
    }
  };

  return (
    <Box>
      {!image ? (
        <div>Carregando...</div>
      ) : (
        <>
          <Image
            src={image.imgurl}
            alt={image.imgnome}
            boxSize="200px"
            objectFit="cover"
          />
          <FormControl id="imgnome" mt={4}>
            <FormLabel>Nome da Imagem</FormLabel>
            <Input
              value={imgnome}
              onChange={(e) => setImgnome(e.target.value)}
            />
          </FormControl>
          <FormControl id="imgpreco" mt={4}>
            <FormLabel>Preço da Imagem</FormLabel>
            <Input
              type="number"
              value={imgpreco}
              onChange={(e) => setImgpreco(Number(e.target.value))}
            />
          </FormControl>
          <FormControl id="imgpreco" mt={4}>
            <FormLabel>URL da Imagem</FormLabel>
            <Input
              type="text"
              value={imgurl}
              onChange={(e) => setImgUrl(e.target.value)}
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

export default ImageEdit;
