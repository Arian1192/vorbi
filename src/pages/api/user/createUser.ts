import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../../../models/User-model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    if (!body) return res.status(400).json({ message: "No body provided" });
    try {
        const user = await UserModel.create(body);
        return res.status(200).json(user);

    } catch (e: any) {
        throw new Error("Server Error", e);
    }
}