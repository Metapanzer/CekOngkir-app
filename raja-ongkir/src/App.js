import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [province, setProvince] = useState([]);
  const [originCities, setOriginCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);
  const [courier, setCourier] = useState([]);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [weight, setWeight] = useState();
  const [shippingCost, setShippingCost] = useState([]);
  const [costs, setCosts] = useState([]);

  const getProvince = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5004/rajaongkir/get-province",
        {
          headers: {
            key: "56bb1dd865e93a42dc6845196a331f8d",
          },
        }
      );
      setProvince(response.data.data.rajaongkir.province);
    } catch (error) {
      console.log(error);
    }
  };

  const getOriginCity = async (province_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5004/rajaongkir/get-city?province_id=${province_id}`,
        {
          headers: {
            key: "56bb1dd865e93a42dc6845196a331f8d",
          },
        }
      );
      setOriginCities(response.data.data.rajaongkir.city);
    } catch (error) {
      console.log(error);
    }
  };

  const getDestinationCity = async (province_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5004/rajaongkir/get-city?province_id=${province_id}`,
        {
          headers: {
            key: "56bb1dd865e93a42dc6845196a331f8d",
          },
        }
      );
      setDestinationCities(response.data.data.rajaongkir.city);
    } catch (error) {
      console.log(error);
    }
  };

  const getShippingCost = async () => {
    try {
      let response = await axios.post(
        "http://localhost:5004/rajaongkir/get-shipping-cost",
        {
          origin,
          destination,
          weight,
          courier,
        },
        {
          headers: {
            key: "56bb1dd865e93a42dc6845196a331f8d",
          },
        }
      );
      setShippingCost(response.data.data.rajaongkir.shipping_cost);
      setCosts(response.data.data.rajaongkir.shipping_cost.cost[0].costs);
      console.log(originCities);
      console.log(destinationCities);
      console.log(response.data.data.rajaongkir.shipping_cost);
      console.log(response.data.data.rajaongkir.shipping_cost.cost[0].costs);
    } catch (error) {
      console.log(error);
    }
  };

  const showSummary = () => {};

  useEffect(() => {
    getProvince();
  }, []);

  return (
    <div>
      <div>
        <h1>CekOngkir</h1>
      </div>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col">
          <h2>Origin:</h2>
          <select
            name=""
            id=""
            onClick={(event) => getOriginCity(event.target.value)}
          >
            {province.map((prov, index) => {
              return (
                <option value={prov.province_id} key={index}>
                  {prov.province}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id=""
            onClick={(event) => setOrigin(event.target.value)}
          >
            {originCities.map((city, index) => {
              return (
                <option value={city.city_id} key={index}>
                  {city.city_name}
                </option>
              );
            })}
          </select>
          <h2>Destination:</h2>
          <select
            name=""
            id=""
            onClick={(event) => getDestinationCity(event.target.value)}
          >
            {province.map((prov, index) => {
              return (
                <option value={prov.province_id} key={index}>
                  {prov.province}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id=""
            onClick={(event) => setDestination(event.target.value)}
          >
            {destinationCities.map((city, index) => {
              return (
                <option value={city.city_id} key={index}>
                  {city.city_name}
                </option>
              );
            })}
          </select>
          <h2>Courier:</h2>
          <select
            name=""
            id=""
            onClick={(event) => {
              setCourier(event.target.value);
            }}
          >
            <option value="jne">JNE</option>
          </select>
        </div>
        <div className="flex flex-col">
          <h2>Summary</h2>
          Origin: <input type="text" name="" id="" defaultValue={origin} />
          Destination :{" "}
          <input type="text" name="" id="" defaultValue={destination} />
          Courier : <input type="text" name="" id="" defaultValue={courier} />
          Weight :{" "}
          <input
            type="text"
            name=""
            id=""
            placeholder="in grams"
            onChange={(event) => setWeight(event.target.value)}
          />
          <button
            onClick={() => getShippingCost()}
            className="bg-blue-500 rounded-md p-1"
          >
            Cek Ongkir
          </button>
        </div>
      </div>
      <div className="mt-4">
        <table className="table-fixed border border-collapse">
          <thead>
            <tr>
              <td className="w-14">No</td>
              <td className="w-36">Service Name</td>
              <td className="w-36">Description</td>
              <td className="w-36">Estimation</td>
              <td className="w-36">Ongkir</td>
            </tr>
          </thead>
          <tbody>
            {costs.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.service}</td>
                  <td>{value.description}</td>
                  <td>{value.cost[0].etd} Days</td>
                  <td>Rp {value.cost[0].value}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
