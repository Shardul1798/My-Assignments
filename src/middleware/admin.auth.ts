import * as jwt from "jsonwebtoken";
import { secretkey } from "../../app";
import * as Joi from "joi";
import Session from "../../database/models/session.model";

export let generateAuthToken = async function (userId: any, sessionId: any) {
  if (!userId) {
    return Promise.reject("Tokenization Error");
  } else {
    try {
      //Session ID along with userId
      const token = await jwt.sign(
        { id: userId, sessionId: sessionId },
        secretkey,
        {
          expiresIn: "24h",
        }
      );
      return { accessToken: token };
    } catch (error) {
      console.log("Tokenization Error");
      return Promise.reject("Authentication failed!");
    }
  }
};

export let validateAuthToken = async function (req, res, next) {
  try {
    console.log(req.body, )
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const [authType, token] = authorization.split(/\s+/);
    if (!token) {
      res
        .status(401)
        .set("WWW-Authenticate", 'Basic realm="Authentication required"')
        .send("Unauthorized");
      return;
    }
    let authorizeToken = await decodeToken(token);
    if (!authorizeToken) {
      res
        .status(401)
        .set("WWW-Authenticate", 'Basic realm="Authentication required"')
        .send("Unauthorized");
      return;
    }
    const haveSession: any = await Session.findOne({
      where: { id: authorizeToken.sessionId, userId: authorizeToken.id },
      raw: true,
    });
    if (haveSession) {
      next();
      return "validated";
    } else {
      return res
        .status(440)
        .send({ message: "Your session has been expired!" });
    }
  } catch (error) {
    return res
      .status(401)
      .set("WWW-Authenticate", 'Basic realm="Authentication required"')
      .send("Unauthorized");
  }
};

export let decodeToken = async function (token: string) {
  let decodedData = jwt.verify(token, secretkey);
  if (decodedData) {
    return decodedData;
  } else {
    return Promise.reject("Invalid Token!");
  }
};

export let checkBasicAuthAndValidate = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      // alphanum().min(8).max(25).
    });

    const result: any = schema.validate(req.body);
    if (result && result.error) {
      return res.status(400).json({
        error: result.error.details.map(function (el) {
          return el.message;
        }),
      });
    }

    const authorization = req.headers.authorization;
    const [authType, token] = authorization.split(/\s+/);
    if (!token) {
      res
        .status(401)
        .set("WWW-Authenticate", 'Basic realm="Authentication required"')
        .send("Authentication required");
      return;
    }
    let checkFunction = basicAuthFunction(token);
    console.log("______________Test____________\n", checkFunction);

    if (!checkFunction) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    next();
  } catch (Error) {
    console.log(Error);
    res.status(401).json({ message: "Catch error Unauthorized!" });
  }
};

let basicAuthFunction = function (access_token: string) {
  const credentials = Buffer.from(access_token, "base64").toString("ascii");
  const [username, password] = credentials.split(":");
  if (username == "Shardul" && password == "shardul@1797") {
    return true;
  }
  return false;
};
