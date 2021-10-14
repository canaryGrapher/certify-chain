import dbConnect from "../../utilities/dbConnect"

import User from "../../models/UserModel"
import Certificate from "../../models/CertificateModel"

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    // function to get user's details based on Wallet Address
    if (method === "GET") {
        try {
            const { walletAddress } = req.body;
            const user = await User.findOne({ walletAddress: walletAddress });
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false });
        }
    }

    else {
        res.status(500).json({ success: false });
    }
}