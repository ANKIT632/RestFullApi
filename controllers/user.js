
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },

}, { timestamps: true });


const User = mongoose.model("user", userSchema);

async function handleGetAllUser(req, res) {

    const users = await User.find({});
    return res.json(users);
}

async function handleGetUserById(req, res) {
    // Add custom header.
    res.setHeader("X-data", "get specific data");

    try {

        const user = await User.findById(req.params.id);

        if (user) {
            return res.send(user);
        } else {
            return res.status(404).json({ status: "User does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ status: "Error retrieving user", error: error.message });
    }
}


// create user
async function handleCreateUserById(req, res) {

    const body = req.body;

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,

    })
    return res.status(201).json({ status: "success" });


}
async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Delete Success" });
}



async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "luther" })

    return res.json({ status: "Update success" });
}

module.exports = {
    handleGetAllUser,
    handleUpdateUserById,
    handleGetUserById,
    handleCreateUserById,
    handleDeleteUserById,
}