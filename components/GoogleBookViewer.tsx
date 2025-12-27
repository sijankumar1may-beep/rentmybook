"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function GoogleBookViewer({ isbn }: { isbn: string }) {
  const initialized = useRef(false);
  const [embeddedViewAvailable, setEmbeddedViewAvailable] = useState(true);
  console.log("isbnisbn", isbn);
  const initViewer = () => {
    if (!window.google || initialized.current) return;

    initialized.current = true;

    window.google.books.load();

    window.google.books.setOnLoadCallback(() => {
      const viewer = new window.google.books.DefaultViewer(
        document.getElementById("viewerCanvas")
      );
      viewer.load(`ISBN:${isbn}`, () => {
        setEmbeddedViewAvailable(false);
        // alert("could not embed the book!");
      });
    });
  };
  useEffect(() => {
    if (initialized?.current) {
      initViewer();
    }
  }, [isbn]);
  return (
    <>
      <Script
        src="https://www.google.com/books/jsapi.js"
        strategy="afterInteractive"
        onLoad={initViewer}
      />
      {embeddedViewAvailable && (
        <div id="viewerCanvas" className="w-full h-[500px] border rounded-md" />
      )}
    </>
  );
}
