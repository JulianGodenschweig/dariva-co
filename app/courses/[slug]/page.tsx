import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { courseBySlug, COURSE_BUCKET } from "@/lib/courses";
import { CourseUpload } from "@/components/courses/CourseUpload";
import { LiveClassLink } from "@/components/courses/LiveClassLink";
import { RemoveMaterial } from "@/components/courses/RemoveMaterial";

export const metadata: Metadata = { robots: { index: false, follow: false } };

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

function fmtSize(bytes?: number) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const isVideo = (name: string) => /\.(mp4|webm|mov|m4v)$/i.test(name);

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, approved, lecturer_id")
    .eq("id", user.id)
    .single();

  const isLecturer = profile?.role === "lecturer";
  if (!isLecturer && !profile?.approved) redirect("/pending");

  // Lecturers use their own id; students use their assigned lecturer's id.
  const lecturerId = isLecturer ? user.id : (profile?.lecturer_id as string | null);
  if (!lecturerId) redirect("/pending");

  const { data: setting } = await supabase
    .from("course_settings")
    .select("live_url")
    .eq("slug", slug)
    .eq("lecturer_id", lecturerId)
    .maybeSingle();
  const liveUrl = setting?.live_url ?? null;

  const materialPath = `${lecturerId}/${slug}`;
  const { data: list } = await supabase.storage
    .from(COURSE_BUCKET)
    .list(materialPath, { sortBy: { column: "name", order: "asc" } });

  const files = (list ?? []).filter((f) => f.name !== ".emptyFolderPlaceholder" && f.id !== null);

  const items = await Promise.all(
    files.map(async (f) => {
      const path = `${materialPath}/${f.name}`;
      const [{ data: view }, { data: dl }] = await Promise.all([
        supabase.storage.from(COURSE_BUCKET).createSignedUrl(path, 3600),
        supabase.storage.from(COURSE_BUCKET).createSignedUrl(path, 3600, { download: f.name }),
      ]);
      return {
        name: f.name,
        size: f.metadata?.size as number | undefined,
        viewUrl: view?.signedUrl ?? "#",
        downloadUrl: dl?.signedUrl ?? "#",
        video: isVideo(f.name),
      };
    }),
  );

  return (
    <main style={{ minHeight: "100svh", background: "#F8F6F3", padding: "24px 20px 64px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Image src="/logo.png" alt="Dariva.co" width={120} height={32} style={{ objectFit: "contain" }} />
          <form action={signOut}>
            <button
              type="submit"
              style={{
                background: "white",
                border: "1px solid #D1D5DB",
                color: "#1A237E",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                minHeight: "40px",
              }}
            >
              Sign out
            </button>
          </form>
        </div>

        <Link href="/courses" style={{ color: "#1B9AD6", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
          ← All courses
        </Link>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1A237E", margin: "12px 0 4px" }}>
          {course.title}
        </h1>
        <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 20px" }}>{course.blurb}</p>

        {liveUrl && (
          <div style={{ marginBottom: "16px" }}>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                background: "#EF4444",
                color: "white",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
                minHeight: "52px",
              }}
            >
              🔴 Join live class <span aria-hidden="true">↗</span>
            </a>
            <p style={{ color: "#6B7280", fontSize: "13px", lineHeight: 1.5, margin: "8px 2px 0", textAlign: "center" }}>
              Opens your live class (Google Meet / Zoom) in a new tab — keep this tab open to come back to your course materials.
            </p>
          </div>
        )}
        {isLecturer && <LiveClassLink slug={slug} lecturerId={lecturerId} current={liveUrl} />}

        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0D1B2A", margin: "8px 0 12px" }}>
          Course materials
        </h2>
        {isLecturer && <CourseUpload slug={slug} lecturerId={lecturerId} />}

        {items.length === 0 ? (
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "14px",
              background: "white",
              border: "1px dashed #E5E7EB",
              borderRadius: "12px",
              padding: "28px",
              textAlign: "center",
            }}
          >
            {isLecturer
              ? "No materials yet — upload the first PowerPoint, PDF or video above."
              : "No materials have been added to this course yet. Check back soon."}
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {items.map((f) =>
              f.video ? (
                <div
                  key={f.name}
                  style={{
                    background: "white",
                    border: "1px solid #E5F3FB",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontWeight: 600,
                      color: "#1A237E",
                      fontSize: "14px",
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    🎬 {f.name}
                  </p>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    controls
                    preload="metadata"
                    src={f.viewUrl}
                    style={{ width: "100%", borderRadius: "8px", background: "#000", maxHeight: "420px" }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
                    <a
                      href={f.downloadUrl}
                      style={{
                        display: "inline-block",
                        color: "#1A237E",
                        fontSize: "13px",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      ↓ Download {f.size ? `(${fmtSize(f.size)})` : ""}
                    </a>
                    {isLecturer && <RemoveMaterial slug={slug} name={f.name} lecturerId={lecturerId} />}
                  </div>
                </div>
              ) : (
                <div
                  key={f.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    background: "white",
                    border: "1px solid #E5F3FB",
                    borderRadius: "12px",
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ minWidth: 0, display: "flex", gap: "12px", alignItems: "center" }}>
                    <span style={{ fontSize: "22px" }}>{f.name.toLowerCase().endsWith(".pdf") ? "📄" : "📊"}</span>
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 600,
                          color: "#1A237E",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {f.name}
                      </p>
                      {f.size ? (
                        <p style={{ margin: "2px 0 0", color: "#9CA3AF", fontSize: "12px" }}>{fmtSize(f.size)}</p>
                      ) : null}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    <a
                      href={f.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#1A237E",
                        border: "1px solid #D1D5DB",
                        background: "white",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 600,
                        textDecoration: "none",
                        minHeight: "40px",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      View
                    </a>
                    <a
                      href={f.downloadUrl}
                      style={{
                        color: "white",
                        background: "linear-gradient(135deg,#1B9AD6,#1A237E)",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 700,
                        textDecoration: "none",
                        minHeight: "40px",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      Download
                    </a>
                    {isLecturer && <RemoveMaterial slug={slug} name={f.name} lecturerId={lecturerId} />}
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </main>
  );
}
