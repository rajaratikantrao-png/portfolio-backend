import Profile from "../models/profile.js";

export async function getProfile(_req, res, next) {
  try {
    const profile = await Profile.findOne().lean();

    if (!profile) {
      return res.status(404).json({ error: "Profile database mein nahi hai" });
    }

    res.json({ data: profile });
  } catch (error) {
    next(error);
  }
}