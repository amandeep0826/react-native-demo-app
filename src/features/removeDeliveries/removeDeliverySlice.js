import {useState} from 'react';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api, {AcceptDelivery} from '../../api/api';

const [deliveryJobs, setDeliveriesJobs] = useState([]);

// const removeDeliverySlice = createSlice({
//   name: 'RemoveJobs',
//   deliveryJobs,
//   reducers: {},
// });

// export default removeDeliverySlice.reducer;

const removeJob = id => {
  const newJob = [...deliveriesJobs];
  const filteredJob = newJob.filter(job => job.id !== id);
  setDeliveriesJobs(filteredJob);
};

export const deleteJobs = createAsyncThunk('jobs/deleteJobs', () => {
  api
    .put(
      AcceptDelivery,
      {
        delivery_id: item.id,
        job_type: item.job_type,
        pickup_time: item.pickup_time,
        estimated_time: item.estimated_delivery_time,
      },
      {
        headers: headers,
      },
    )
    .then(response => {
      removeJob(item.id);
      console.log({response});
    })
    .catch(error => {
      console.log({error});
    });
});
