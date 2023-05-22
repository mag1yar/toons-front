import Api from '@/src/api';
import { MangaChapterDto } from '@/src/api/manga/types';
import { Card } from '@/src/components';
import { getImageDimensions, getImageSizeFromBase64 } from '@/src/utils/image';
import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useQuery } from 'react-query';

interface ChapterProfileProps {
  initialChapter: MangaChapterDto | null;
}

const Teams = (props: ChapterProfileProps) => {
  const { initialChapter } = props;

  const router = useRouter();
  const { chapterId = 0 } = router.query;

  const chapter = useQuery(['chapter', chapterId], () => Api.manga.getChapter(+chapterId), {
    initialData: initialChapter as any,
    enabled: !!chapterId,
  });
  return (
    <>
      <Head>
        <title>Toons | Командалар</title>
        {/* <meta
          name="description"
          content="Манга ұнатушылары үшін әлемнің әр түрлі тілдерінен қазақшаға аударылған мангалар мен қазақша жазылған авторлық комикстерді осы бетте таба аласыз. Жаңа және қызықты мангалармен танысыңыз!"
        /> */}
      </Head>
      {/* <Box sx={{ mt: 1, mb: 1 }}>
        <Slider />
      </Box> */}
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        {chapter.data?.images.map((image: any, index: number) => {
          return (
            <Image key={index} src={image.src} width={image.width} height={image.height} alt="" />
          );
        })}
      </Container>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  mangaId: string;
  chapterId: string;
}

export const getServerSideProps: GetServerSideProps<
  {
    initialChapter: any | null;
  },
  Params
> = async (context) => {
  const initialChapter = (await Api.manga.getChapter(+(context.params?.chapterId || 0))) || null;

  return {
    props: {
      initialChapter,
    },
  };
};

export default Teams;
