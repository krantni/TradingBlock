import * as React from 'react';
import { TradingBlockData, TradingBlockActions } from 'utils/types';
import { initialData, tradingBlockReducer } from './reducer';
import { useHistory } from 'react-router';
import getLeagueTradingBlock from 'api';

const AppContext = React.createContext<{
  data: TradingBlockData;
  dispatch: React.Dispatch<TradingBlockActions>;
}>({
  data: initialData,
  dispatch: () => {
    console.log('here');
  },
});

export const useAppContext = () => {
  return React.useContext(AppContext);
};

const Provider = ({ children }: Props) => {
  const history = useHistory();
  const pathname = history.location.pathname.substr(1);

  const [data, dispatch] = React.useReducer(tradingBlockReducer, initialData);

  React.useEffect(() => {
    if (pathname) {
      getLeagueTradingBlock(pathname, dispatch);
    }
    // eslint-disable-next-line
  }, []);

  return <AppContext.Provider value={{ data, dispatch }}>{children}</AppContext.Provider>;
};

interface Props {
  children: React.ReactNode;
}

export default Provider;
