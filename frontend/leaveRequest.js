const leaveForm = document.getElementById("leaveForm");
const employeeId = localStorage.getItem("employeeId");
if (!employeeId) {
  window.location.href = "role.html";
}

leaveForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const requestBody = {
    employee_id: employeeId,
    leave_type: document.getElementById("leaveType").value.trim(),
    from_date: document.getElementById("fromDate").value,
    to_date: document.getElementById("toDate").value,
    reason: document.getElementById("reason").value.trim()
  };

  if (!requestBody.leave_type || !requestBody.from_date || !requestBody.to_date || !requestBody.reason) {
    return alert("Please complete all fields before submitting.");
  }

  try {
    const response = await fetch("http://localhost:5000/leave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    alert(data.message || "Leave submitted successfully");
    leaveForm.reset();
  } catch (error) {
    alert("Unable to submit leave request");
  }
});
const table = document.getElementById("leaveStatusTable");

async function loadLeaveStatus() {

  try {

    const response = await fetch(
      `http://localhost:5000/leave-status/${employeeId}`
    );

    const data = await response.json();

    if (!data.length) {

      table.innerHTML = `
        <tr>
          <td colspan="5">No leave requests found</td>
        </tr>
      `;

      return;
    }

    table.innerHTML = data.map(item => `

      <tr>
        <td>${item.leave_type}</td>
        <td>${new Date(item.from_date).toLocaleDateString("en-GB")}</td>
        <td>${new Date(item.to_date).toLocaleDateString("en-GB")}</td>
        <td>${item.reason}</td>
        <td class="${item.status === 'Approved' ? 'approved' : ''} ${item.status === 'Rejected' ? 'rejected' : ''}">
          ${item.status}
        </td>
      </tr>

    `).join("");

  } catch (error) {

    table.innerHTML = `
      <tr>
        <td colspan="5">Unable to load leave status</td>
      </tr>
    `;

  }

}

loadLeaveStatus();