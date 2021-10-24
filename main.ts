interface IGame {
  throw(): void
}

export class Game implements IGame{
  players: number;

  constructor(number: number) {
    this.players = number;
  }

  throw(): void {}
}
