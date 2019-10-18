import * as React from 'react';
import { TeamOwner } from '../../utils/types';
import styles from './Team.module.css';

const Team = ({ owner }: Props) => {
  return (
    <div className={styles.team}>
      <h3 className={styles.owner}>{owner.userName}</h3>
      <div className={styles.tradingBlock}>
        <div className={styles.playerContainer}>
          {owner.players
            .filter(player => player.isOnTradeBlock)
            .map(player => {
              return (
                <div
                  key={player.id}
                >{`${player.name} - ${player.position} - ${player.team}`}</div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export interface Props {
  owner: TeamOwner;
}

export default Team;
