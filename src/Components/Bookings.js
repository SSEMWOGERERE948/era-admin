import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore'; // Import getDoc
import { db } from '../Components/firebase';
import './Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsCollection = collection(db, 'bookings');
      const bookingsSnapshot = await getDocs(bookingsCollection);
      const bookingsData = bookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingsData);
    };

    fetchBookings();
  }, []);

  const handleCheckboxChange = async (bookingId) => {
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingSnapshot = await getDoc(bookingRef);
    const bookingGranted = bookingSnapshot.data().bookingGranted;

    // Toggle the bookingGranted field between true and false
    await updateDoc(bookingRef, { bookingGranted: !bookingGranted });

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, bookingGranted: !bookingGranted } : booking
      )
    );
  };

  return (
    <div>
      <h2>Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone-Number</th>
            <th>Email</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Rooms</th>
            <th>Booking Granted</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{booking.email}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.adultCount}</td>
              <td>{booking.childrenCount}</td>
              <td>{booking.roomsCount}</td>
              <td>
                <input
                  type="checkbox"
                  checked={booking.bookingGranted}
                  onChange={() => handleCheckboxChange(booking.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
