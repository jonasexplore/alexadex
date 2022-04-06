const axios = require("axios").default;

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

module.exports = {
  httpService: {
    getPokemon: async (name) => {
      const response = await api.get(`/${name}`);
      return response.data;
    },
  },
};
