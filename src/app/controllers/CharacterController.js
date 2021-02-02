import api from '../services/marvelApi';
import buildMarvelApiRoute from '../utils/index';

class CharacterController {
  async index(request, response) {
    try {
      const { offset, nameStartsWith } = request.query;
      const queries = {
        limit: 10,
        offset,
        nameStartsWith,
      };

      const url = buildMarvelApiRoute('/characters', queries);

      const { data } = await api.get(url);
      return response.json({
        personagens: data.data.results,
        total: data.data.total,
      });
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const url = buildMarvelApiRoute(`/characters/${id}`);

      const { data } = await api.get(url);

      return response.json(data.data.results);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new CharacterController();
