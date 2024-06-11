const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/groupController');


router.post('/', GroupController.createGroup);
router.get('/', GroupController.getAllGroups);
router.get('/:id', GroupController.getGroupById);
router.put('/:id', GroupController.updateGroup);
router.delete('/:id', GroupController.deleteGroup);

module.exports = router;
