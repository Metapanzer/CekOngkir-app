const axios = require("axios");

module.exports = {
  getProvince: async (req, res) => {
    try {
      let { key } = req.headers;

      let response = await axios.get(
        "https://api.rajaongkir.com/starter/province",
        {
          headers: {
            key: key,
          },
        }
      );

      res.status(200).send({
        isError: false,
        message: "Get Province Success!",
        data: {
          rajaongkir: {
            country: "Indonesia",
            province: response.data.rajaongkir.results,
          },
        },
      });
    } catch (error) {
      // console.log(error.response.data)
      res.status(500).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getCity: async (req, res) => {
    try {
      let { province_id } = req.query;
      let { key } = req.headers;

      if (!province_id)
        return res.status(404).send({
          isError: true,
          message: "Province_Id Not Found!",
          data: null,
        });

      let response = await axios.get(
        `https://api.rajaongkir.com/starter/city?province=${province_id}`,
        {
          headers: {
            key: key,
          },
        }
      );

      res.status(200).send({
        isError: false,
        message: "Get City Success!",
        data: {
          rajaongkir: {
            country: "Indonesia",
            city: response.data.rajaongkir.results,
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getShippingCost: async (req, res) => {
    try {
      let { origin, destination, weight, courier } = req.body;

      let { key } = req.headers;

      if (!origin || !destination || !weight || !courier)
        return res.status(404).send({
          isError: true,
          message: "Origin or Destination or Weight or Courier Not Found!",
          data: null,
        });

      let response = await axios.post(
        `https://api.rajaongkir.com/starter/cost`,
        {
          origin,
          destination,
          weight,
          courier,
        },
        {
          headers: {
            key: key,
          },
        }
      );

      res.status(200).send({
        isError: false,
        message: "Get Shipping Cost Success!",
        data: {
          rajaongkir: {
            country: "Indonesia",
            shipping_cost: {
              origin: response.data.rajaongkir.origin_details,
              destination: response.data.rajaongkir.destination_details,
              cost: response.data.rajaongkir.results,
            },
          },
        },
      });
    } catch (error) {
      res.status(500).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },
};
