import { pathConfig } from '@libs/constants';
import { Leaves } from '@libs/types';
import { get, isNumber } from 'lodash';
import {
  generatePath,
  useLocation as useRRLocation,
  useNavigate as useRRNavigate,
  type NavigateOptions,
} from 'react-router-dom';

export type Path = Leaves<typeof pathConfig> | 'goBack';

type Options = NavigateOptions & {
  urlParams?: Record<string, string>;
  backPath?: Path;
};

export const useCSRNavigate = () => {
  const navigate = useRRNavigate();
  const location = useRRLocation();
  const canGoBack = location.key !== 'default';

  return (to: Path | number | '404', options?: Options) => {
    const { urlParams, backPath, ...restOptions } = options || {};
    if (to === '404') {
      return navigate('/404');
    }
    if (isNumber(to)) {
      return navigate(to);
    }
    if (to === 'goBack') {
      if (canGoBack) {
        return navigate(-1);
      }
      if (!backPath) {
        return navigate('/');
      }
    }
    const path = generatePath(get(pathConfig, to, '/'), urlParams);
    navigate(path, restOptions);
  };
};
