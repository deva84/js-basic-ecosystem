interface IGame {
  throw(sector: number, mult: EMult, index: number): this | never;
  instantiateGame(num: number): IPlayer[];
  score(index: number): number;
}

enum EMult {
  One = 1,
  Two = 2,
  Three = 3,
}

interface IPlayer {
  index: number;
  score: number;
}

export class Game implements IGame {
  public numberOfPlayers: number;
  public initialScore = 301;
  protected players: IPlayer[];
  protected winner: number | undefined;

  constructor(number: number) {
    this.numberOfPlayers = number;
    this.players = this.instantiateGame(this.numberOfPlayers);
  }

  throw(sector: number, mult: EMult, index: number): this | never {
    if (!Object.values(EMult).includes(mult) || this.numberOfPlayers <= index) {
      throw new Error('Invalid parameter!')
    }
    const player = this.players.find(p => p.index === index);
    player.score = player.score - sector * mult;
    return this;
  }

  instantiateGame(num: number): IPlayer[] {
    let listOfPlayers = [];
    for (let i = 0; i < num; i++) {
      listOfPlayers.push({index: i, score: this.initialScore});
    }
    return listOfPlayers;
  }

  score(index: number): number {
    if (this.numberOfPlayers <= index) {
      throw new Error('Invalid parameter!')
    }
    const player = this.players.find(p => p.index === index);
    return player.score;
  }
}
