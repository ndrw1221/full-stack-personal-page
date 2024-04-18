import { prisma } from "../../../../adapters.js";
import { Storage } from "@google-cloud/storage";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import stream from "stream";
// import bcrypt from "bcrypt";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = new Storage({
  projectId: "spatial-dryad-420410",
  keyFilename: path.join(
    __dirname,
    "../../../../../spatial-dryad-420410-d3e9ac6d9f84.json"
  ),
});

const bucket = storage.bucket("profile-image-uploads-bucket");

async function uploadToGCS(req, file) {
  if (!file) throw new Error("No file available");

  const blob = bucket.file(`${req.userName}.jpg`);
  const blobStream = blob.createWriteStream({ resumable: false });
  const bufferStream = new stream.PassThrough();

  bufferStream.end(file.buffer);

  await new Promise((resolve, reject) => {
    bufferStream.pipe(blobStream).on("error", reject).on("finish", resolve);
  });

  return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
}

export async function updateUserPhoto(req, res) {
  try {
    const fileUrl = await uploadToGCS(req, req.file);
    const user = await prisma.user.update({
      where: {
        name: req.userName,
      },
      data: {
        photo: fileUrl,
      },
    });
    console.log("File uploaded:", fileUrl);
    res.status(200).json("Photo uploaded successfully.");
  } catch (error) {
    console.error("Error updating user photo:", error);
    res.status(400).json({ error: "Error updating user photo." });
  }
}

// export async function getAllUsers(req, res) {
//   const allUsers = await prisma.user.findMany();
//   res.status(200).json(allUsers);
// }

// export async function getUserByName(req, res) {
//   const { name } = req.params;
//   const user = await prisma.user.findUnique({
//     where: {
//       name: name,
//     },
//   });
//   if (user) {
//     const { password, ...userWithoutPassword } = user;
//     res.status(200).json(userWithoutPassword);
//   } else {
//     res.status(404).json({ error: "User not found." });
//   }
// }

// export async function createUser(req, res) {
//   const { name, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name: name,
//         password: hashedPassword,
//       },
//     });
//     // Consider what data to return - for security, you might not want to send the password back
//     const { password, ...userWithoutPassword } = user;
//     res.status(201).json(userWithoutPassword);
//   } catch (error) {
//     // Handle potential errors, such as a violation of the unique constraint for 'name'
//     console.error("Error creating user:", error);
//     res.status(400).json({ error: "Error creating user." });
//   }
// }

// export async function deleteUserByName(req, res) {
//   const { name } = req.params;
//   try {
//     const user = await prisma.user.delete({
//       where: {
//         name: name,
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(400).json({ error: "Error deleting user." });
//   }
// }
