import React, { useMemo } from 'react';
import Slugger from 'github-slugger';
import cx from 'classnames';
import { renderLinkElement } from '@plone/volto-slate/editor/render';
import { normalizeString } from '@plone/volto/helpers';

const Headline = ({ headlineTag, id, data = {}, listingItems, isEditMode }) => {
  let attr = { id };
  const slug = Slugger.slug(normalizeString(data.headline));
  attr.id = slug || id;
  const LinkedHeadline = useMemo(
    () => renderLinkElement(headlineTag),
    [headlineTag],
  );
  return (
    <LinkedHeadline
      mode={!isEditMode && 'view'}
      children={data.headline}
      attributes={attr}
      className={cx('headline', {
        emptyListing: !listingItems?.length > 0,
      })}
    />
  );
};

export default Headline;
