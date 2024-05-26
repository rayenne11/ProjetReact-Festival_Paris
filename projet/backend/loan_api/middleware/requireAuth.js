import axios from "axios";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const response = await axios.post(
      "http://client_service:3001/api/v1/client/validate-token",
      { token }
    );
    if (response.data.valid) {
      req.client = response.data.user;
      req.token = token;
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default requireAuth;
