import { Game } from './main'

describe('Darts 301', () => {
  let game;

  beforeEach(() => {
    game = new Game(2);
  });

  it('should create a game with a provided number of players', () => {
    expect(game.numberOfPlayers).toBe(2);
  });

  it('should check if a method throw exists', () => {
    expect(game.throw).toBeDefined();
  });

  it('should throw a dart to sector 10 with multiplier 3 by a player with an index 0', () => {
    expect(game.throw(10, 3, 0)).toBeInstanceOf(Game);
  });

});
