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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/app/services/api";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import styles from './styles.module.css';

interface CadastroData {
  tmacodigo: number;
  tmanome: string;
  tmapreco: number;
}


const urlPattern = /.*\.(jpg|gif|png|jpeg)$/;


const CadastroSchema = z.object({
  tmanome: z.string().min(1, { message: "Nome do Tema é obrigatório" }),
  tmapreco: z.coerce.number().positive({ message: "Preço do Ícone deve ser maior que 0" }),
});


const ImageEdit: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CadastroData>({
    resolver: zodResolver(CadastroSchema)
  });

  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const response = await api.get(`/temas/${id}`);
        const data = response.data.tema;

        console.log("RESPONSE", response);
        console.log("DATA", data);


        setValue('tmacodigo', data.tmacodigo);
        setValue('tmanome', data.tmanome);
        setValue('tmapreco', data.tmapreco);

      } catch (error) {
        console.error("Erro ao buscar temas:", error);
      }
    };

    if (id) {
      fetchTemas();
    }
  }, [id]);

  const onSubmit = async (data: CadastroData) => {
    try {

      const tema = {
        tmanome: data.tmanome,
        tmapreco: data.tmapreco
      };

      await api.post(`/temas/update/${id}`, tema);

      toast({
        title: "Tema",
        description: "Tema atualizado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/pages/temas/lista");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast({
        title: "Tema",
        description: "Erro ao atualizar tema",
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
          <BreadcrumbLink href='#'>Editar</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <FormControl id="tmanome" >
        <FormLabel>Nome do Tema</FormLabel>
        <Input  {...register("tmanome", { required: true })} isInvalid={errors?.tmanome?.message && errors?.tmanome?.message.length > 0 ? true : false} />
        {errors?.tmanome?.message && <span className={styles.error_message} >{errors?.tmanome?.message}</span>}
      </FormControl>
      <FormControl id="icnpreco" mt={4}>
        <FormLabel>Preço do Tema</FormLabel>
        <Input type="number" {...register("tmapreco", { required: true })} isInvalid={errors?.tmapreco?.message && errors?.tmapreco?.message.length > 0 ? true : false} />
        {errors?.tmapreco?.message && <span className={styles.error_message}>{errors?.tmapreco?.message}</span>}
      </FormControl>

      <Button mt={8} colorScheme="teal" type="submit" width={"100%"}>
        Salvar
      </Button>
    </Box>
  );
};

export default ImageEdit;
