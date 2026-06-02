const db = require("../config/db");
const bcrypt = require("bcrypt");
exports.login = (req, res) => {

  const { employee_id, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE employee_id = ?",
    [employee_id],
    async (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Server Error"
        });
      }

      if (result.length === 0) {
        return res.json({
          success: false,
          message: "Invalid Credentials"
        });
      }

      const user = result[0];

      const match = await bcrypt.compare(
        password,
        user.password
      );

      if (!match) {

        return res.json({
          success: false,
          message: "Invalid Credentials"
        });

      }

      res.json({
        success: true,
        employee_id: user.employee_id,
        role: user.role
      });

    }
  );
};

exports.status = (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database connection failed" });
    }

    return res.json({ success: true, message: "Backend and database connected" });
  });
};
