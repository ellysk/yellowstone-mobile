const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const config = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};
