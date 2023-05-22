import React from 'react';
import SlickSlider, { Settings } from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from 'swiper';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, useTheme } from '@mui/material';
import Card from '../card';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';

const Slider = () => {
  const theme = useTheme();

  return (
    <Swiper
      modules={[Scrollbar, FreeMode]}
      slidesPerView={3}
      scrollbar={{
        hide: false,
        draggable: true,
      }}
      freeMode
      breakpoints={{
        [theme.breakpoints.values.xl]: {
          slidesPerView: 10,
        },
        [theme.breakpoints.values.lg]: {
          slidesPerView: 8,
        },
        [theme.breakpoints.values.md]: {
          slidesPerView: 6,
        },
        [theme.breakpoints.values.sm]: {
          slidesPerView: 4,
        },
      }}
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <SwiperSlide key={index} style={{ paddingBottom: 10 }}>
          <Box sx={{ padding: 0.5 }}>
            <Card variant='rectangular' primary={index.toString()} secondary="Манга" href={`/m/${index}`} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  // const settings: Settings = {
  //   dots: false,
  //   infinite: true,
  //   arrows: false,
  //   draggable: true,
  //   swipe: true,
  //   pauseOnHover: true,
  //   pauseOnFocus: true,
  //   speed: 500,
  //   slidesToShow: 12,
  //   slidesToScroll: 1,
  //   // autoplay: true,
  //   // autoplaySpeed: 3000,
  //   responsive: [
  //     {
  //       breakpoint: theme.breakpoints.values.xl,
  //       settings: {
  //         slidesToShow: 10,
  //         slidesToScroll: 5,
  //       },
  //     },
  //     {
  //       breakpoint: theme.breakpoints.values.lg,
  //       settings: {
  //         slidesToShow: 8,
  //         slidesToScroll: 4,
  //       },
  //     },
  //     {
  //       breakpoint: theme.breakpoints.values.md,
  //       settings: {
  //         slidesToShow: 6,
  //         slidesToScroll: 6,
  //       },
  //     },
  //     {
  //       breakpoint: theme.breakpoints.values.sm,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 4,
  //       },
  //     },
  //   ],
  // };

  // return (
  //   <SlickSlider {...settings}>
  //     {Array.from({ length: 15 }).map((_, index) => (
  //       <SliderCard
  //         title={index.toString()}
  //         href={`/${index}`}
  //         src=""
  //         key={index}
  //         paperProps={{ square: true, elevation: 1, sx: { pt: 1, pb: 1 } }}
  //       />
  //     ))}
  //   </SlickSlider>
  // );
};

export default Slider;
