import { Game } from './main'
describe('Darts 301', () => {
  it('should create a game with a provided number of players', () => {
    const game = new Game(2);
    expect(game.players).toBe(2);
  })

});
