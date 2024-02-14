import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PlantList() {
  const dispatch = useDispatch();

  const reduxState = useSelector((store) => store);

  useEffect(() => {
    // dispatch an action to request the plantList from the API
    dispatch({ type: 'GET_PLANTS' });
  }, []);

  const deleteBtn = (event, id) => {
    dispatch({ type: 'DELETE_PLANT', payload: id });
  };

  return (
    <>
      <h3>This is the plant list</h3>
      {/* {reduxState.map((plant) => {
        return ( */}
      <div>
        <p>{reduxState.plantList.name}</p>
        <button
          type="button"
          onClick={() => {
            deleteBtn(event, plant.id);
          }}
        >
          Delete
        </button>
      </div>
      {/* );
      })} */}
    </>
  );
}

export default PlantList;
