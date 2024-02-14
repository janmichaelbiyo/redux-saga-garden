import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PlantList() {
  const dispatch = useDispatch();

  // const reduxState = useSelector((store) => store);
  const plantList = useSelector((store) => store.plantList);

  const deleteBtn = (event, id) => {
    dispatch({ type: 'DELETE_PLANT', payload: id });
  };

  useEffect(() => {
    // dispatch an action to request the plantList from the API
    dispatch({ type: 'GET_PLANTS' });
  }, []);

  return (
    <>
      <h3>This is the plant list</h3>
      {plantList.map((plantList) => {
        return (
          <div>
            <p>{plantList.name}</p>
            <button
              type="button"
              onClick={() => {
                deleteBtn(event, plantList.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default PlantList;
