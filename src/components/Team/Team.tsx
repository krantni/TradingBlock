import * as React from "react";
import { TeamOwner } from "utils/types";
import styles from "./Team.module.css";
import { useAppContext } from "provider/Provider";

const Team = ({ owner }: Props) => {
  const {
    data: {
      settings: { fullRosters, showTeamNames, showNicknames }
    }
  } = useAppContext();

  const players = fullRosters
    ? owner.players
    : owner.players.filter(player => player.isOnTradeBlock);

  let currentPosition = "";
  return (
    <div className={styles.blockTeam}>
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
            const insertPosition = player.position !== currentPosition;
            if (insertPosition) currentPosition = player.position;
            const nickname = player.nickname.replace(/otb/gi, "");
            return (
              <div key={player.id} className={styles.playerRow}>
                <span className={styles.position}>
                  {insertPosition && player.position}
                </span>
                <span className={styles.name}>
                  {player.name}
                  {showTeamNames && player.position !== "D/ST" && (
                    <small>{player.team}</small>
                  )}
                </span>
                {showNicknames && nickname && (
                  <span className={styles.nickname}>{nickname}</span>
                )}
              </div>
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
