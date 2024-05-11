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
  icnnome: string;
  icnurl: string;
}

const IconeCadastroSchema = z.object({
  icnnome: z.string().min(1, { message: "Nome do Ícone é obrigatório" }),
  icnurl: z.string().regex(/.*\.(jpg|gif|png|jpeg)$/, { message: "URL da Imagem inválida" }),
});

const IconeEdicao: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [tmacodigo, setTmacodigo] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CadastroData>({
    resolver: zodResolver(IconeCadastroSchema)
  });
  const params = useParams();
  const { id } = params;

  useEffect(() => {

    function getIcone() {
      setLoading(true);

      try {
        api.get(`/icones/${id}`).then(response => {
          const icone = response.data[0];

          console.log("ICONE", icone);

          setValue("icnnome", icone.ICNNOME);
          setValue("icnurl", icone.ICNURL);
          setTmacodigo(icone.TMACODIGO);

        });
      }
      catch (err: any) {
      }
      finally {
        setLoading(false);
      }

    }

    if (id) {
      getIcone()
    }

  }, [id]);

  const onSubmit = async (data: CadastroData) => {
    try {
      await api.post(`/icones/update/${id}`, {
        ...data,
      });

      toast({
        title: "Edição de Ícone",
        description: "Ícone editado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.back();
    } catch (error) {
      console.error("Erro ao editar ícone:", error);

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
              <BreadcrumbLink as={Link} href={`/pages/icones/lista/${tmacodigo}`}>Ícones</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href='#'>Editar</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <FormControl id="icnnome" mt={4}>
            <FormLabel>Nome do Ícone</FormLabel>
            <Input {...register("icnnome", { required: true })} isInvalid={errors?.icnnome?.message && errors?.icnnome?.message?.length > 0 ? true : false} />
            {errors?.icnnome?.message && <span className={styles.error_message} >{errors?.icnnome?.message}</span>}
          </FormControl>
          <FormControl id="icnurl" mt={4}>
            <FormLabel>URL da Imagem</FormLabel>
            <Input type="text" {...register("icnurl", { required: true })} isInvalid={errors?.icnurl?.message && errors?.icnurl?.message.length > 0 ? true : false} />
            {errors?.icnurl?.message && <span className={styles.error_message} >{errors?.icnurl?.message}</span>}
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

export default IconeEdicao;
