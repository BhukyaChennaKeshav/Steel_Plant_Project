const employeeId = localStorage.getItem("employeeId");
const table = document.getElementById("leaveStatusTable");

if (!employeeId) {
  window.location.href = "role.html";
}

async function loadLeaveStatus() {
  try {
    const response = await fetch(`http://localhost:5000/leave-status/${employeeId}`);
    const data = await response.json();

    if (!data.length) {
      table.innerHTML = `
        <tr>
          <td colspan="5">No leave requests found</td>
        </tr>
      `;
      return;
    }

    table.innerHTML = data
      .map((item) => `
        <tr>
          <td>${item.leave_type}</td>
          <td>${new Date(item.from_date).toLocaleDateString("en-GB")}</td>
          <td>${new Date(item.to_date).toLocaleDateString("en-GB")}</td>
          <td>${item.reason}</td>
          <td class="${item.status === "Approved" ? "approved" : ""} ${item.status === "Rejected" ? "rejected" : ""}">
            ${item.status}
          </td>
        </tr>
      `)
      .join("");
  } catch (error) {
    table.innerHTML = `
      <tr>
        <td colspan="5">Unable to load leave status</td>
      </tr>
    `;
  }
}

loadLeaveStatus();
