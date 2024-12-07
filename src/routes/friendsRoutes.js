const express = require("express");
const router = express.Router();
const FriendController = require('../controller/FriendsController');

router.post("/add-un-friend", FriendController.addUnfriend);
router.get("/get-friend-not-friend/:id", FriendController.getAllFriendAndNotFriend);

module.exports = router;
