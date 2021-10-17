import React from "react";
import { CopyIcon } from "@modulz/radix-icons";
import { Title, ThemeIcon } from "@mantine/core";
function Navbar() {
  return (
    <div>
      <Title
        align="center"
        order={1}
        style={{
          fontFamily: "Montserrat, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          color: "#eeeeee",
        }}
      >
        <ThemeIcon variant="gradient" gradient={{ from: "orange", to: "red" }}>
          <CopyIcon />
        </ThemeIcon>{" "}
        <span>
          Copy<span style={{ fontFamily: "Damion, cursive" }}>dock</span>
        </span>
      </Title>
    </div>
  );
}

export default Navbar;
