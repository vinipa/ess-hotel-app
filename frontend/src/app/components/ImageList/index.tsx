import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;
  margin-top: 30px;
`;

const Image = styled.img`
  width: 400px;
`;

function ImageList() {
  return (
    <>
      <ImageContainer>
        <Image
          src="https://www.hotelmorada.com.br/caldas-novas/wp-content/uploads/2015/01/morada-das-aguas-lazer-11-400x400.jpg"
          alt="Imagem aleatória 1"
        />
        <Image
          src="https://www.freetime.com.br/wp-content/uploads/2016/07/nauticomar9-400x400.png"
          alt="Imagem aleatória 2"
        />
        <Image
          src="https://blogger.googleusercontent.com/img/a/AVvXsEi3Jv8Z-Hkc0eKq-omMipYpT0JK8H4lr1NBhWdsG_GRqLqu3hbMsvhjdXG_f7wT7jDLR2LmwQDNeaxemuHVEpMV5tkG_V9_Vd6H5L7utJDkmwMgm1uxm6xYUT12gdkFhMJD1MfxscMB5XX8ZuvwamG1Dx4F2zXr-d1t-AWTokzAIOSeNyHMfUh3Dwf7eg=w400-h400"
          alt="Imagem aleatória 3"
        />
      </ImageContainer>
    </>
  );
}

export default ImageList;
