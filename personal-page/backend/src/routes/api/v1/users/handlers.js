// Initialize a users list to act as in-memory database
let users = [
  {
    id: 1,
    name: "Phil Dunphy",
  },
];

// Handler to create a new user and add them to the users list
export async function createUser(req, res) {
  const { name } = req.body;

  // Simple ID generator - in real apps, use more robust methods for ID generation
  const id = users.length + 1;

  const newUser = { id, name };

  // Add the new user to the list
  users.push(newUser);

  // Respond with the newly created user object
  res.status(201).json(newUser);
}

// Handler to get all users from the users list
export async function getAllUsers(req, res) {
  // Respond with the current list of users
  res.status(200).json(users);
}
