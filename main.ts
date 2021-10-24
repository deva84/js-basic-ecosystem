interface IGame {
  throw(): void
}

export class Game implements IGame{
  numberOfPlayers: number;

  constructor(number: number) {
    this.numberOfPlayers = number;
  }

  throw(): void {}
}
