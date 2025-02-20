import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from '@redturtle/volto-rt-carousel';
import config from '@plone/volto/registry';
import './carouselTemplate.less';

const CarouselTemplate = (props) => {
  const {
    headlineTag,
    items,
    isEditMode,
    autoplay,
    autoplay_speed,
    slides_to_show,
    display_dots,
    full_width,
    head_position,
    slide_appearance = 'default',
    ...data
  } = props;

  const getTitleTag = (tag) => {
    const level = tag.slice(-1);
    if (/\d/.test(level)) {
      return `h${Number(level) + 1}`;
    } else {
      return 'h3';
    }
  };
  const TitleTag = headlineTag ? getTitleTag(headlineTag) : 'h3';

  const SlideComponent =
    config.settings['volto-rt-carousel'].slide_appearances[slide_appearance]
      .component;

  const TopSlotComponent =
    config.settings['volto-rt-carousel'].slots?.['top']?.component;
  const BottomSlotComponent =
    config.settings['volto-rt-carousel'].slots?.['bottom']?.component;
  //options
  let carouselOptions = {
    slidesPerView: slides_to_show,
    displayDots: display_dots,
  };
  if (autoplay) {
    carouselOptions.autoplay = true;
    carouselOptions.autoplayDelay = autoplay_speed * 1000;
  }

  let TopSlot = TopSlotComponent;
  let BottomSlot = BottomSlotComponent;
  if (head_position === 'left') {
    //group topSlot and bottomSlot inside a div
    if (TopSlotComponent || BottomSlotComponent) {
      TopSlot = ({ data }) => (
        <div className="top">
          {TopSlotComponent && <TopSlotComponent data={data} />}
          {BottomSlotComponent && <BottomSlotComponent data={data} />}
        </div>
      );
      BottomSlot = null;
    }
  }
  return (
    <div
      className={`ui container carousel-template-wrapper head-position-${
        head_position ?? 'top'
      }`}
    >
      {TopSlot && <TopSlot data={props} />}
      <Carousel
        items={items}
        slideComponent={({ item, index }) => (
          <SlideComponent
            item={item}
            index={index}
            TitleTag={TitleTag}
            isEditMode={isEditMode}
            data={data}
          />
        )}
        full_width={full_width && head_position !== 'left'}
        className={slide_appearance}
        isEditMode={isEditMode}
        {...carouselOptions}
      />
      {BottomSlot && <BottomSlot data={props} />}
    </div>
  );
};
CarouselTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};
export default CarouselTemplate;
