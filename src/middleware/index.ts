import { verifyToken } from "./token";
export const Response = async (
  req: any,
  res: any,
  next: any,
  middleware: any,
  isToken = true
) => {
  try {
    if (verifyToken(req, res, isToken)) {
      const token = req.headers["access-token"];
      const middleWareResponse = await middleware(req, token);
      if ([200, 201].find((element) => element === middleWareResponse.status)) {
        res.status(middleWareResponse.status).send({
          status: middleWareResponse.status,
          error: false,
          body: middleWareResponse.body,
        });
      } else {
        res.status(middleWareResponse.status).send({
          status: middleWareResponse.status,
          error: true,
          body: middleWareResponse.body,
        });
      }
    } else {
      res.status(401).send({
        status: 401,
        error: true,
        body: "Not Authorized",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      error: true,
      body: error.message,
    });
  }
};
