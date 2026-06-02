const leaveTable = document.getElementById("leaveTable");

async function loadLeaves() {
  try {
    const response = await fetch("http://localhost:5000/leaves");
    const data = await response.json();

    if (!data || data.length === 0) {
      leaveTable.innerHTML = `
        <tr>
          <td colspan="8">No leave requests</td>
        </tr>
      `;
      return;
    }

    leaveTable.innerHTML = data
      .map((item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.employee_id}</td>
          <td>${item.leave_type}</td>
          <td>${new Date(item.from_date).toLocaleDateString('en-GB')}</td>
          <td>${new Date(item.to_date).toLocaleDateString('en-GB')}</td>
          <td>${item.reason || ''}</td>
          <td>${item.status}</td>
          <td>
            <button onclick="approveLeave(${item.id})">Approve</button>
            <button onclick="rejectLeave(${item.id})">Reject</button>
          </td>
        </tr>
      `)
      .join("");
  } catch (error) {
    console.error(error);
    leaveTable.innerHTML = `
      <tr>
        <td colspan="8">Unable to load leaves</td>
      </tr>
    `;
  }
}

async function approveLeave(id) {
  try {
    await fetch(`http://localhost:5000/approve/${id}`, { method: 'PUT' });
    await loadLeaves();
  } catch (error) {
    console.error(error);
  }
}

async function rejectLeave(id) {
  try {
    await fetch(`http://localhost:5000/reject/${id}`, { method: 'PUT' });
    await loadLeaves();
  } catch (error) {
    console.error(error);
  }
}

loadLeaves();
