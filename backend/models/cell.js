const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const cellSchema = new mongoose.Schema
(
  {
    cell_id:
      {
        type: Schema.Types.Number,
        required: true
      },

    discharge_capacity:
      {
        type: Schema.Types.Number,
        required: true
      },

    nominal_capacity:
      {
        type: Schema.Types.Number,
        required: true
      }
  }
);

module.exports = mongoose.model
(
  'CELL',  cellSchema
);
