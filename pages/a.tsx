import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';

const Anime = () => {
  return (
    <>
      <Head>
        <title>Toons | Аниме</title>
        <meta
          name="description"
          content="Аниме сүюіншілері үшін әлемнің әр түрлі тілдерінен қазақшаға аударылған аниме сериялары мен қазақша жазылған авторлық анимацион фильмдерді осы бетте таба аласыз. Жаңа және қызықты аниме мен мультфильмдермен танысыңыз!"
        />
      </Head>
      {/* <Box sx={{ mt: 1, mb: 1 }}>
        <Slider />
      </Box> */}
      <Container maxWidth="lg">Anime</Container>
    </>
  );
};

export default Anime;
