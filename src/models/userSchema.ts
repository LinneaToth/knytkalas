import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    dietaryRestrictions: {
        dairy: { type: Boolean, default: false },
        gluten: { type: Boolean, default: false },
        nuts: { type: Boolean, default: false },
        shellfish: { type: Boolean, default: false },
        soy: { type: Boolean, default: false },
        egg: { type: Boolean, default: false },
        honey: { type: Boolean, default: false },
        meat: { type: Boolean, default: false },
        fish: { type: Boolean, default: false },
    },
    invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invite" }]
}, { timestamps: true }); //timestamps add createdAt and updatedAt

const User = mongoose.model("User", userSchema); //User -> collection "users", through mongoose's interpretation

export default User;