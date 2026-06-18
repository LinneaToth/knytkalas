//BASED ON CODE FROM https://better-auth.com/docs/plugins/one-tap

"use client";

import { useEffect, useRef } from "react";
import { createAuthClient } from "better-auth/client";
import { oneTapClient } from "better-auth/client/plugins";

export function OneTapButton({ clientId }: { clientId: string }) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const client = createAuthClient({
      plugins: [
        oneTapClient({
          clientId,
          autoSelect: false,
          cancelOnTapOutside: true,
          context: "signin",
          promptOptions: {
            baseDelay: 1000,
            maxAttempts: 5,
          },
        }),
      ],
    });

    client.oneTap({
      button: {
        container: buttonRef.current,
        config: {
          theme: "filled_blue",
          size: "large",
          locale: "en-US",
        },
      },
    });
  }, [clientId]);

  return <div ref={buttonRef} />;
}
