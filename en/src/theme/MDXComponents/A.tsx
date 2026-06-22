import React, { type ComponentProps } from 'react';
import OriginalA from '@theme-original/MDXComponents/A';
import { InsideAnchorContext } from './AnchorContext';

type Props = ComponentProps<typeof OriginalA>;

export default function AWrapper(props: Props): React.ReactElement {
  return (
    <InsideAnchorContext.Provider value={true}>
      <OriginalA {...props} />
    </InsideAnchorContext.Provider>
  );
}
