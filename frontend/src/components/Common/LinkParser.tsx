import React, { Key } from 'react';
import Linkify from 'react-linkify';
import { SecureLink } from 'react-secure-link';

const LinkParser = ({ children }: { children: React.ReactNode }) => (
  <Linkify
    componentDecorator={(
      decoratedHref: string,
      decoratedText: string,
      key: Key
    ) => (
      <SecureLink target="_blank" href={decoratedHref} key={key}>
        {decoratedText}
      </SecureLink>
    )}
  >
    {children}
  </Linkify>
);

export default LinkParser;
