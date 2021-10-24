import { Game } from './main'

describe('Darts 301', () => {
  let game;

  beforeEach(() => {
    game = new Game(2);
  });

  it('should create a game with a provided number of players', () => {
    expect(game.players).toBe(2);
  });

  it('should check if a method throw exists', () => {
    expect(game.throw).toBeDefined();
  });

});
