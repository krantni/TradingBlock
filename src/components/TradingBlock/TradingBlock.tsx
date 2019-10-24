import * as React from 'react';
import styles from './TradingBlock.module.css';
import Team from '../Team';
import { TeamOwner } from '../../utils/types';

const TradingBlock = ({ teamOwners }: Props) => {
  return (
    <>
      <div className={styles.teams}>
        {teamOwners.map(teamOwner => {
          return (
            <div className={styles.teamContainer} key={teamOwner.userID}>
              <Team owner={teamOwner} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export interface Props {
  teamOwners: TeamOwner[];
}

export default TradingBlock;
