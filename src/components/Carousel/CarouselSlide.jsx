import React from 'react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const CarouselSlide = ({ swiper, children }) => {
  const { SwiperSlide } = swiper;

  return <SwiperSlide>{children}</SwiperSlide>;
};

export default injectLazyLibs(['swiper'])(CarouselSlide);
