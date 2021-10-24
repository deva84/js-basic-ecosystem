import { Game } from './main'
describe('Darts 301', () => {
  it('should handle clean game', () => {
    const game = new Game();
    expect(game).toBeTruthy();
  })

});
