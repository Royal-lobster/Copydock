import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LZUTF8 from "lzutf8";
import { Prism } from "@mantine/prism";
import { Button, Textarea, Title, Space } from "@mantine/core";

function copyPage() {
  const router = useRouter();
  const [pasteData, setPasteData] = useState("");
  useEffect(async () => {
    let decompressed = LZUTF8.decompress(router.asPath.substring(11), { inputEncoding: "Base64" });
    setPasteData(decompressed);
  }, []);

  return (
    <>
      <div className="copyPage">
        <Title align="center" order={1}>
          Copydock
        </Title>
        <Space h="xl" />
        <Prism
          withLineNumbers
          copyLabel="Copy code to clipboard"
          copiedLabel="Code copied to clipboard"
          className="copyPage__copyArea"
        >
          {pasteData}
        </Prism>
      </div>

      <style jsx>{`
        .copyPage {
          max-width: 1200px;
          margin: 20px auto;
          padding: 20px;
        }
        .copyPage__copyArea {
          max-width: 800px;
          margin: 20px auto;
        }
      `}</style>
    </>
  );
}

export default copyPage;
