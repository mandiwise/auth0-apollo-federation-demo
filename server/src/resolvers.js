const fetch = require("node-fetch");

const apiUrl = process.env.REST_API_URL;

const resolvers = {
  Mission: {
    crew(mission) {
      const params = mission.crew.map(id => `id=${id}`).join("&");
      if (params) {
        return fetch(`${apiUrl}/astronauts?${params}`).then(res => res.json());
      } else {
        return null;
      }
    }
  },

  Query: {
    astronaut(_, { id }) {
      return fetch(`${apiUrl}/astronauts/${id}`).then(res => res.json());
    },
    astronauts() {
      return fetch(`${apiUrl}/astronauts`).then(res => res.json());
    },
    mission(_, { id }) {
      return fetch(`${apiUrl}/missions/${id}`).then(res => res.json());
    },
    missions() {
      return fetch(`${apiUrl}/missions`).then(res => res.json());
    }
  }
};

module.exports = resolvers;
