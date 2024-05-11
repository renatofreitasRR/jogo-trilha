"use client";

import { useState } from "react";
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

interface CadastroData {
  imgnome: string;
  imgurl: string;
}

const ImageCadastroSchema = z.object({
  imgnome: z.string().min(1, { message: "Nome da Imagem é obrigatório" }),
  imgurl: z.string().regex(/.*\.(jpg|gif|png|jpeg)$/, { message: "URL da Imagem inválida" }),
});

const ImageCadastro: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CadastroData>({
    resolver: zodResolver(ImageCadastroSchema)
  });
  const params = useParams();
  const { id } = params;

  console.log("ERRORS", errors);

  const onSubmit = async (data: CadastroData) => {
    try {
      await api.post("/imagens/create", {
        ...data,
        tmacodigo: Number(id),
      });

      toast({
        title: "Cadastro de Imagem",
        description: "Imagem cadastrada com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push(`/pages/images/lista/${id}`);
    } catch (error) {
      console.error("Erro ao cadastrar imagem:", error);

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
    <Box p={8} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumb mt={4} mb={4}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href='/pages/temas/lista'>Temas</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href={`/pages/images/lista/${id}`}>Imagens</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Criar</BreadcrumbLink>
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
  );
};

export default ImageCadastro;
