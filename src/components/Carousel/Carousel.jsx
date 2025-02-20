import React, { useState, useEffect } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import PlayIcon from './PlayIcon';
import PauseIcon from './PauseIcon';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.css';

const messages = defineMessages({
  carousel: {
    id: 'Carousel',
    defaultMessage: 'Carosello',
  },
  firstSlideMessage: {
    id: 'This is the first slide',
    defaultMessage: 'Questa è la prima slide del carosello',
  },
  lastSlideMessage: {
    id: 'This is the last slide',
    defaultMessage: "Questa è l'ultima slide del carosello",
  },
  nextSlideMessage: {
    id: 'Next slide',
    defaultMessage: 'Prossima slide',
  },
  paginationBulletMessage: {
    id: 'Go to slide {{index}}',
    defaultMessage: 'Vai alla slide {index}',
  },
  prevSlideMessage: {
    id: 'Previous slide',
    defaultMessage: 'Slide precedente',
  },
  play: {
    id: 'Carousel play',
    defaultMessage: 'Seleziona per riprodurre',
  },
  pause: {
    id: 'Carousel pause',
    defaultMessage: 'Metti in pausa',
  },
});

const Carousel = ({
  swiper,
  swiperModules,
  slidesPerView = 1,
  spaceBetween = 30, //Distance between slides in px.
  loop = true,
  autoplay = false,
  autoplayDelay = 2000,
  displayDots = true,
  items,
  slideComponent,
  full_width,
  className,
  isEditMode,
  ...carouselConfig
}) => {
  const intl = useIntl();
  const { Swiper, SwiperSlide } = swiper;
  const { Navigation, Pagination, A11y, Autoplay, Keyboard } = swiperModules;
  const [swiperInstance, setSwiperInstance] = useState(null);

  const [key, setKey] = useState(new Date().getTime()); //to enable re-hidrate on editMode
  const [autoplayButton, setAutoplayButton] = useState({
    label: intl.formatMessage(messages.play),
    icon: PlayIcon,
  });
  const _autoplay = autoplay
    ? {
        delay: autoplayDelay,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }
    : null;

  let breakpointsConfig = {};
  if (slidesPerView > 1) {
    breakpointsConfig.breakpoints = {
      640: {
        // when window width is >= 640px
        slidesPerView: slidesPerView,
      },
    };
  }

  let swiperConfig = {
    modules: [Navigation, Pagination, A11y, Autoplay, Keyboard],
    slidesPerView: 1, //default, for mobile is 1 slide.
    spaceBetween,
    loop,
    centeredSlides: slidesPerView > 1 ? false : true,
    navigation: true,
    lazy: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    className: 'rt-carousel',
    a11y: {
      enabled: true,
      containerMessage: intl.formatMessage(messages.carousel),
      containerRole: 'region',
      firstSlideMessage: intl.formatMessage(messages.firstSlideMessage),
      lastSlideMessage: intl.formatMessage(messages.lastSlideMessage),
      nextSlideMessage: intl.formatMessage(messages.nextSlideMessage),
      paginationBulletMessage: intl.formatMessage(
        messages.paginationBulletMessage,
      ),
      prevSlideMessage: intl.formatMessage(messages.prevSlideMessage),
      slideLabelMessage: 'Slide {{index}} / {{slidesLength}}',
    },
    ...breakpointsConfig,
    ...(carouselConfig ?? {}),
  };
  if (autoplay) {
    swiperConfig.autoplay = _autoplay;
  }
  if (displayDots) {
    swiperConfig.pagination = { clickable: true, dynamicBullets: true };
  }

  const SlideComponent = slideComponent;

  const toggleAutoplay = () => {
    if (swiperInstance?.autoplay.paused || !swiperInstance?.autoplay.running) {
      if (!swiperInstance?.autoplay.running) {
        swiperInstance.autoplay.start();
      } else {
        swiperInstance.autoplay.resume();
      }
      setAutoplayButton({
        label: intl.formatMessage(messages.pause),
        icon: PauseIcon,
      });
    } else {
      swiperInstance.autoplay.pause();
      setAutoplayButton({
        label: intl.formatMessage(messages.play),
        icon: PlayIcon,
      });
    }
  };

  useEffect(() => {
    if (isEditMode) {
      setKey(new Date().getTime());
    }
  }, [displayDots]);

  return (
    <div
      className={cx('rt-carousel-wrapper', {
        'full-width': full_width,
        'ui container': !full_width,
        ['appearance-' + className]: className,
      })}
    >
      <Swiper
        {...swiperConfig}
        onSwiper={(swiper) => {
          if (!swiperInstance) {
            setSwiperInstance(swiper);
          }
        }}
        role="region"
        key={key}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <SlideComponent item={item} index={i} />
          </SwiperSlide>
        ))}

        <div className="play-pause-wrapper" slot="container-end">
          <button
            onClick={() => {
              toggleAutoplay();
            }}
            aria-label={autoplayButton.label}
            title={autoplayButton.label}
            tabIndex={0}
          >
            {autoplayButton.icon}
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default injectLazyLibs(['swiper', 'swiperModules'])(Carousel);
