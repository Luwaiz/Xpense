import { View, Text } from "react-native";
import React from "react";
import axios from "axios";
import API from "./API";
import AuthStore from "./ZustandStore";

const UserProfileHook = async () => {
    try {
        // Get Zustand store functions outside of async
        const setAvatar = AuthStore.getState().setAvatar;
        const setName = AuthStore.getState().setName;
        const setEmail = AuthStore.getState().setEmail;
        const token = AuthStore.getState().token;
        
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        const response = await axios.get(API.getProfile, header);
        if (response.status === 200) {    
          // Update Zustand state
          setName(response.data.user.name);
          setEmail(response.data.user.email);
          setAvatar(response.data.user.avatarUrl);
        }
      } catch (err) {
        console.log("Error getting profile", err.response?.data || err.message);
      }
};

export default UserProfileHook;
