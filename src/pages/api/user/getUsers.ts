import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../../../models/User-model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const users = await UserModel.find()
    return res.status(200).json(users);
}