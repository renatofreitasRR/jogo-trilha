"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Text, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';
import Link from 'next/link';

interface Image {
    id?: number;
    imgnome: string;
    imgurl: string;
    imgpreco: number;
    tmacodigo: number;
}

const ImageList: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/images');
                setImages(response.data);
            } catch (error) {
                console.error('Erro ao buscar imagens:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <Box>
            <Heading mb={4}>Lista de Imagens</Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Imagem</Th>
                        <Th>Nome</Th>
                        <Th>Preço</Th>
                        <Th>Código do Tema</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {images.map((image, index) => (
                        <Tr key={index}>
                            <Td><Image src={image.imgurl} alt={image.imgnome} boxSize="200px" objectFit="cover" /></Td>
                            <Td>{image.imgnome}</Td>
                            <Td>R${image.imgpreco.toFixed(2)}</Td>
                            <Td>{image.tmacodigo}</Td>
                            <Td>

                                <Link
                                    href={`/pages/images/editar/${image.id}`}
                                >
                                    Editar
                                </Link>

                                |

                                Excluir

                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default ImageList;
