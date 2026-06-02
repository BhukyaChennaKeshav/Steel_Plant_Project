const employeeId = localStorage.getItem("employeeId");

if (!employeeId) {

  window.location.href = "role.html";
}

async function loadAttendance() {

  try {

    const response = await fetch(

      `http://localhost:5000/attendance/${employeeId}`

    );

    const data = await response.json();

    const tbody =
    document.getElementById(
      "attendanceTable"
    );

    if (!data.length) {

      tbody.innerHTML = `

        <tr>

          <td colspan="4">

            No attendance records available

          </td>

        </tr>

      `;

      return;
    }

    tbody.innerHTML = data.map((item) => {

      const formattedDate =
      new Date(item.attendance_date)
      .toLocaleDateString(
        "en-GB"
      );

      return `

        <tr>

          <td>
            ${item.employee_id}
          </td>

          <td>
            ${formattedDate}
          </td>

          <td>
            ${item.day}
          </td>

          <td class="
            ${item.status.toLowerCase()}
          ">

            ${item.status}

          </td>

        </tr>

      `;

    }).join("");

  }

  catch(error){

    document.getElementById(
      "attendanceTable"
    ).innerHTML = `

      <tr>

        <td colspan="4">

          Unable to load attendance

        </td>

      </tr>

    `;
  }
}

loadAttendance();
document.getElementById("markAttendance")
.addEventListener("click", () => {

  if (!navigator.geolocation) {
    alert("GPS not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      const latitude =
      position.coords.latitude;

      const longitude =
      position.coords.longitude;

      try {

        const response =
        await fetch(
          "http://localhost:5000/self-attendance",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              employee_id: employeeId,
              latitude,
              longitude
            })
          }
        );

        const data =
        await response.json();

        alert(data.message);

        loadAttendance();

      } catch (error) {

        alert("Attendance failed");

      }

    }

  );

});