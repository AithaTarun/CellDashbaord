const express = require('express')

const router = express.Router();

const cellController = require('../controllers/cell');

router.get
(
  '/fetchCells',
  cellController.fetchCells
);

router.get
(
  '/fetchCellDetails/:cell_id',
  cellController.fetchCellDetails
)

module.exports = router;
