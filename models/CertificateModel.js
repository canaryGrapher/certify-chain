import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
    {
        regNo: {
            type: String,
            trim: true,
            required: [true, "Please add a registration number"],
        },
        studentName: {
            type: String,
            trim: true,
            required: [true, "Please add a student name"],
        },
        adminAddress: {
            type: String,
            trim: true,
            required: [true, "Please add an admin address"],
        },
        dateOfIssue: {
            type: Date,
            default: Date.now,
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Please add a description"],
        },
        organization: {
            type: String,
            trim: true,
            required: [true, "Please add an organization"],
        }
    },
    { collection: "certificate" }
);

module.exports =
    mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);