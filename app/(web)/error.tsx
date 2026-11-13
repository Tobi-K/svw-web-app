"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const pathname = usePathname();
  const params = useParams();

  // Send error to server
  useEffect(() => {
    void fetch("/api/notify/error", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: error.message,
        digest: error.digest,
        pathname,
        params,
      }),
    });
  }, [error, params, pathname]);

  return (
    <div className="container px-4 py-8 text-center">
      <h2>Oops, Entschuldigung! 🤷</h2>
      <p>Es ist ein Fehler auf der Seite passiert.</p>
      <p>Wir werden über diesen Fehler informiert und kümmern uns darum.</p>
    </div>
  );
}

