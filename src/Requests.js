const key = '05e1c39526cfcad16d30aae45602a17f';

const requests = {
  requestTrending: `https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=${key}`,
  requestPopularMovies: `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${key}`,
  requestPopularShows: `https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=${key}`,
};

export default requests;
