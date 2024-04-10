import { useState } from "react";
import { carsCollection, firebaseTimestamp } from "../../utils/firebase";

const AddCarFrom = () => {
  const [data, setData] = useState({
    brand: "",
    color: "",
    price: "",
    available: true,
  });
  const submit = (e) => {
    e.preventDefault();
    carsCollection
      .add({
        ...data,
        price: +data.price,
        available: data.available === "true",
        createdAt: firebaseTimestamp(),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="">Brand</label>
          <input
            type="text"
            className="from-control"
            name="brand"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Color</label>
          <input
            type="text"
            className="from-control"
            name="color"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            type="number"
            className="from-control"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Available</label>
          <select
            className="from-control"
            name="available"
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default AddCarFrom;
