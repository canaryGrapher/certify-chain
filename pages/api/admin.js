import User from "../../models/UserModel"
import dbConnect from "../../utilities/dbConnect"

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === "POST") {
        try {
            const { name, regno, walletAddress, admin } = req.body;
            const user = await User.create({ name, regno, walletAddress, admin });
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false });
        }
    }

    else {
        res.status(500).json({ success: false });
    }
}