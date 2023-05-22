import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';

const Ranobe = () => {
  return (
    <>
      <Head>
        <title>Toons | Ранобэ</title>
        <meta
          name="description"
          content="Ранобэ оқушылары үшін әлемнің әр түрлі тілдерінен қазақшаға аударылған ранобэлер мен қазақша жазылған авторлық новеллаларды осы бетте таба аласыз. Жаңа және қызықты ранобэлермен танысыңыз!"
        />
      </Head>
      {/* <Box sx={{ mt: 1, mb: 1 }}>
        <Slider />
      </Box> */}
      <Container maxWidth="lg">Ranobe</Container>
    </>
  );
};

export default Ranobe;
