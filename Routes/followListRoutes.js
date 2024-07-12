const express = require('express');
const router = express.Router();
const FollowListController = require('../controllers/followListController');

router.post('/', FollowListController.followUser);
router.get('/:userId', FollowListController.getFollowings);
router.delete('/:userId/:followId', FollowListController.unfollowUser);

module.exports = router;