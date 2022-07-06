import React from "react";
import Head from "next/head";
import { NONCE } from "./constants";

export default function Home() {
  const [counter, setCounter] = React.useState(0);
  const [on, setOn] = React.useState(true);

  return (
    <>
      <Head>
        <title>Next HeadManger Bug</title>
        <script
          nonce={NONCE}
          src="https://aws-website-testingthis-acl27.s3.amazonaws.com/test-file.js"
        />
        {/* <script
          nonce={NONCE}
          src={
            on
              ? "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
              : "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js"
          }
        /> */}
      </Head>
      <button onClick={() => setCounter(counter + 1)}>Rerender</button>
      <button onClick={() => setOn(!on)}>Toggle Other Script Tag</button>
      <ul>
        <li style={{ marginBottom: 10 }}>
          <strong>Chrome: </strong>Open your dev tools console and click the
          "Rerender" button. You'll see the script log out every time,
          indicating that it is getting reexecuted.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Chrome: </strong>
          And if you put a breakpoint on{" "}
          <a href="https://github.com/vercel/next.js/blob/canary/packages/next/client/head-manager.ts#L73">
            this line
          </a>{" "}
          (use the condition `oldTag.tagName === "SCRIPT"`) , you'll see that it
          never evaluates to `true`.
        </li>
        <li style={{ marginBottom: 10 }}>
          None of this behavior is seen in Safari, and if you disable the CSP
          header in `server.ts`, then these issues go away in both Chrome & FF.
        </li>
      </ul>
    </>
  );
}
