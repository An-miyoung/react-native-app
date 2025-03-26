import auth from '@react-native-firebase/auth';

export const createUser = async (fullName, email, password) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    await user.user.updateProfile({displayName: fullName});
    return user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return {
        error: 'Email is already in use!',
      };
    } else if (error.code === 'auth/invalid-email') {
      return {
        error: 'Please enter a valid email address!',
      };
    }
    return {error: 'Something went wrong!'};
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();
    return {
      status: true,
      data: {
        displayName: response.user.displayName,
        email: response.user.email,
        token,
      },
    };
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      return {
        error: 'Email or PassWord is wrong!',
      };
    }
    return {status: false, error: 'Somthing went wrong!'};
  }
};
