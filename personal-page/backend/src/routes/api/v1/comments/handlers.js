import { prisma } from "../../../../adapters.js";

export async function getAllComments(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 6 * page;

  const comments = await prisma.comment.findMany({
    take: pageSize,
    orderBy: { commentedAt: "desc" },
  });

  res.status(200).json(comments);
}

export async function createComment(req, res) {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name: req.userName },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        name: user.name,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteCommentById(req, res) {
  const { id } = req.params;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.name !== req.userName) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    await prisma.comment.delete({
      where: { id: Number(id) },
    });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
