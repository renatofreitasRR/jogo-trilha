"use client";

import { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Heading,
  Divider,
  FormErrorMessage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { api } from "@/app/services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.css';
import Link from "next/link";

interface CadastroData {
  tmanome: string;
  icnnome: string;
  icnurl: string;
  icnpreco: number;
  tmacodigo: number;
  imgnome: string;
  imgurl: string;
  imgpreco: number;
  pcanome: string;
  pcaurl: string;
  pcapreco: number;
}


const urlPattern = /.*\.(jpg|gif|png|jpeg)$/;


const CadastroSchema = z.object({
  tmanome: z.string().min(1, { message: "Nome do Tema é obrigatório" }),
  icnnome: z.string().min(1, { message: "Nome do Ícone é obrigatório" }),
  icnurl: z.string().regex(urlPattern, { message: "URL do Ícone inválida" }),
  icnpreco: z.coerce.number().positive({ message: "Preço do Ícone deve ser maior que 0" }),
  imgnome: z.string().min(1, { message: "Nome da Imagem é obrigatório" }),
  imgurl: z.string().regex(urlPattern, { message: "URL da Imagem inválida" }),
  imgpreco: z.coerce.number().positive({ message: "Preço da Imagem deve ser maior que 0" }),
  pcanome: z.string().min(1, { message: "Nome da Peça é obrigatório" }),
  pcaurl: z.string().regex(urlPattern, { message: "URL da Peça inválida" }),
  pcapreco: z.coerce.number().positive({ message: "Preço da Peça deve ser maior que 0" }),
});


const Cadastro: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CadastroData>({
    resolver: zodResolver(CadastroSchema)
  });

  const onSubmit = async (data: CadastroData) => {
    try {

      console.log("DATA", data);
      const tema = {
        tmanome: data.tmanome,
        tmapreco: data.icnpreco
      };

      const icone = {
        icnnome: data.icnnome,
        icnurl: data.icnurl
      };

      const imagem = {
        imgnome: data.imgnome,
        imgurl: data.imgurl
      };

      const peca = {
        pcanome: data.pcanome,
        pcaurl: data.pcaurl
      };

      const body = {
        tema,
        icone,
        imagem,
        peca
      };

      await api.post("/temas/create", body);

      toast({
        title: "Cadastro",
        description: "Cadastro realizado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/temas/lista");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast({
        title: "Cadastro",
        description: "Cadastro realizado com erro",
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

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Criar</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h3" size="lg">
        Tema
      </Heading>
      <Divider my={4} />
      <FormControl id="tmanome" >
        <FormLabel>Nome do Tema</FormLabel>
        <Input  {...register("tmanome", { required: true })} isInvalid={errors?.tmanome?.message} />
        {errors?.tmanome?.message && <span className={styles.error_message} >{errors?.tmanome?.message}</span>}
      </FormControl>

      <Heading as="h3" size="lg" mt={4}>
        Ícone
      </Heading>
      <Divider my={4} />
      <FormControl id="icnnome" mt={4}>
        <FormLabel>Nome do Ícone</FormLabel>
        <Input  {...register("icnnome", { required: true })} isInvalid={errors.icnnome?.message} />
        {errors?.icnnome?.message && <span className={styles.error_message}>{errors?.icnnome?.message}</span>}
      </FormControl>
      <FormControl id="icnpreco" mt={4}>
        <FormLabel>Preço do Ícone</FormLabel>
        <Input type="number" {...register("icnpreco", { required: true })} isInvalid={errors.icnpreco?.message} />
        {errors?.icnpreco?.message && <span className={styles.error_message}>{errors?.icnpreco?.message}</span>}
      </FormControl>
      <FormControl id="icnurl" mt={4} >
        <FormLabel>URL do Ícone</FormLabel>
        <Input type="text" {...register("icnurl", { required: true })} isInvalid={errors.icnurl?.message} />
        {errors?.icnurl?.message && <span className={styles.error_message}>{errors?.icnurl?.message}</span>}
      </FormControl>

      <Heading as="h3" size="lg" mt={4}>
        Imagem
      </Heading>
      <Divider my={4} />
      <FormControl id="imgnome" mt={4}>
        <FormLabel>Nome da Imagem</FormLabel>
        <Input  {...register("imgnome", { required: true })} isInvalid={errors.imgnome?.message} />
        {errors?.imgnome?.message && <span className={styles.error_message}>{errors?.imgnome?.message}</span>}
      </FormControl>
      <FormControl id="imgpreco" mt={4}>
        <FormLabel>Preço da Imagem</FormLabel>
        <Input type="number" {...register("imgpreco", { required: true })} isInvalid={errors.imgpreco?.message} />
        {errors?.imgpreco?.message && <span className={styles.error_message}>{errors?.imgpreco?.message}</span>}
      </FormControl>
      <FormControl id="imgurl" mt={4}>
        <FormLabel>URL da Imagem</FormLabel>
        <Input type="text" {...register("imgurl", { required: true })} isInvalid={errors.imgurl?.message} />
        {errors?.imgurl?.message && <span className={styles.error_message}>{errors?.imgurl?.message}</span>}
      </FormControl>

      <Heading as="h3" size="lg" mt={4}>
        Peça
      </Heading>
      <Divider my={4} />
      <FormControl id="pcanome" mt={4}>
        <FormLabel>Nome da Peça</FormLabel>
        <Input  {...register("pcanome", { required: true })} isInvalid={errors.pcanome?.message} />
        {errors?.pcanome?.message && <span className={styles.error_message}>{errors?.pcanome?.message}</span>}
      </FormControl>
      <FormControl id="pcapreco" mt={4}>
        <FormLabel>Preço da Peça</FormLabel>
        <Input type="number" {...register("pcapreco", { required: true })} isInvalid={errors.pcapreco?.message} />
        {errors?.pcapreco?.message && <span className={styles.error_message}>{errors?.pcapreco?.message}</span>}
      </FormControl>
      <FormControl id="pcaurl" mt={4}>
        <FormLabel>URL da Peça</FormLabel>
        <Input type="text" {...register("pcaurl", { required: true })} isInvalid={errors.pcaurl?.message} />
        {errors?.pcaurl?.message && <span className={styles.error_message}>{errors?.pcaurl?.message}</span>}
      </FormControl>

      <Button mt={8} colorScheme="teal" type="submit" width={"100%"}>
        Salvar
      </Button>
    </Box>
  );
};

export default Cadastro;
