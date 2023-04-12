import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  flex: 1; 
  gap: 10px; 
  margin-top: 30px;
`;

const Image = styled.img`
  width: 100%; 
`;


function ImageList() {
    return (
        <>
            <ImageContainer>
                <Image
                    src="https://via.placeholder.com/400x400"
                    alt="Imagem aleatória 1"
                />
                <Image
                    src="https://via.placeholder.com/400x400"
                    alt="Imagem aleatória 2"
                />
                <Image
                    src="https://via.placeholder.com/400x400"
                    alt="Imagem aleatória 3"
                />
            </ImageContainer></>

    );
}

export default ImageList;