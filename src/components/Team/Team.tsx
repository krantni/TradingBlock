import * as React from "react";
import { TeamOwner } from "utils/types";
import styles from "./Team.module.css";
import { useAppContext } from "provider/Provider";

const Team = ({ owner }: Props) => {
  const {
    data: {
      settings: { fullRosters }
    }
  } = useAppContext();

  const players = fullRosters
    ? owner.players
    : owner.players.filter(player => player.isOnTradeBlock);
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
          {players.map(player => {
            if (player.position === "D/ST") {
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
