import React from 'react';
import { ConditionalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';

import './defaultAppearance.less';

const DefaultAppearance = ({ item, TitleTag, isEditMode, index, data }) => {
  const Image = config.getComponent({ name: 'Image' }).component;

  return (
    <div className="default-appearance">
      <ConditionalLink
        item={item}
        condition={!isEditMode}
        aria-label={data.item_detail_label}
      >
        {item.image && (
          <Image
            className="item-image"
            alt={item.title}
            title={item.title}
            item={item}
            imageField="image"
            responsive={true}
          />
        )}
        <div className="text">
          <TitleTag>{item.title ? item.title : item.id}</TitleTag>
          <p>{item.description}</p>
        </div>
      </ConditionalLink>
    </div>
  );
};
export default DefaultAppearance;
