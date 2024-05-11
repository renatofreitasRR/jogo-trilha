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
  icnnome: string;
  icnurl: string;
}

const IconeCadastroSchema = z.object({
  icnnome: z.string().min(1, { message: "Nome do Ícone é obrigatório" }),
  icnurl: z.string().regex(/.*\.(jpg|gif|png|jpeg)$/, { message: "URL da Imagem inválida" }),
});

const IconeCadastro: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CadastroData>({
    resolver: zodResolver(IconeCadastroSchema)
  });
  const params = useParams();
  const { id } = params;

  console.log("ERRORS", errors);

  const onSubmit = async (data: CadastroData) => {
    try {
      await api.post("/icones/create", {
        ...data,
        tmacodigo: Number(id),
      });

      toast({
        title: "Cadastro de Ícone",
        description: "Ícone cadastrado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push(`/pages/icones/lista/${id}`);
    } catch (error) {
      console.error("Erro ao cadastrar icone:", error);

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
          <BreadcrumbLink as={Link} href={`/pages/icones/lista/${id}`}>Ícones</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Criar</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <FormControl id="imgnome" mt={4}>
        <FormLabel>Nome do ícone</FormLabel>
        <Input {...register("icnnome", { required: true })} isInvalid={errors?.icnnome?.message && errors?.icnnome?.message?.length > 0 ? true : false} />
        {errors?.icnnome?.message && <span className={styles.error_message} >{errors?.icnnome?.message}</span>}
      </FormControl>
      <FormControl id="imgurl" mt={4}>
        <FormLabel>URL da Imagem</FormLabel>
        <Input type="text" {...register("icnurl", { required: true })} isInvalid={errors?.icnurl?.message && errors?.icnurl?.message.length > 0 ? true : false} />
        {errors?.icnurl?.message && <span className={styles.error_message} >{errors?.icnurl?.message}</span>}
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Salvar
      </Button>
    </Box>
  );
};

export default IconeCadastro;
