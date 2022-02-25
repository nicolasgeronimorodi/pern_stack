const pool = require("../db");

const getAllTasks = async (req, res, next) => {
  
  try {
    //throw new Error('tirate que? tirate un error')
    const allTasks = await pool.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

const getSingleTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM task WHERE id=$1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "task not found",
      });
    res.json(result.rows[0]); //se puede obviar el return porque es el final de la funcion
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  console.log("title es ", title);

  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    console.log("result es ", result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//objeto request contiene un obj body que muestra que es lo que el cliente esta enviando al servidor
//en el bloque caWch por lo general se maneja el error de forma que se genera un 404, no se envía un json como en el ejemplo
const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM task WHERE id=$1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "task not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE task SET title=$1, description=$2 WHERE id=$3 RETURNING *",
      [title, description, id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "task not found" });
    }
    res.json(result.row[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  deleteTask,
  updateTask,
};

// es lo mismo que decir {getAllTasks: getAllTasks}
