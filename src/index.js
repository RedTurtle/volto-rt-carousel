import loadable from '@loadable/component';
import { defineMessages } from 'react-intl';
import {
  CarouselTemplate,
  DefaultSlideAppearance,
  BottomCarouselSlot,
  TopCarouselSlot,
} from '@redturtle/volto-rt-carousel/components';

export {
  Carousel,
  CarouselSlide,
  DefaultSlideAppearance,
} from '@redturtle/volto-rt-carousel/components';

const messages = defineMessages({
  full_width: {
    id: 'full_width',
    defaultMessage: 'A tutta larghezza',
  },
  display_dots: {
    id: 'display_dots',
    defaultMessage: 'Mostra i puntini di scorrimento',
  },
  autoplay: {
    id: 'autoplay',
    defaultMessage: 'Autoplay',
  },
  autoplay_description: {
    id: 'autoplay_description',
    defaultMessage:
      "NOTA: Per questioni di accessibilità, è sconsigliato impostare l'autoplay attivo di default per un carosello.",
  },
  autoplay_speed: {
    id: 'autoplay_speed',
    defaultMessage: 'Velocità autoplay',
  },
  autoplay_speed_description: {
    id: 'autoplay_speed_description',
    defaultMessage: "La velocità dell'autoplay deve essere espressa in secondi",
  },
  slides_to_show: {
    id: 'slides_to_show',
    defaultMessage: 'N° di slide da mostrare',
  },
  slide_appearance: {
    id: 'slide_appearance',
    defaultMessage: 'Aspetto della slide',
  },
  view: {
    id: 'carousel_item_detail_label_default',
    defaultMessage: 'Vedi',
  },
  item_detail_label: {
    id: 'carousel_item_detail_label',
    defaultMessage: "Etichetta per il link al dettaglio dell'elemento",
  },
  head_position: {
    id: 'carousel_head_position',
    defaultMessage: "Posizione dell'intestazione",
  },
  head_position_top: {
    id: 'carousel_head_position_top',
    defaultMessage: 'Sopra',
  },
  head_position_left: {
    id: 'carousel_head_position_left',
    defaultMessage: 'A sinistra',
  },
});

const applyConfig = (config) => {
  config.settings.loadables = {
    ...(config.settings.loadables ?? {}),
    swiper: loadable.lib(() => import('swiper/react')),
    swiperModules: loadable.lib(() => import('swiper/modules')),
  };

  config.settings['volto-rt-carousel'] = {
    ...(config.settings['volto-rt-carousel'] ?? {}),
    slide_appearances: {
      default: {
        name: 'Default',
        component: DefaultSlideAppearance,
      },
      ...(config.settings['volto-rt-carousel']?.slide_appearances ?? {}),
    },
    slots: {
      top: { component: TopCarouselSlot },
      bottom: { component: BottomCarouselSlot },
    },
  };

  config.blocks.blocksConfig.listing = {
    ...config.blocks.blocksConfig.listing,
    variations: [
      ...config.blocks.blocksConfig.listing.variations,
      {
        id: 'carousel',
        isDefault: false,
        title: 'Carousel',
        template: CarouselTemplate,
        schemaEnhancer: ({ schema, formData, intl }) => {
          const fieldset = 'default';
          const beforeField = 'querystring';

          let fieldsetIndex = schema.fieldsets.findIndex(
            (x) => x.id === fieldset,
          );
          let position =
            schema.fieldsets[fieldsetIndex]?.fields.indexOf(beforeField);

          //head_position
          schema.fieldsets[fieldsetIndex]?.fields?.splice(
            position,
            0,
            'head_position',
          );
          schema.properties['head_position'] = {
            title: intl.formatMessage(messages.head_position),
            description: null,
            choices: [
              ['top', intl.formatMessage(messages.head_position_top)],
              ['left', intl.formatMessage(messages.head_position_left)],
            ],
            default: 'top',
          };
          position++;

          if (formData.head_position !== 'left') {
            //full-width
            // // eslint-disable-next-line no-unused-expressions
            schema.fieldsets[fieldsetIndex]?.fields?.splice(
              position,
              0,
              'full_width',
            );
            schema.properties['full_width'] = {
              title: intl.formatMessage(messages.full_width),
              description: null,
              type: 'boolean',
            };
            position++;
          }

          //display_dots
          schema.fieldsets[fieldsetIndex]?.fields?.splice(
            position,
            0,
            'display_dots',
          );
          schema.properties['display_dots'] = {
            title: intl.formatMessage(messages.display_dots),
            description: null,
            type: 'boolean',
            default: true,
          };
          position++;

          //autoplay
          schema.fieldsets[fieldsetIndex]?.fields?.splice(
            position,
            0,
            'autoplay',
          );
          schema.properties['autoplay'] = {
            title: intl.formatMessage(messages.autoplay),
            description: intl.formatMessage(messages.autoplay_description),
            type: 'boolean',
          };
          position++;

          //autoplay speed
          schema.fieldsets[fieldsetIndex]?.fields?.splice(
            position,
            0,
            'autoplay_speed',
          );
          schema.properties['autoplay_speed'] = {
            title: intl.formatMessage(messages.autoplay_speed),
            description: intl.formatMessage(
              messages.autoplay_speed_description,
            ),
            type: 'number',
            default: 2,
          };
          position++;

          //slides to show
          schema.fieldsets[fieldsetIndex]?.fields?.splice(
            position,
            0,
            'slides_to_show',
          );
          schema.properties['slides_to_show'] = {
            title: intl.formatMessage(messages.slides_to_show),
            type: 'number',
            default: 1,
          };

          position++;

          //appearance slide
          // let choices = [
          //   [
          //     SliderTemplateAppearance_SIMPLECARD,
          //     intl.formatMessage(messages.slider_listing_appearance_simplecard),
          //   ],
          //   [
          //     SliderTemplateAppearance_IMAGECARD,
          //     intl.formatMessage(messages.slider_listing_appearance_imagecard),
          //   ],
          // ];

          let choices = [];
          Object.keys(
            config.settings['volto-rt-carousel'].slide_appearances,
          ).forEach((a) => {
            choices.push([
              a,
              config.settings['volto-rt-carousel'].slide_appearances[a].name,
            ]);
          });

          if (choices.length > 1) {
            schema.fieldsets[fieldsetIndex]?.fields?.splice(
              position,
              0,
              'slide_appearance',
            );
            schema.properties['slide_appearance'] = {
              title: intl.formatMessage(messages.slide_appearance),
              type: 'text',
              choices: choices,
              default: 'default',
            };

            position++;
          }

          //item_detail_label
          // // eslint-disable-next-line no-unused-expressions
          schema.fieldsets[fieldsetIndex]?.fields?.splice(
            position,
            0,
            'item_detail_label',
          );
          schema.properties['item_detail_label'] = {
            title: intl.formatMessage(messages.item_detail_label),
            description: null,
            default: intl.formatMessage(messages.view),
          };
          position++;

          return schema;
        },
      },
    ],
  };
  return config;
};

export default applyConfig;
