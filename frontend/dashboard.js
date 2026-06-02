const employeeId = localStorage.getItem("employeeId");
if (!employeeId) {
  window.location.href = "role.html";
}

async function loadSummary() {
  try {
    const [profileRes, attendanceRes, leavesRes] = await Promise.all([
      fetch(`http://localhost:5000/employee/${employeeId}`),
      fetch(`http://localhost:5000/attendance/${employeeId}`),
      fetch("http://localhost:5000/leaves")
    ]);

    const profile = await profileRes.json();
    const attendance = await attendanceRes.json();
    const leaves = await leavesRes.json();
    const pendingLeaves = Array.isArray(leaves)
      ? leaves.filter((item) => String(item.employee_id) === employeeId && item.status === "Pending").length
      : 0;

    document.getElementById("attendanceCount").innerText = Array.isArray(attendance) && attendance.length ? `${attendance.length} records` : "No records yet";
    document.getElementById("pendingLeaves").innerText = pendingLeaves ? `${pendingLeaves} pending` : "No pending requests";
    document.getElementById("profileStatus").innerText = profile.employee_status || "Active";
  } catch (error) {
    document.getElementById("attendanceCount").innerText = "Unable to load";
    document.getElementById("pendingLeaves").innerText = "Unable to load";
    document.getElementById("profileStatus").innerText = "Unable to load";
  }
}

loadSummary();
