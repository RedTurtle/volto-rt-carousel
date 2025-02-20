import loadable from '@loadable/component';

export const Carousel = loadable(
  () =>
    import(
      /* webpackChunkName: "rt-carousel" */ '@redturtle/volto-rt-carousel/components/Carousel/Carousel'
    ),
  { ssr: false }, //because it has styles for carousel to import
);
export const CarouselSlide = loadable(() =>
  import(
    /* webpackChunkName: "rt-carousel" */ '@redturtle/volto-rt-carousel/components/Carousel/CarouselSlide'
  ),
);

export const CarouselTemplate = loadable(() =>
  import(
    /* webpackChunkName: "rt-carousel" */ '@redturtle/volto-rt-carousel/components/Blocks/Listing/Carousel/CarouselTemplate'
  ),
);

export const DefaultSlideAppearance = loadable(() =>
  import(
    /* webpackChunkName: "rt-carousel-appearance" */ '@redturtle/volto-rt-carousel/components/Blocks/Listing/Carousel/SlideAppearance/DefaultSlideAppearance'
  ),
);

export const BottomCarouselSlot = loadable(() =>
  import(
    /* webpackChunkName: "rt-carousel" */ '@redturtle/volto-rt-carousel/components/Blocks/Listing/Carousel/Slots/BottomSlot'
  ),
);

export const TopCarouselSlot = loadable(() =>
  import(
    /* webpackChunkName: "rt-carousel" */ '@redturtle/volto-rt-carousel/components/Blocks/Listing/Carousel/Slots/Top/TopSlot'
  ),
);
