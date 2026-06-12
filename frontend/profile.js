const employeeId = localStorage.getItem("employeeId");

console.log("Employee ID from storage:", employeeId);

if (!employeeId) {
  alert("Employee ID not found. Redirecting...");
  window.location.href = "role.html";
}

async function loadProfile() {

  try {

    const response = await fetch(
      `http://localhost:5000/employee/${employeeId}`
    );

    if (!response.ok) {
      throw new Error("Server error or employee not found");
    }

    const data = await response.json();

    document.getElementById("top_name").innerText =
      data.employee_name || "Employee";

    document.getElementById("top_id").innerText =
      data.employee_id || "";

    document.getElementById("employee_id").value =
      data.employee_id || "";

    document.getElementById("full_name").value =
      data.employee_name || "";

    document.getElementById("department_input").value =
      data.department || "";

    document.getElementById("phone").value =
      data.phone || "";

    document.getElementById("email").value =
      data.email || "";

    document.getElementById("shift_name").value =
      data.shift_name || "";

    document.getElementById("blood_group").value =
      data.blood_group || "";

    document.getElementById("emergency_contact").value =
      data.emergency_contact || "";

    document.querySelector(".status-badge").innerText =
      data.employee_status || "Active";

  } catch (error) {

    console.error(error);

    alert("Unable to load employee details");

  }

}

loadProfile();

/* OPEN POPUP */

const openPasswordBtn =
document.getElementById("openPasswordBtn");

const passwordPopup =
document.getElementById("passwordPopup");

passwordPopup.style.display = "none";

openPasswordBtn.addEventListener("click", () => {

  passwordPopup.style.display = "flex";

});

/* CLOSE POPUP */

function closePasswordPopup() {

  passwordPopup.style.display = "none";

}

window.closePasswordPopup =
closePasswordPopup;

/* CHANGE PASSWORD */

document
.getElementById("changePasswordBtn")
.addEventListener("click", async () => {

  const currentPassword =
    document.getElementById("currentPassword").value;

  const newPassword =
    document.getElementById("newPassword").value;

  const confirmPassword =
    document.getElementById("confirmPassword").value;

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {

    alert("Please fill all fields");
    return;

  }

  if (newPassword !== confirmPassword) {

    alert("Passwords do not match");
    return;

  }

  try {

    const response = await fetch(
      `http://localhost:5000/change-password/${employeeId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {

      document.getElementById("currentPassword").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";

      passwordPopup.style.display = "none";

    }

  } catch (error) {

    console.error(error);

    alert("Unable to change password");

  }

});