const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params; // Extract ID from request params

  const index = employee.findIndex(emp => emp.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employee.splice(index, 1); // Remove employee from list

  res.status(200).json({ message: 'Employee deleted', data: employee });

};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body; // Extract data from request body

  if (!id || !name) {
    return res.status(400).json({ message: 'ID and name are required' });
  }

  const newEmployee = { id, name };
  employee.push(newEmployee); // Add new employee to the list

  res.status(201).json({ message: 'Employee added', data: employee });
};
