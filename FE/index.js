function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = ''; // Clear table before appending new rows
      const list = data.data;

      list.forEach(item => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.setAttribute('data-id', item.id);

        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);

        //  Add event listener directly after creating the delete button
        deleteButton.addEventListener('click', function () {
          deleteEmployee(item.id);
        });
      });
    })
    .catch(error => console.error(error));
}


//  Event Listener for Form Submission 
document.getElementById('employeeForm').addEventListener('submit', createEmployee);

// Create a new employee
function createEmployee(event) {
  event.preventDefault(); // Prevent form refresh

  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  })
    .then(response => response.json())
    .then(() => {
      fetchEmployees(); // Refresh table
      document.getElementById('employeeForm').reset(); // Clear form
    })
    .catch(error => console.error(error));
}

// Delete an employee by ID
function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(() => fetchEmployees()) // Refresh table after deletion
    .catch(error => console.error(error));
}

// Load employees on page load
fetchEmployees();
