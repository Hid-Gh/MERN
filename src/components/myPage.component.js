import React, { useState, useEffect } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './myPage.css';
import axios from 'axios';

function TripBooking() {
  const [destination, setDestination] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [password, setPassword] = useState('');
  const [flightDate, setFlightDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [cost, setCost] = useState(0);
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [destinationId, setDestinationId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const parts = location.pathname.split('/');
        const destinationId = parts[4];
        const userId = parts[6];
        setDestinationId(destinationId);
        setUserId(userId);
        const response = await axios.get(`https://azureTravel.onrender.com/api/v1/destination/${destinationId}/user/${userId}`);
        const destinationData  = response.data.destination;
        const userData = response.data.user;
        setFirstName(userData.fName);
        setLastName(userData.lName);
        setEmail(userData.email);
        setNationality(userData.nationality);
        setDestination(destinationData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]);

  const updateUserInfo = async (userInfo) => {
    try { 
      const response = await axios.patch(`https://azureTravel.onrender.com/api/v1/destination/${destinationId}/user/${userId}`, userInfo);
      const updatedUser = response.data.user;
      alert('User information updated successfully');
      return updatedUser;
    } catch (error) {
      alert('Failed to update user information');
      console.error(error);
      return null;
    }
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

  if (!isFormValid) {
    alert('Please fill out all fields');
    return;
  }

  // calculate cost based on number of days between flightDate and returnDate
  const days = Math.ceil((returnDate - flightDate) / (800 * 60 * 60 * 24));
  let newCost = 1000 - Math.floor((days - 5) / 2) * 10;
  if (newCost < 400) {
    newCost = 400;
  }
  setCost(newCost);
  const updatedUser = await updateUserInfo( { fName: firstName, lName: lastName, email, password, nationality });
  if (updatedUser) {
    try {
     
        await axios.post(`https://azureTravel.onrender.com/api/v1/myFlights/${userId}`, {
      
        destinationName: destination.name,
        destinationCurrency: destination.currency,
        cost: newcost,
        flightDate: flightDate,
        returnDate: returnDate
      });
     //const flight = response.data.flight;
      alert('Flight created successfully');
     navigate('/payment');
    
    } catch (error) {
      alert('Failed to create flight');
      console.error(error);
    }
  }
  };
 
  if (!destination) {
    return <div>Loading...</div>;
  }

  const isFormValid = firstName && lastName && email && nationality && flightDate && returnDate;

  return (
    <div className="trip-booking">
      {/* I will have to add the link of the user */}
      
      <Link to={`/myFlights/${userId}`} className="fancy-button">
        <span>My Flights</span>
      </Link>
      <img src={destination.image} alt={destination.name} />
      <div className="trip-booking-info">
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <p>Continent: {destination.continent}</p>
        <p>Climate: {destination.climate}</p>
        <p>Best Time to Visit: {destination.bestTimeToVisit}</p>
        <p>Language: {destination.language}</p>
        <p>Currency: {destination.currency}</p>
        <div className="button-container" >
          <Link to="/destinations" className="button" >Back to Destinations</Link>
        </div>
      </div>
      <div className="booking-form">
        <h3>Book Your Trip</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
            <small>Max of 50 characters and min of 3 </small> 
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />
            <small>Max of 50 characters and min of 3 </small> 
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input type="text" id="nationality" value={nationality} onChange={(event) => setNationality(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <small>At least 6 characters</small>   
          </div>
          <div className="form-group">
            <label htmlFor="flightDate">Flight Date</label>
            <DatePicker id="flightDate" selected={flightDate} onChange={(date) => setFlightDate(date)} />
          </div>
          <div className="form-group">
            <label htmlFor="returnDate">Return Date</label>
            <DatePicker id="returnDate" selected={returnDate} onChange={(date) => setReturnDate(date)} />
          </div>
          <div >
          {/* disabled={!isFormValid} */}
            <button type="submit" className="button" >Pay</button>
            {/* <Link to={`/payment`}>Pay</Link> */}
          </div>
        </form>
        {cost > 0 && (
          <div className="cost">
            <h3>Total Cost: {cost} {"EUR"}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripBooking;