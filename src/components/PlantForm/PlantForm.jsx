import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const PlantForm = () => {
  const dispatch = useDispatch();

  //Initial state is an OBJECT, with keys id and name
  let [newPlant, setPlant] = useState({
    name: '',
    kingdom: '',
    clade: '',
    order: '',
    family: '',
    subfamily: '',
    genus: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    //Similar to in redux -- we dont want to get rid of the id field when we update name
    setPlant({ ...newPlant, [name]: value });
  };

  const addNewPlant = (event) => {
    event.preventDefault();
    dispatch({ type: 'POST_PLANT', payload: newPlant });
    //updates the next plant to have a new id
    setPlant({
      name: '',
      kingdom: '',
      clade: '',
      order: '',
      family: '',
      subfamily: '',
      genus: '',
    });
  };
  return (
    <div>
      <h3>This is the form</h3>
      <pre>{JSON.stringify(newPlant)}</pre>
      <form onSubmit={addNewPlant}>
        <input
          name="name"
          placeholder="name"
          type="text"
          value={newPlant.name}
          onChange={handleChange}
        />
        <input
          name="kingdom"
          placeholder="kingdom"
          type="text"
          value={newPlant.kingdom}
          onChange={handleChange}
        />
        <input
          name="clade"
          placeholder="clade"
          type="text"
          value={newPlant.clade}
          onChange={handleChange}
        />
        <input
          name="order"
          placeholder="order"
          type="text"
          value={newPlant.order}
          onChange={handleChange}
        />
        <input
          name="family"
          placeholder="family"
          type="text"
          value={newPlant.family}
          onChange={handleChange}
        />
        <input
          name="subfamily"
          placeholder="subfamily"
          type="text"
          value={newPlant.subfamily}
          onChange={handleChange}
        />
        <input
          name="genus"
          placeholder="genus"
          type="text"
          value={newPlant.genus}
          onChange={handleChange}
        />
        <input type="submit" value="Add New Plant" />
      </form>
    </div>
  );
};

export default PlantForm;
