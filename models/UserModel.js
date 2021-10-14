import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Please add a name"],
        },
        regNo: {
            type: String,
            trim: true,
            required: [true, "Please add a registration number"],
        },
        walletAddress: {
            type: String,
            trim: true,
            required: [true, "Please add a wallet address"],
        },
        admin: {
            type: Boolean,
            default: false,
        },
        photo: {
            type: String,
            default:
                "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
        },
    },
    { collection: "user" }
);

module.exports =
    mongoose.models.User || mongoose.model("User", UserSchema);
