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
  pcanome: string;
  pcaurl: string;
}

const PecaCadastroSchema = z.object({
  pcanome: z.string().min(1, { message: "Nome da Peça é obrigatório" }),
  pcaurl: z.string().regex(/.*\.(jpg|gif|png|jpeg)$/, { message: "URL da Imagem inválida" }),
});

const PecaCadastro: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CadastroData>({
    resolver: zodResolver(PecaCadastroSchema)
  });
  const params = useParams();
  const { id } = params;

  console.log("ERRORS", errors);

  const onSubmit = async (data: CadastroData) => {
    try {
      console.log("DATA", data);

      await api.post("/pecas/create", {
        ...data,
        tmacodigo: Number(id),
      });

      toast({
        title: "Cadastro de Peça",
        description: "Peça cadastrada com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push(`/pages/pecas/lista/${id}`);
    } catch (error) {
      console.error("Erro ao cadastrar peca:", error);

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
          <BreadcrumbLink as={Link} href={`/pages/pecas/lista/${id}`}>Peças</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Criar</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <FormControl id="imgnome" mt={4}>
        <FormLabel>Nome da Peça</FormLabel>
        <Input {...register("pcanome", { required: true })} isInvalid={errors?.pcanome?.message && errors?.pcanome?.message.length > 0 ? true : false} />
        {errors?.pcanome?.message && <span className={styles.error_message} >{errors?.pcanome?.message}</span>}
      </FormControl>
      <FormControl id="imgurl" mt={4}>
        <FormLabel>URL da Imagem</FormLabel>
        <Input type="text" {...register("pcaurl", { required: true })} isInvalid={errors?.pcaurl?.message && errors?.pcaurl?.message.length > 0 ? true : false} />
        {errors?.pcaurl?.message && <span className={styles.error_message} >{errors?.pcaurl?.message}</span>}
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Salvar
      </Button>
    </Box>
  );
};

export default PecaCadastro;
