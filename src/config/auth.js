import { getAuth, createUserWithEmailAndPassword, 
updateProfile } from 'firebase/auth';

// Add new user
export const signupUser = async (email, password, firstName, lastName) => {
  const auth = getAuth();
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    return {
      success: true,
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