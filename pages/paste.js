import React, { useState } from "react";
import { Button, Textarea, Space, Input, ColorSwatch, Group, Popover, Text, Switch, Tooltip } from "@mantine/core";
import LZUTF8 from "lzutf8";
import { useClipboard } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { FileTextIcon, CheckIcon, ClipboardCopyIcon } from "@modulz/radix-icons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const getStaticProps = async () => {
  return {
    props: {
      APP_URL: process.env.APPLICATION_URL,
      BITLY_TOKEN: process.env.BITLY_ACCESS_TOKEN,
    },
  };
};

export default function pastePage({ APP_URL, BITLY_TOKEN }) {
  // mantime hooks
  const clipboard = useClipboard({ timeout: 3000 });
  const notifications = useNotifications();

  // usestate hooks
  const [pasteValue, setPasteValue] = useState("");
  const [pasteColorValue, setPasteColorValue] = useState("#1A1B1E");
  const [pasteTitleValue, setPasteTitleValue] = useState("");
  const [opened, setOpened] = useState(false);
  const [shortLink, setShortLink] = useState("");
  const [doShorten, setDoShorten] = useState(true);
  const [doWordWrap, setDoWordWrap] = useState(true);

  // functions
  const handleLinkCopyRequest = async () => {
    // generate a url with the data
    let compressed = await LZUTF8.compress(pasteValue, { outputEncoding: "Base64" });
    let generatedURL = `${APP_URL}/copy?title=${pasteTitleValue}&color=${pasteColorValue}&wordwrap=${doWordWrap}&data=${compressed}`;

    // shorten the generated url with bitly
    if (doShorten) {
      const response = await fetch("https://api-ssl.bitly.com/v4/bitlinks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BITLY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: generatedURL,
        }),
      });
      const body = await response.json();
      // copy the url in the clipboard
      if (body?.link) {
        clipboard.copy(body.link);
        setShortLink(body.link);
        setOpened(true);
        notifications.showNotification({
          title: "Copied To Clipboard",
          message: "Share URL : " + body.link,
        });
      } else {
        clipboard.copy(generatedURL);
        notifications.showNotification({
          title: "Copied To Clipboard",
          message: "The Share URL is copied to clipboard !",
        });
      }
    } else {
      clipboard.copy(generatedURL);
      notifications.showNotification({
        title: "Copied To Clipboard",
        message: "The Share URL is copied to clipboard !",
      });
    }
  };

  return (
    <>
      <div className="pastePage">
        <Navbar />
        <div className="pastePage__pasteArea">
          <div className="pastePage__pasteAreaMetaData">
            <Input
              required
              className="pastePage__pasteAreaMetaDataTitle"
              value={pasteTitleValue}
              onChange={(e) => setPasteTitleValue(e.currentTarget.value)}
              icon={<FileTextIcon />}
              placeholder="Name of File"
            />
            <Group className="pastePage__pasteAreaMetaDataColorGroup" position="center" spacing="xs">
              <ColorSwatch
                onClick={() => setPasteColorValue("1A1B1E")}
                color="#1A1B1E"
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {pasteColorValue == "1A1B1E" && <CheckIcon />}
              </ColorSwatch>
              <ColorSwatch
                onClick={() => setPasteColorValue("364264")}
                color="#364264"
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {pasteColorValue == "364264" && <CheckIcon />}
              </ColorSwatch>
              <ColorSwatch
                onClick={() => setPasteColorValue("476856")}
                color="#476856"
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {pasteColorValue == "476856" && <CheckIcon />}
              </ColorSwatch>
              <ColorSwatch
                onClick={() => setPasteColorValue("624c4c")}
                color="#624c4c"
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {pasteColorValue == "624c4c" && <CheckIcon />}
              </ColorSwatch>
              <ColorSwatch
                onClick={() => setPasteColorValue("747450")}
                color="#747450"
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {pasteColorValue == "747450" && <CheckIcon />}
              </ColorSwatch>
              <ColorSwatch
                onClick={() => setPasteColorValue("785674")}
                color="#785674"
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {pasteColorValue == "785674" && <CheckIcon />}
              </ColorSwatch>
            </Group>
          </div>
          <Textarea
            required
            value={pasteValue}
            onChange={(event) => setPasteValue(event.currentTarget.value)}
            placeholder="Paste Text Here..."
            autosize
            className="pastePage__pasteAreaTextarea"
            minRows={20}
            maxRows={20}
          />
          <Space h="md" />
          <Group>
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              target={
                <Button color="blue" type="submit" leftIcon={<ClipboardCopyIcon />} onClick={handleLinkCopyRequest}>
                  {clipboard.copied ? "Copied to Clipboard" : "Copy URL to Share"}
                </Button>
              }
              position="bottom"
              withArrow
            >
              <div>
                <Text size="sm">
                  Share URL:{" "}
                  <a href={shortLink} style={{ color: "#FB5B45" }}>
                    {shortLink}
                  </a>
                </Text>
              </div>
            </Popover>
            <Tooltip
              wrapLines
              width={220}
              transition="slide-right"
              transitionDuration={300}
              transitionTimingFunction="ease"
              label="If turned OFF, the link will NOT be shortened with bit.ly service. Please turn this OFF if you are sharing confidential information"
              withArrow
            >
              <Switch
                style={{ backgroundColor: "#2C2E33", padding: "9px", borderRadius: "4px" }}
                checked={doShorten}
                radius="xs"
                onChange={(event) => setDoShorten(event.currentTarget.checked)}
                label="Shorten link"
              />
            </Tooltip>
            <Tooltip
              wrapLines
              width={220}
              transition="slide-up"
              transitionDuration={300}
              transitionTimingFunction="ease"
              label="If turned OFF, the paragraphs will not break and be in single line. Keep this ON if your are pasting normal text. Turn this OFF if you are pasting code"
              withArrow
            >
              <Switch
                style={{ backgroundColor: "#2C2E33", padding: "9px", borderRadius: "4px" }}
                checked={doWordWrap}
                radius="xs"
                onChange={(event) => setDoWordWrap(event.currentTarget.checked)}
                label="Word Wrap"
              />
            </Tooltip>
          </Group>
        </div>
      </div>
      <Footer />
      <style jsx global>{`
        body {
          background: ${
            ["1A1B1E", "364264", "476856", "624c4c", "747450", "785674"].includes(pasteColorValue)
              ? "#" + pasteColorValue
              : "#1A1B1E"
          };]};
        }
        .pastePage {
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          min-height: 85vh;
          margin: 20px auto;
          padding: 20px;
        }
        .pastePage__pasteArea {
          width: 100%;
          max-width: 800px;
          margin: 20px auto;
        }
        .pastePage__pasteAreaMetaData {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
          margin-bottom: 20px;
        }
        .pastePage__pasteAreaMetaDataColorGroup {
          background: #2c2e33;
          border-radius: 4px;
          padding: "0 10px";
        }
        .pastePage__pasteAreaTextarea textarea {
          height: 70vw;
        }
        @media only screen and (max-width: 500px) {
          .pastePage__pasteAreaMetaData {
            flex-direction: column;
            gap: 10px;
          }
          .pastePage__pasteAreaMetaDataColorGroup,
          .pastePage__pasteAreaMetaDataTitle {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
