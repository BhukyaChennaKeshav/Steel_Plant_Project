const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/employee/:id", employeeController.getEmployee);
router.put("/employee/:id", employeeController.updateEmployee);

router.post("/self-attendance",employeeController.selfAttendance);

router.post("/leave", employeeController.submitLeave);

router.get("/leave-status/:id", employeeController.getEmployeeLeaves);

router.get("/leaves", employeeController.getLeaves);

router.get("/employees", employeeController.getEmployees);

router.put("/approve/:id", employeeController.approveLeave);

router.put("/reject/:id", employeeController.rejectLeave);

module.exports = router;