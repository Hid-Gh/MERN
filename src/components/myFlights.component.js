import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import styles from './myFlights.css';
import { useLocation } from 'react-router-dom';

function MyFlights() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const parts = location.pathname.split('/');
        const userId = parts[2];
        setUserId(userId);
        const response = await axios.get(`https://azuretravel.onrender.com/api/v1/myFlights/${userId}`);
        const data = response.data;
        setBookings(data.flights);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [location]);

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(`https://azuretravel.onrender.com/api/v1/myFlights/${userId}`);
      console.log(response.data);
      setBookings([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.myFlights}>
      <h2>Flight History</h2>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Price</th>
              <th>Flight Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.destinationName}</td>
                <td>{booking.cost} {booking.destinationCurrency}</td>
                <td>{format(new Date(booking.flightDate), 'MM/dd/yyyy')}</td>
                <td>{format(new Date(booking.returnDate), 'MM/dd/yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleDeleteAll} className="deleteButton">
          Delete All
        </button>
      </div>
    </div>
  );
}

export default MyFlights;