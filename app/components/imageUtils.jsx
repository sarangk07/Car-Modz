// created for nextjs image path issue with src ......
const BASE_URL = 'http://127.0.0.1:8000';
const FALLBACK_PROFILE_IMAGE = '/profile.png';

export const getUserProfileImage = (profilePic) => {
  // If profile pic exists and starts with a full URL, return it-----
  if (profilePic && profilePic.startsWith('http')) {
    return profilePic;
  }
  
  // If profile pic is a local path, return it----
  if (profilePic === './profile.png' || profilePic === '/profile.png') {
    return profilePic;
  }
  
  // If profile pic is a backend path, prepend BASE_URL------
  if (profilePic) {
    return `${BASE_URL}${profilePic}`;
  }
  
  // Return fallback image if no profile pic------
  return FALLBACK_PROFILE_IMAGE;
};