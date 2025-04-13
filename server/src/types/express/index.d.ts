declare namespace Express {
  interface Request {
      user: {
        _id: unknown;
        username: string;
        email: string;
      };
    }
  }