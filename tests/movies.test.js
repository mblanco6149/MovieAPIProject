const MovieService = require('../src/services/MovieService');

describe('Movie Service', () => {
  it('should fetch movies with random suggestionScore', async () => {
    const movieService = new MovieService();
    const movies = await movieService.searchMovies('matrix');
    expect(Array.isArray(movies)).toBe(true);
    expect(movies.length).toBeGreaterThan(0);
    expect(movies[0]).toHaveProperty('suggestionScore');
  });
});