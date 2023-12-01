const express = require("express");
const { handleGetAllUser,
    handleUpdateUserById,
    handleGetUserById,
    handleCreateUserById,
    handleDeleteUserById } = require('../controllers/user')

const router = express.Router();

// On same route handle multiple request. use dynamic path  
//get by id
router.route("/:id").get(handleGetUserById).patch(handleUpdateUserById).delete(handleDeleteUserById);

router.get("/", handleGetAllUser)

// create user
router.post("/", handleCreateUserById);

module.exports = router;