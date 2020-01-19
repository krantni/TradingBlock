import * as React from 'react';
import { TeamOwner } from '../../utils/types';
import styles from './Team.module.css';

const Team = ({ owner }: Props) => {
  return (
    <div className={styles.team}>
      <div className={styles.ownerAvatar}>
        {owner.avatarID && (
          <img
            src={`https://sleepercdn.com/avatars/${owner.avatarID}`}
            alt={`${owner.userName}'s avatar`}
          />
        )}
        <h3>{owner.userName}</h3>
      </div>
      <div className={styles.tradingBlock}>
        <div className={styles.playerContainer}>
          {owner.players
            .filter(player => player.isOnTradeBlock)
            .map(player => {
              if (player.position === 'D/ST') {
                return <div key={player.id}>{`${player.name} - ${player.position}`}</div>;
              }
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
