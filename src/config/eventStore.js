import { db } from './firebase';
import { 
  collection, 
  query, 
  getDocs, 
  where, 
  doc, 
  getDoc,
  orderBy,
  Timestamp 
} from 'firebase/firestore';

// Function to get all events
export const getAllEvents = async () => {
  try {
    const eventsRef = collection(db, 'events');
    const querySnapshot = await getDocs(eventsRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate().toLocaleDateString() // Convert Timestamp to Date
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Function to get single event by ID
export const getEventById = async (eventId) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      return {
        id: eventDoc.id,
        ...eventDoc.data(),
        date: eventDoc.data().date?.toDate().toLocaleDateString()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// Function to filter events by category
export const getEventsByCategory = async (category) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('tags', 'array-contains', category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate().toLocaleDateString()
    }));
  } catch (error) {
    console.error('Error fetching events by category:', error);
    throw error;
  }
};

// Function to filter events by date range
export const getEventsByDateRange = async (startDate, endDate) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(
      eventsRef,
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate)),
      orderBy('date')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate().toLocaleDateString()
    }));
  } catch (error) {
    console.error('Error fetching events by date range:', error);
    throw error;
  }
};

// Function to filter events by price range
export const filterEventsByPrice = (events, priceFilter) => {
  if (priceFilter === 'free') {
    return events.filter(event => event.price.regular === 0);
  } else if (priceFilter === 'paid') {
    return events.filter(event => event.price.regular > 0);
  }
  return events;
};

// Function to search for events
export const searchEvents = async (searchTerm) => {
  try {
    const events = await getAllEvents();
    return events.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching events:', error);
    throw error;
  }
};