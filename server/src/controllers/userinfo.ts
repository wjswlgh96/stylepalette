import { NextFunction, Request, Response } from "express";
import { ITokenInfo, IPatchUserInfo, ICheckUser } from "../interfaces/IUserinfo";
import { verify } from "jsonwebtoken"
import { userinfo } from "../service";
import dotenv from "dotenv"
dotenv.config()

const getUserinfo = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.jwt) {
    const accessSecret = process.env.ACCESS_SECRET ? process.env.ACCESS_SECRET : undefined

    if (accessSecret) {
      const tokenInfo = verify(req.cookies.jwt, accessSecret, {ignoreExpiration: true})
      const userInfo = await userinfo.getuserinfo(tokenInfo as ITokenInfo)
      res.status(200).send(userInfo)
    } else {
      res.status(400).send({ message : "No access secret"})
    }
  } else {
    res.status(404).send({ message : "No token"})
  }
};

const getOtherUserinfo = async (req: Request, res: Response, next: NextFunction) => {
  const pathParameter : ITokenInfo = { id : Number(req.params.userid) }
  const userInfo = await userinfo.getuserinfo(pathParameter)
  if (userInfo) {
    res.status(200).send(userInfo)
  } else {
    res.status(400).send({ message : "Bad Request"})
  }
  
};

//사진업로드부분과 본문내용에 관한 요청을 분리
const patchProfile = async (req: Request, res: Response, next: NextFunction) => {
  if (req.file && req.params) {
    const pathParameter : string = req.params.userid
    const location = req.file?.location
    const result = await userinfo.imageUpload(location, pathParameter)

    if (result) {
      res.status(200).send({ message : "Successed changing your Profile" , location : location })
    } else {
      res.status(400).send({ message : "Failed changing your Profile" })
    }
  } else {
    res.status(400).send({ message : "There is no Profile to change" })
  }
   
}
const patchPassword = async (req: Request, res: Response, next: NextFunction) => {
  if (req.params && req.body) {
    const pathParameter : string = req.params.userid
    const payload : IPatchUserInfo = req.body
    const result = await userinfo.patchPassword(payload, pathParameter)
     
    if (result) {
      res.status(200).send({ message : "Successed changing your password" })
    } else {
      res.status(400).send({ message : "Failed changing your password" })
    }
  } else {
    res.status(400).send({ message : "There is no information to change" })
  }
}

const patchUserinfo = async (req: Request, res: Response, next: NextFunction) => {
  
  if (req.params && req.body) {
    const pathParameter : string = req.params.userid
    const payload : IPatchUserInfo = req.body
    const result = await userinfo.patchuserinfo(payload, pathParameter)
     
    if (result) {
      res.status(200).send({ message : "Successed changing your information" })
    } else {
      res.status(400).send({ message : "Failed changing your information" })
    }
  } else {
    res.status(400).send({ message : "There is no information to change" })
  }
};

const postCheckUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    const payload : ICheckUser = req.body
    const result = await userinfo.checkUser(payload)

    if (result) {
      res.status(200).send({ message : "This user is verified"})
    } else {
      res.status(400).send({ message : "Invalid user"})
    }
  }
 

}
export default {
  getUserinfo,
  getOtherUserinfo,
  patchUserinfo,
  patchPassword,
  patchProfile,
  postCheckUser
}
