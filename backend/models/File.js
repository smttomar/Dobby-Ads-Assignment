import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        name: String,
        path: String,
        size: Number,
        folder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
            default: null,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

const File = mongoose.model("File", fileSchema);

export default File;
