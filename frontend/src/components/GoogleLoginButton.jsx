import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const GoogleLoginButton = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <button onClick={handleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
