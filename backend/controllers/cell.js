const Cell = require('../models/cell')

const Excel = require('exceljs');
const path = require("path");

exports.fetchCells = async (request, response, next) =>
{
  try
  {
    const result = await Cell.find({});

    return response.status(200).send({"message" : "Successfully fetched cells", "data": result});
  }
  catch (e)
  {
    console.log("Error while fetching cells : ", e)
    return response.status(400).send({"message" : "Error while fetching cells"})
  }
};

exports.fetchCellDetails = async (request, response, next) =>
{
  try
  {
    const cell_id = request.params.cell_id;

    const workbook = new Excel.Workbook();
    const filePath = path.resolve(__dirname, '..', 'data', cell_id + ".xlsx");

    const file = await workbook.xlsx.readFile(filePath);

    const sheet4 = file.getWorksheet(4);
    const sheet6 = file.getWorksheet(6);

    const currentData = [];
    const voltageData = [];
    const capacityData = [];
    const timeData = [];

    for (let i = 2; i <= sheet4.rowCount; i++)
    {
      const row = sheet4.getRow(i);

      currentData.push(row.getCell(6).value)
      voltageData.push(row.getCell(7).value)
      capacityData.push(row.getCell(8).value)
      timeData.push(row.getCell(11).value)
    }

    const temperatureData = [];

    for (let i = 2; i <= sheet6.rowCount; i++)
    {
      const row = sheet6.getRow(i);

      temperatureData.push(row.getCell(5).value)
    }

    return response.status(200).send({"message" : "Successfully fetched cell details", currentData, voltageData, capacityData, temperatureData, timeData});

  }
  catch (e)
  {
    console.log(e);
    return response.status(400).send({"message": "Error while fetching cell details"});
  }
}
