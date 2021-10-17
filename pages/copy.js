import React, { useEffect, useState } from "react";
import LZUTF8, { compress } from "lzutf8";
import { Prism } from "@mantine/prism";
import { Title, Space, Button, Group } from "@mantine/core";
import queryString from "query-string";
import { useRouter } from "next/router";
import { CopyIcon, FilePlusIcon } from "@modulz/radix-icons";
import { useClipboard } from "@mantine/hooks";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function copyPage() {
  const router = useRouter();
  const [queries, setQueries] = useState({});
  const [pasteData, setPasteData] = useState("");
  const clipboard = useClipboard({ timeout: 3000 });

  useEffect(async () => {
    let fetchedQueries = queryString.parse(router.asPath.split("?")[1]);
    await setQueries(fetchedQueries);

    const compressed = /(?<=\&data=).*/g.exec(router.asPath)[0];
    const decompressed = await LZUTF8.decompress(compressed, { inputEncoding: "Base64" });
    setPasteData(decompressed);
  }, []);

  return (
    <>
      <div className="copyPage">
        <Navbar />
        <Space h="xl" />
        <div className="copyPage__container">
          <div className="copyPage__containerHead">
            <Title className="copyPage__title" order={5}>
              <span style={{ color: "#999999", fontWeight: "600" }}>FileName :</span>{" "}
              {queries.title ? queries.title : "Untitled"}
            </Title>
            <Group classname="copy__HeadBtnGrp">
              <Button style={{ display: "block" }} leftIcon={<CopyIcon />} onClick={() => clipboard.copy(pasteData)}>
                {clipboard.copied ? "Copied" : "Copy"}
              </Button>
              <Button leftIcon={<FilePlusIcon />} color="green" onClick={() => router.push("/")}>
                Create New
              </Button>
            </Group>
          </div>
          <Prism
            language="javascript"
            withLineNumbers
            copyLabel="Copy code to clipboard"
            copiedLabel="Code copied to clipboard"
            className="copyPage__copyArea"
          >
            {pasteData}
          </Prism>
        </div>
        <Footer />
      </div>

      <style jsx global>{`
        body {
          background: ${["1A1B1E", "364264", "476856", "624c4c", "747450", "785674"].includes(queries.color)
            ? "#" + queries.color
            : "#1A1B1E"};
        }
        .copyPage {
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          min-height: 92vh;
          margin: 20px auto;
          padding: 20px;
        }
        .copyPage__container {
          max-width: 800px;
          width: 100%;
          margin: 20px auto;
        }
        .copyPage__containerHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .copyPage__copyArea {
          margin-top: 20px;
        }
        .copyPage__title {
          background-color: #2c2e33;
          padding: 10px;
          display: inline-block;
          border-radius: 4px;
        }
        @media only screen and (max-width: 450px) {
          .copyPage__containerHead {
            flex-direction: column;
            gap: 20px;
          }
          .copyPage__title {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default copyPage;
