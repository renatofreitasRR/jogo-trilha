"use client";

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
  pcanome: string;
  pcaurl: string;
}

//ToDo: teste
const PecaCadastroSchema = z.object({
  pcanome: z.string().min(1, { message: "Nome da Peça é obrigatório" }),
  pcaurl: z.string().regex(/.*\.(jpg|gif|png|jpeg)$/, { message: "URL da Imagem inválida" }),
});

const PecaEdicao: React.FC = () => {
  const toast = useToast();
  const [tmacodigo, settmacodigo] = useState<number>(0);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CadastroData>({
    resolver: zodResolver(PecaCadastroSchema)
  });
  const params = useParams();
  const { id } = params;

  useEffect(() => {

    function getPeca() {
      setLoading(true);

      try {
        api.get(`/pecas/${id}`).then(response => {
          const peca = response.data[0];

          console.log("PECA", peca);

          setValue("pcanome", peca.pcanome);
          setValue("pcaurl", peca.pcaurl);
          settmacodigo(peca.tmacodigo);

        });
      }
      catch (err: any) {
      }
      finally {
        setLoading(false);
      }

    }

    if (id) {
      getPeca()
    }

  }, [id]);

  const onSubmit = async (data: CadastroData) => {
    try {
      await api.post(`/pecas/update/${id}`, {
        ...data,
        tmacodigo: Number(id),
      });

      toast({
        title: "Edição de Peça",
        description: "Peça editada com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.back();
    } catch (error) {
      console.error("Erro ao editar peça:", error);

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
              <BreadcrumbLink as={Link} href={`/pages/pecas/lista/${tmacodigo}`}>Peças</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href='#'>Editar</BreadcrumbLink>
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
      )
      }
    </>

  );
};

export default PecaEdicao;
