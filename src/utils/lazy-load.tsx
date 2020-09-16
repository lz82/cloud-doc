import React from 'react';
import loadable from '@loadable/component';

import Loading from '@/components/loading';

export default (path: string) => {
  return loadable(() => path, {
    fallback: (
      <div>
        <Loading />
      </div>
    )
  });
};
