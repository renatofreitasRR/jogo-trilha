"use client"

import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/app/services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.css';
import { Spinner } from '@chakra-ui/react'

interface CadastroData {
  imgnome: string;
  imgurl: string;
}

const ImagemCadastroSchema = z.object({
  imgnome: z.string().min(1, { message: "Nome da Imagem é obrigatório" }),
  imgurl: z.string().regex(/.*\.(jpg|gif|png|jpeg)$/, { message: "URL da Imagem inválida" }),
});

const ImagemEdicao: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [tmacodigo, setTmacodigo] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CadastroData>({
    resolver: zodResolver(ImagemCadastroSchema)
  });
  const params = useParams();
  const { id } = params;

  useEffect(() => {

    function getImagem() {
      setLoading(true);

      try {
        api.get(`/imagens/${id}`).then(response => {
          const imagem = response.data[0];

          console.log("IMAGEM", imagem);

          setValue("imgnome", imagem.IMGNOME);
          setValue("imgurl", imagem.IMGURL);
          setTmacodigo(imagem.TMACODIGO);

        });
      }
      catch (err: any) {
      }
      finally {
        setLoading(false);
      }

    }

    if (id) {
      getImagem()
    }

  }, [id]);

  const onSubmit = async (data: CadastroData) => {
    try {
      await api.post(`/imagens/update/${id}`, {
        ...data,
      });

      toast({
        title: "Edição de Imagem",
        description: "Imagem editada com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.back();
    } catch (error) {
      console.error("Erro ao editar imagem:", error);

      toast({
        title: "Error",
        description: "Erro ao realizar ação",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Spinner size='xl' />
      ) : (
        <Box p={8} as="form" onSubmit={handleSubmit(onSubmit)}>
          <Breadcrumb mt={4} mb={4}>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href='/pages/temas/lista'>Temas</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href={`/pages/images/lista/${tmacodigo}`}>Imagens</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href='#'>Editar</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <FormControl id="imgnome" mt={4}>
            <FormLabel>Nome da Imagem</FormLabel>
            <Input {...register("imgnome", { required: true })} isInvalid={errors?.imgnome?.message} />
            {errors?.imgnome?.message && <span className={styles.error_message} >{errors?.imgnome?.message}</span>}
          </FormControl>
          <FormControl id="imgurl" mt={4}>
            <FormLabel>URL da Imagem</FormLabel>
            <Input type="text" {...register("imgurl", { required: true })} isInvalid={errors?.imgurl?.message} />
            {errors?.imgurl?.message && <span className={styles.error_message} >{errors?.imgurl?.message}</span>}
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Salvar
          </Button>
        </Box>
      )
      }
    </>

  );
};

export default ImagemEdicao;
