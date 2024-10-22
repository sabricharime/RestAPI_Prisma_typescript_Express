// async function main() {
//   // Create a new user
//   const newUser = await prisma.user.create({
//     data: {
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//     },
//   })

//   // Find all users
//   const allUsers = await prisma.user.findMany()

//   // Find a user by ID
//   const userById = await prisma.user.findUnique({ where: { id: 1 } })

//   // Update a user
//   const updatedUser = await prisma.user.update({
//     where: { id: 1 },
//     data: { name: 'Jane Doe' },
//   })

//   // Delete a user
//   await prisma.user.delete({ where: { id: 1 } })
// }
