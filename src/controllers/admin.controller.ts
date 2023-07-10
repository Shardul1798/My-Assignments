import Admins from "../../database/models/admins.model";
// import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../middleware/admin.auth";
import Session from "../../database/models/session.model";
import { secretkey } from "../../app";
import * as jwt from 'jsonwebtoken';
import { adminService } from "../services/admin.service";


class AdminController {
  async checkUserExists(req: any, res: any) {
    try {
      const { username } = req.body;
      const result: any = await Admins.findOne({
        where: { username: username },
        raw: true,
      });
      console.log("exist or not ============= ", result);
      if (result && result.username) {
        return res.status(401).json({ message: "User already exists!" });
      }
      return res.status(200).json({ user: "false " });
    } catch (error) {
      console.error(`we have an error ====>`, error);
    }
  }
  async loginHandler(req: any, res: any) {
    try {
      const { username, password } = req.body;
      const findId: any = await Admins.findOne({
        where: { username: username },
        raw: true,
      });
      const matchPassword = await bcrypt.compare(password, findId.password);
      if (matchPassword) {
        const result: any = await Admins.findOne({
          where: { username: username, password: findId.password },
          raw: true,
        });
        if (result) {

          const expiryTime = Date.now() + 60 * 60 * 24; 
          const sessionCreate:any = await Session.create({
            userId: result.id,
            expiryTime: expiryTime
          });
          const resp:any = await generateAuthToken(result.id, sessionCreate.id);
          res.json({
            statusCode: 200,
            message: "Login successful",
            data: resp.accessToken,
          });
        } else {
          res.status(401).json({ error: "Invalid username or password" });
        }
      } else {
        res.status(401).json({ error: "Invalid Password!" });
      }
    } catch (error) {
      console.error(`we have an error ====>`, error);
    }
  }

  async RegisterHandler(req: any, res: any) {
    try {
      const { username, email, password } = req.body;
      const findUser: any = await Admins.findOne({
        where: { username: username },
        raw: true,
      });
      if (findUser.username === username) {
        return res.status(400).json({ error: "User already exists!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!hashedPassword) {
        return res.status(500).json({ error: "Internal Server Error;" });
      }
      const result = await Admins.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      if (!result) {
        return res.status(401).json({ error: "Something went wrong!" });
      }
      return res.json({
        statusCode: 200,
        message: "User Registered Succesfully!",
        data: result,
      });
    } catch (errors) {
      return res.status(401).json({ error: errors });
    }
  }

  async logout(req, res) {
    try {
      const authorization = req.headers.authorization;
      const [authType, token] = authorization.split(/\s+/);
      let decodedData = jwt.verify(token, secretkey);
      if (!token) {
        res
          .status(401)
          .set("WWW-Authenticate", 'Basic realm="Authentication required"')
          .send("Unauthorized");
        return;
      }
      const destroySession = await Session.destroy({
        where: { id: decodedData.sessionId },
      });
      console.log("Token Expired => \n", decodedData.sessionId);
      if (destroySession) {
        return res.status(200).json({ message: "Logged out successfully" });
      } else {
        return res.status(500).json({ error: "Internal Server error!" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async changePassword(req, res) {
    try {
      const { username, oldPassword, newPassword } = req.body;
      const result = await adminService.updateAdminPassword(username, oldPassword, newPassword);
      if(result) {
        return res.status(200).json({message: result.message});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: 'Something went wrong!'});
    }
  }
}

export const adminController = new AdminController();
