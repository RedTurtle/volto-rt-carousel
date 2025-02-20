import React from 'react';
import { ConditionalLink, UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const Bottom = ({ data }) => {
  const { linkTitle, linkHref, isEditMode } = data;
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <UniversalLink href={href}>{linkTitle || href}</UniversalLink>;
  }

  return <>{link && <div className="footer">{link}</div>}</>;
};

export default Bottom;
