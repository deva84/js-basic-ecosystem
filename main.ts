interface IGame {}

export class Game implements IGame{
  players: number;

  constructor(number: number) {
    this.players = number;
  }
}
