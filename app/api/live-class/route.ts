import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { courseBySlug } from "@/lib/courses";

const DAILY_API = "https://api.daily.co/v1";

async function isLecturer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, supabase, user: null };
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return { ok: me?.role === "lecturer", supabase, user };
}

export async function POST(req: Request) {
  const key = process.env.DAILY_API_KEY;
  if (!key) return NextResponse.json({ error: "Live class is not configured." }, { status: 500 });

  const { slug, action } = (await req.json().catch(() => ({}))) as {
    slug?: string;
    action?: "start" | "end";
  };
  if (!slug || !courseBySlug(slug)) return NextResponse.json({ error: "Unknown course." }, { status: 400 });

  const { ok, supabase } = await isLecturer();
  if (!ok) return NextResponse.json({ error: "Lecturers only." }, { status: 403 });

  if (action === "start") {
    // Reuse an existing room for this course if one is still set.
    const { data: existing } = await supabase
      .from("course_settings")
      .select("live_room")
      .eq("slug", slug)
      .maybeSingle();
    if (existing?.live_room) return NextResponse.json({ ok: true, url: existing.live_room });

    const res = await fetch(`${DAILY_API}/rooms`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        privacy: "public",
        properties: {
          enable_prejoin_ui: true, // students type a name + check cam/mic — no login
          enable_knocking: false, // no waiting room / no moderator approval
          enable_screenshare: true,
          enable_chat: true,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8, // auto-expire after 8h
        },
      }),
    });
    const room = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
    if (!res.ok || !room?.url) {
      return NextResponse.json({ error: room?.error || "Could not start the live class." }, { status: 502 });
    }

    const { error } = await supabase
      .from("course_settings")
      .upsert({ slug, live_room: room.url, updated_at: new Date().toISOString() });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, url: room.url });
  }

  if (action === "end") {
    const { data: existing } = await supabase
      .from("course_settings")
      .select("live_room")
      .eq("slug", slug)
      .maybeSingle();
    const url = existing?.live_room as string | undefined;
    if (url) {
      const name = url.split("/").pop();
      if (name) {
        await fetch(`${DAILY_API}/rooms/${name}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${key}` },
        }).catch(() => {});
      }
    }
    const { error } = await supabase
      .from("course_settings")
      .upsert({ slug, live_room: null, updated_at: new Date().toISOString() });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
