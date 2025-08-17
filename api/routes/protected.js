import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import supabase from "../supabaseClient.js";

const router = Router();

router.get("/profile", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({ profile: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.post("/create", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    // check if profile already exists
    const { data: existingProfile, error: selectError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      return res.status(400).json({ error: selectError.message });
    }

    if (existingProfile) {
      return res.status(200).json({ profile: existingProfile });
    }

    // insert new profile
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert([{ id: userId }])
      .select()
      .single();

    if (insertError)
      return res.status(400).json({ error: insertError.message });

    res.status(201).json({ profile: newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create profile" });
  }
});

export default router;
