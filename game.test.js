import {Game} from './main'

describe('Darts 301', () => {
  let game;

  beforeEach(() => {
    game = new Game(2);
  });

  it('should create a game with a provided number of players', () => {
    const initialState = [{index: 0, score: 301}, {index: 1, score: 301}];
    expect(game.numberOfPlayers).toBe(2);
    expect(game.players).toEqual(initialState);
  });

  it('should throw a dart to sector 10 with multiplier 3 by a player with an index 0', () => {
    expect(game.throw(10, 3, 0)).toBeInstanceOf(Game);
    expect(game.players[0].score).toEqual(271);
  });

  it('should throw error when non-existing player index or invalid multiplier is passed', () => {
    expect(() => game.score(27)).toThrow();
    expect(() => game.throw(7, 1, 27)).toThrow();
    expect(() => game.throw(10, 4, 0)).toThrow();
  });

  it('should return correct score results for each player', () => {
    game
      .throw(8, 2, 0).throw(2, 1, 0).throw(15, 3, 0).throw(1, 3, 1).throw(20, 2, 1).throw(14, 3, 1);
    expect(game.score(0)).toEqual(238);
    expect(game.score(1)).toEqual(216);
  });

});
