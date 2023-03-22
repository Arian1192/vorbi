import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../../../../models/User-model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(!req.query.id) return res.status(400).json({message: "No id provided"})
    const {id} = req.query
    const body = req.body
    try{
        const user = await UserModel.findById(id)
        if(!user) return res.status(404).json({message: "User not found"})
        const userDataUpdated = await UserModel.findByIdAndUpdate(id, body, {new: true})
        return res.status(200).json(userDataUpdated)
    }catch(e: any){
        throw new Error("Server Error", e)
    }
}