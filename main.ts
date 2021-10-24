interface IGame {}

export class Game implements IGame{
  private players: number;

  constructor(number: number) {
    this.players = number;
  }
}
