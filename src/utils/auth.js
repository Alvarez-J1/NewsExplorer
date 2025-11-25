export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ token: "fake-jwt-token-12345" });
    }, 1000);
  });
};

export const register = (email, password, username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          email: email,
          password: password,
          username: username,
          _id: "fake-user-id-67890",
        },
      });
    }, 1000);
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          name: "John Doe",
          email: "john@example.com",
          _id: "fake-user-id-67890",
        },
      });
    }, 500);
  });
};
