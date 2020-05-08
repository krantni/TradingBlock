import React from 'react';
import TradingBlock from 'views/TradingBlock';
import { useAppContext } from 'provider/Provider';
import styles from './Content.module.css';

const Content: React.FC = () => {
  const {
    data: { teamOwners },
  } = useAppContext();

  const [selectedView, changeView] = React.useState<'trading' | 'history'>('trading');

  return (
    <div className={styles.contentContainer}>
      <div className={styles.tabs}>
        <span className={styles.flexGrow1}></span>
        <div className={selectedView === 'trading' ? styles.selectedTab : styles.tab} onClick={() => changeView('trading')}>
          <h3>Trading Block</h3>
        </div>
        <span className={styles.flexGrow2}></span>
        <div className={selectedView === 'history' ? styles.selectedTab : styles.tab} onClick={() => changeView('history')}>
          <h3>Player History</h3>
        </div>
        <span className={styles.flexGrow1}></span>
      </div>
      {selectedView === 'trading' && <TradingBlock teamOwners={teamOwners} />}
    </div>
  );
};

export default Content;
