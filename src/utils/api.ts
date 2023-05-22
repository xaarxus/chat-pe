const api = {
  signIn: (url: string) => `${url}/auth/signIn`,
  signUp: (url: string) => `${url}/auth/register`,
};

export default api;