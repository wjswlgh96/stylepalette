import { NextFunction, Request, Response } from "express";
import { post } from "../service";


const getPost = async (req: Request, res: Response, next: NextFunction) => {
  req.params.postid

};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  

};

const postPost = async (req: Request, res: Response, next: NextFunction) => {
  

};

const postLike = async (req: Request, res: Response, next: NextFunction) => {
  

};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  

};



export default {
  getPost,
  getPosts,
  postPost,
  postLike,
  deletePost
}
