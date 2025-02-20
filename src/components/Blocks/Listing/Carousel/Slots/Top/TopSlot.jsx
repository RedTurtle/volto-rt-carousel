import React from 'react';
import Headline from './Headline';

const TopSlot = ({ id, data = {}, listingItems, isEditMode }) => {
  const HeadlineTag = data.headlineTag || 'h2';
  return (
    <>
      {data.headline && (
        <Headline
          headlineTag={HeadlineTag}
          id={id}
          listingItems={listingItems}
          data={data}
          isEditMode={isEditMode}
        />
      )}
    </>
  );
};

export default TopSlot;
