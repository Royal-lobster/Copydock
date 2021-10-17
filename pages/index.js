import React, { useState } from "react";
import { Button, Textarea, Title, Space } from "@mantine/core";
import LZUTF8 from "lzutf8";
import { useRouter } from "next/router";
import { useClipboard } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";

function index() {
  const clipboard = useClipboard({ timeout: 3000 });
  const notifications = useNotifications();
  const router = useRouter();
  const [pasteValue, setPasteValue] = useState("");

  let handlePasteSubmit = async (e) => {
    e.preventDefault();
    let compressed = await LZUTF8.compress(pasteValue, { outputEncoding: "Base64" });
    console.log("http://localhost:3000/copy?data=" + compressed);
    clipboard.copy("http://localhost:3000/copy?data=" + compressed);
    notifications.showNotification({
      title: "Copied To Clipboard",
      message: "The Share URL is copied to clipboard !",
    });
  };
  return (
    <>
      <div className="pastePage">
        <Title align="center" order={1}>
          Copydock
        </Title>
        <form className="pastePage__pasteArea" onSubmit={handlePasteSubmit}>
          <Textarea
            value={pasteValue}
            onChange={(event) => setPasteValue(event.currentTarget.value)}
            placeholder="Paste Text Here..."
            autosize
            minRows={20}
            maxRows={20}
          />
          <Space h="md" />
          <Button color="blue" type="submit">
            {clipboard.copied ? "✅ Copied to Clipboard" : "📝 Copy URL to Share"}
          </Button>
        </form>
      </div>
      <style jsx global>{`
        .pastePage {
          max-width: 1200px;
          margin: 20px auto;
          padding: 20px;
        }
        .pastePage__pasteArea {
          max-width: 800px;
          margin: 20px auto;
        }
      `}</style>
    </>
  );
}

export default index;
