import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Add new user
export const signupUser = async (email, password, firstName, lastName) => {
  const auth = getAuth();
  const db = getFirestore();
  
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      firstName,
      lastName,
      email,
      displayName: `${firstName} ${lastName}`,
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      },
      message: 'Account created successfully!'
    };
  } catch (error) {
    let errorMessage = 'Failed to create account';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email already in use';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      default:
        errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

// Sign in user 
export const login = async (email, password) => {
    const auth = getAuth();
    const db = getFirestore();

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      const userData = userDoc.exists() ? userDoc.data() : {};

      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          ...userData 
        },
        message: 'Logged in successfully!'
      };
    } catch (error) {
      let errorMessage = 'Failed to login';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        default:
          errorMessage = error.message;
      }
  
      throw new Error(errorMessage);
    }
  };

  // Reset password
export const resetPassword = async (email) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent successfully!'
    };
  } catch (error) {
    let errorMessage = 'Failed to send reset email';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many requests. Please try again later';
        break;
      default:
        errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};