import dbConnect from "../../utilities/dbConnect"

import User from "../../models/UserModel"
import Certificate from "../../models/CertificateModel"

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    // function to get user's details based on Wallet Address
    if (method === "GET") {
        try {
            const { walletAddress, type,  certificateId} = req.query;

            // get all certificates issued to a user
            if (type === "owned") {
                const user = await User.findOne({ walletAddress: walletAddress });
                const certificate = await Certificate.find({ regNo: user.regNo });
                res.status(200).json({ success: true, message: certificate });
            }

            // get all certificated generated by the user, if an admin
            else if (type === "admin") {
                const user = await User.findOne({ walletAddress: walletAddress });

                //if the user is an admin
                if (user.admin) {
                    const certificates = await Certificate.find();
                    res.status(200).json({ success: true, message: certificates });
                }

                // return error code if user is not an admin
                else {
                    res.status(401).json({ success: false, message: "You are not an admin" });
                }
            }
            else if(type === 'view') {
                const certificate = await Certificate.findOne({certificateId: certificateId});
                res.status(200).json({ success: true, message: certificate });
            }

            // send an error code of invalid type provided
            else {
                res.status(404).json({ success: false, message: "Invalid type" });
            }

        } catch (error) {
            res.status(500).json({ success: false });
        }
    }

    // funtion to create a new certificate
    else if (method === "POST") {
        try {
            const { regNo, studentName, dateOfIssue, description, organization, walletAddress, certificateId } = req.body;

            // check if the user is an admin
            const user = await User.findOne({ walletAddress });

            if (user.admin) {
                const certificate = new Certificate({
                    regNo: regNo,
                    studentName: studentName,
                    adminAddress: walletAddress,
                    dateOfIssue: dateOfIssue,
                    description: description,
                    organization: organization,
                    certificateId: certificateId
                });

                await certificate.save();
                res.status(200).json({ success: true, message: "Certificate created" });
            }
            else {
                res.status(401).json({ success: false, message: "You are not an admin" });
            }
        }

        // send a status if there was an error
        catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error });
        }
    }
    else if (method === "DELETE") {
        const { certificateId } = req.query;
        const certificate = await Certificate.findOne({ certificateId });
        if (certificate) {
            await certificate.remove();
            res.status(200).json({ success: true, message: "Certificate deleted!" });
        }
        else {
            console.log("Certificate doesnt exist");
            res.status(204).json({ success: false, message: "Certificate doesnt exist" });
        }
    }

    else {
        res.status(500).json({ success: false });
    }
}