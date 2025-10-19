// hooks/useGoogleAuth.js
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import { Platform } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import API from "./API"; // your backend base URLs

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleAuth() {
  const discovery = AuthSession.useAutoDiscovery("https://accounts.google.com");

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: Constants.expoConfig.extra.googleClientId,
      scopes: ["profile", "email"],
      redirectUri: AuthSession.makeRedirectUri({
        useProxy: Platform.select({ web: false, default: true }),
      }),
    },
    discovery
  );

  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === "success") {
        const { access_token } = response.params;
        console.log("✅ Got Google token:", access_token);

        // Get user info from Google
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
        );
        const user = await userInfoResponse.json();
        console.log("👤 Google user:", user);

        // Send token or user info to your backend
        try {
          const backendResponse = await axios.post(`${API.GoogleAuth}`, {
            token: access_token,
            email: user.email,
            name: user.name,
            picture: user.picture,
          });

          console.log("✅ Backend response:", backendResponse.data);
        } catch (error) {
          console.log("❌ Backend error:", error.response?.data || error.message);
        }
      }
    };

    handleResponse();
  }, [response]);

  return { promptAsync };
}
