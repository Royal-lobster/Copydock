import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

function index() {
  const router = useRouter();
  useEffect(() => {
    router.push("/paste");
  }, []);
  return null;
}

export default index;
