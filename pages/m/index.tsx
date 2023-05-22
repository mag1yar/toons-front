import Api from '@/src/api';
import { TeamDto } from '@/src/api/team/types';
import { Card } from '@/src/components';
import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useQuery } from 'react-query';

interface TeamProfileProps {
  initialTeams: TeamDto[] | null;
}

const Teams = (props: TeamProfileProps) => {
  const { initialTeams } = props;

  const { isLoading, data: teams = [] } = useQuery(['teams'], () => Api.team.list(), {
    initialData: initialTeams,
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
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          {teams?.map((t, index) => (
            <Grid key={index} xs={3}>
              <Card primary={t.name} href={`/t/${t.id}`} src={t.avatar} variant="square" />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ initialTeams: TeamDto[] | null }> = async (
  context,
) => {
  const initialTeams = (await Api.team.list()) || [];

  return {
    props: {
      initialTeams,
    },
  };
};

export default Teams;
