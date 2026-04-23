import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: "4rem", textAlign: "center" }}>
          <h1>404 — Not Found</h1>
          <p>The page you requested does not exist.</p>
          <p>
            <Link href="/en/posts">Go to English posts</Link>
            {" · "}
            <Link href="/ko/posts">한국어 포스트로 이동</Link>
          </p>
        </div>
      </body>
    </html>
  );
}
