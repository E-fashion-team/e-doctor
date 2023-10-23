var db = require("../prisma/prisma");

const getAllUsers = async (req, res) => {
  const search = req.query.search ? req.query.search.toLowerCase() : "";
  const { page = 1, limit = 10 } = req.query;
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        display_name: true,
        username: true,
        profile_picture: true,
      },
      where: {
        OR: [
          { username: { contains: search } },
          { display_name: { contains: search } },
        ],
      },
      skip: (parsedPage - 1) * parsedLimit,
      take: parsedLimit,
    });
    res.status(200).json({ users: users, numFound: users.length });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const editUser = async (req, res) => {
  const { display_name, username, profile_picture } = req.body;
  
  const userIdParsed = parseInt(req.userId);
  const displayNameTrimmed = req.body.display_name ? req.body.display_name.trim() : undefined;
  const usernameTrimmed = req.body.username ? req.body.username.trim() : undefined;

  try {
    const user = await db.user.update({
      where: { id: userIdParsed },
      data: {
        display_name: displayNameTrimmed,
        username: usernameTrimmed,
        profile_picture: profile_picture,
      },
    });

    const response = {
      display_name: user.display_name,
      username: user.username,
      profile_picture: user.profile_picture,
    };
    res.json(response);
  } catch (err) {
    console.error(err);
    if (err.code === "P2002")
      return res.status(403).json({ message: "Username already in use" });
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllUsers,
  editUser
};
