export const isLoggedIn = () => {
  return typeof window !== "undefined" && localStorage.getItem("token");
};