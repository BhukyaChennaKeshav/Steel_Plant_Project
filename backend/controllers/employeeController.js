const db = require("../config/db");

// PROFILE
exports.getEmployee = (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM users WHERE employee_id = ?",
    [id],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Server error"
        });
      }

      if (result.length === 0) {

        return res.status(404).json({
          success: false,
          message: "Employee not found"
        });

      }

      res.json(result[0]);

    }
  );

};

// UPDATE PROFILE
exports.updateEmployee = (req, res) => {

  const id = req.params.id;

  const {
    employee_name,
    department,
    phone,
    email,
    shift_name,
    blood_group,
    address,
    emergency_contact,
    employee_status
  } = req.body;

  db.query(

    `UPDATE users SET
      employee_name = ?,
      department = ?,
      phone = ?,
      email = ?,
      shift_name = ?,
      blood_group = ?,
      address = ?,
      emergency_contact = ?,
      employee_status = ?
    WHERE employee_id = ?`,

    [
      employee_name,
      department,
      phone,
      email,
      shift_name,
      blood_group,
      address,
      emergency_contact,
      employee_status,
      id
    ],

    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Unable to update profile"
        });

      }

      res.json({
        success: true,
        message: "Profile updated"
      });

    }

  );

};

// ATTENDANCE
exports.getAttendance = (req, res) => {

  const id = req.params.id;
 if(!id){

  return res.status(400).json({
    success:false,
    message:"Invalid Employee"
  });

}
  db.query(

    `SELECT * FROM employee_attendance
     WHERE employee_id = ?
     ORDER BY attendance_date DESC`,

    [id],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Server error"
        });

      }

      res.json(result);

    }

  );

};

// SUBMIT LEAVE
exports.submitLeave = (req, res) => {

  const {
    employee_id,
    leave_type,
    from_date,
    to_date,
    reason
  } = req.body;

  db.query(

    `INSERT INTO leave_requests (
      employee_id,
      leave_type,
      from_date,
      to_date,
      reason,
      status
    ) VALUES (?, ?, ?, ?, ?, 'Pending')`,

    [
      employee_id,
      leave_type,
      from_date,
      to_date,
      reason
    ],

    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Unable to submit leave"
        });

      }

      res.json({
        success: true,
        message: "Leave request submitted"
      });

    }

  );

};

// HR VIEW EMPLOYEES
exports.getEmployees = (req, res) => {

  db.query(

    `SELECT
      employee_id,
      employee_name,
      department,
      email,
      phone,
      employee_status
    FROM users
    WHERE role='employee'
    ORDER BY employee_name`,

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Server error"
        });

      }

      res.json(result);

    }

  );

};

// HR VIEW LEAVES
exports.getLeaves = (req, res) => {

  db.query(

    "SELECT * FROM leave_requests ORDER BY id DESC",

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Server error"
        });

      }

      res.json(result);

    }

  );

};

// APPROVE LEAVE
exports.approveLeave = (req, res) => {

  const id = req.params.id;

  db.query(

    "UPDATE leave_requests SET status = 'Approved' WHERE id = ?",

    [id],

    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Unable to approve leave"
        });

      }

      res.json({
        success: true,
        message: "Leave approved"
      });

    }

  );

};

// REJECT LEAVE
exports.rejectLeave = (req, res) => {

  const id = req.params.id;

  db.query(

    "UPDATE leave_requests SET status = 'Rejected' WHERE id = ?",

    [id],

    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Unable to reject leave"
        });

      }

      res.json({
        success: true,
        message: "Leave rejected"
      });

    }

  );

};
// EMPLOYEE LEAVE STATUS

exports.getEmployeeLeaves = (req, res) => {

  const id = req.params.id;

  db.query(

    `SELECT *
     FROM leave_requests
     WHERE employee_id = ?
     ORDER BY id DESC`,

    [id],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Server error"
        });

      }

      res.json(result);

    }

  );

};
exports.selfAttendance = (req, res) => {

  const {
    employee_id,
    latitude,
    longitude
  } = req.body;

  const currentLatitude = Number(latitude);
  const currentLongitude = Number(longitude);

  if (
    !employee_id ||
    Number.isNaN(currentLatitude) ||
    Number.isNaN(currentLongitude)
  ) {

    return res.status(400).json({
      success: false,
      message: "Invalid attendance location"
    });

  }

  const plantLat = 17.63;
  const plantLon = 83.17;

  const range = 0.02;

  if (
    Math.abs(currentLatitude - plantLat) > range ||
    Math.abs(currentLongitude - plantLon) > range
  ) {

    return res.json({
      success: false,
      message: "You are outside plant area"
    });

  }

  db.query(

    `INSERT INTO employee_attendance
    (
      employee_id,
      attendance_date,
      day,
      status
    )
    VALUES
    (
      ?,
      CURDATE(),
      DAYNAME(CURDATE()),
      'Present'
    )`,

    [employee_id],

    (err) => {

      if (err) {

        console.log(err);

        return res.json({
          success: false,
          message: "Attendance already marked"
        });

      }

      res.json({
        success: true,
        message: "Attendance Marked Successfully"
      });

    }

  );

};
