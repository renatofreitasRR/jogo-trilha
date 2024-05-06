"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Image, Input, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

interface Image {
    imgnome: string;
    imgurl: string;
    imgpreco: number;
    tmacodigo: number;
}

const ImageEdit: React.FC = () => {
    const params = useParams();
    const { id } = params;

    const [image, setImage] = useState<Image | null>(null);
    const [imgnome, setImgnome] = useState('');
    const [imgpreco, setImgpreco] = useState(0);

    useEffect(() => {
        console.log("ID", id);

        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/images?id=${id}`);

                console.log("RESPONSE", response);

                setImage(response.data);
                setImgnome(response.data.imgnome);
                setImgpreco(response.data.imgpreco);
            } catch (error) {
                console.error('Erro ao buscar imagem:', error);
            }
        };

        if (id) {
            console.log("FETCH")
            fetchImage();
        }
    }, [id]);

    const handleSave = async () => {
        try {
            await axios.patch(`http://localhost:8000/images/${id}`, {
                ...image,
                imgnome,
                imgpreco,
            });
            alert('Imagem atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar imagem:', error);
        }
    };

    return (
        <Box>
            {
                !image
                    ?
                    <div>Carregando...</div>
                    :
                    <>
                        <Image src={image.imgurl} alt={image.imgnome} boxSize="200px" objectFit="cover" />
                        <FormControl id="imgnome" mt={4}>
                            <FormLabel>Nome da Imagem</FormLabel>
                            <Input value={imgnome} onChange={(e) => setImgnome(e.target.value)} />
                        </FormControl>
                        <FormControl id="imgpreco" mt={4}>
                            <FormLabel>Preço da Imagem</FormLabel>
                            <Input type="number" value={imgpreco} onChange={(e) => setImgpreco(Number(e.target.value))} />
                        </FormControl>
                        <Button mt={4} colorScheme="teal" onClick={handleSave}>Salvar</Button>
                    </>
            }

        </Box>
    );
};

export default ImageEdit;
