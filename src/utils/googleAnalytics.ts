import ReactGA from 'react-ga';
import { Settings } from './types';

export const logSettings = (settings: Settings) => {
  Object.keys(settings).forEach(key => {
    ReactGA.event({
      category: 'Settings',
      action: `Toggled: ${key}: ${settings[key as keyof Settings]}`,
    });
  });
};
