import { useEffect, useState } from "react";
import { carsCollection } from "../../utils/firebase";
import { mapArrayFromSnaphot } from "../../utils/mapFirebaseObjToObjectWithId";
import AddCarFrom from "../addCarFrom/addCarForm";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [startAt, setStartAt] = useState(1);
  const [endAt, setEndAt] = useState(100);
  const getCars = async () => {
    try {
      const cars = await carsCollection
        .orderBy("price")
        .startAt(startAt)
        .endAt(endAt)
        .get();
      setCars(mapArrayFromSnaphot(cars));
    } catch (err) {}
  };

  useEffect(() => {
    getCars();
  }, [startAt, endAt]);

  const tableElem = ({ id, brand, color, price }) => {
    return (
      <tr key={id}>
        <th>{id}</th>
        <th>{brand}</th>
        <th>{color}</th>
        <th>{price}</th>
      </tr>
    );
  };
  const carsTable = () => {
    if (cars.length > 0) {
      console.log(cars);
      return cars.map((car) => tableElem(car));
    }
    return null;
  };
  const sortByPrice = (start, end) => {
    setStartAt(start);
    setEndAt(end);
  };

  return (
    <>
      <AddCarFrom />
      <button
        onClick={() => {
          sortByPrice(1, 500);
        }}
      >
        1- 500
      </button>
      <button
        onClick={() => {
          sortByPrice(501, 1000);
        }}
      >
        501- 1000
      </button>
      <button
        onClick={() => {
          sortByPrice(1001, 5000);
        }}
      >
        1001- 1500
      </button>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{carsTable()}</tbody>
      </table>
    </>
  );
};
carsCollection.onSnapshot((snap) => console.log(mapArrayFromSnaphot(snap)));

export default Cars;
