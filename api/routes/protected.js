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

    // check if profile exists
    const { data: existingProfile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (existingProfile !== null) {
      return res.status(200).json({ profile: existingProfile });
    }

    // profile doesn't exist, so create it
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert([{ id: userId }])
      .select()
      .single();

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    res.status(201).json({ profile: newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create profile" });
  }
});


export default router;
