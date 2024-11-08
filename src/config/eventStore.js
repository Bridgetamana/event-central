import { db } from './firebase';
import { 
  collection, 
  query, 
  getDocs, 
  where, 
  doc, 
  getDoc,
  orderBy,
  Timestamp, 
  addDoc, 
  updateDoc, 
  increment,
  serverTimestamp 
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

// Function to create a new ticket order
export const createTicketOrder = async (orderData) => {
  try {
    // First, check if tickets are still available
    const eventRef = doc(db, 'events', orderData.eventId);
    const eventDoc = await getDoc(eventRef);
    
    if (!eventDoc.exists()) {
      throw new Error('Event not found');
    }

    const eventData = eventDoc.data();
    const availableTickets = eventData.tickets[orderData.ticketType];

    if (availableTickets < orderData.quantity) {
      throw new Error('Not enough tickets available');
    }

    // Create the order document
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      success: true,
      orderId: orderRef.id
    };
  } catch (error) {
    console.error('Error creating ticket order:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Function to update order status after payment
export const updateOrderStatus = async (orderId, paymentData) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);
    
    if (!orderDoc.exists()) {
      throw new Error('Order not found');
    }

    const orderData = orderDoc.data();

    // Update order status
    await updateDoc(orderRef, {
      status: paymentData.status,
      paymentReference: paymentData.reference,
      paidAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // If payment was successful, update ticket count
    if (paymentData.status === 'success') {
      const eventRef = doc(db, 'events', orderData.eventId);
      await updateDoc(eventRef, {
        [`tickets.${orderData.ticketType}`]: increment(-orderData.quantity)
      });
    }

    return {
      success: true
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Function to verify payment with Paystack
export const verifyPaystackPayment = async (reference) => {
  try {
    const response = await fetch(`/api/verify-payment?reference=${reference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};