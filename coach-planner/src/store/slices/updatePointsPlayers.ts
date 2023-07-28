import { Player } from './constants';

export const updatePointsPlayers = (players: Record<string, Player>, difference: number) => {
  const newPlayers = Object.values(players).map((player) => {
    const newPlayer: Player = { ...player, point: player.point.map((point) => point * difference) };
    return newPlayer;
  });
  return newPlayers.reduce((prev, curr) => {
    prev[curr.id] = curr;
    return prev;
  }, {} as Record<string, Player>);
};
