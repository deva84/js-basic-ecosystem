import { Game } from './main'

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

  it('should check if method score exists', () => {
    expect(game.score).toBeDefined();
  })



});
