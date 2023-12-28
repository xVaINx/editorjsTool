import EditorJS from "@editorjs/editorjs";

import List from "@editorjs/list";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";

import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import MentionTool from "./MentionTool.js";
import URLTool from "./URLTool.js";

document.addEventListener("DOMContentLoaded", function () {
  const editor = new EditorJS({
    holder: "editorjs",
    tools: {
      list: {
        class: List,
        inlineToolbar: true,
      },

      header: Header,

      delimiter: Delimiter,

      table: {
        class: Table,
        inlineToolbar: true,
      },

      warning: {
        class: Warning,
        inlineToolbar: true,
      },

      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },

      inlineCode: {
        class: InlineCode,
        shortcut: "CMD+SHIFT+C",
      },

      marker: {
        class: Marker,
        shortcut: "CMD+SHIFT+M",
      },

      raw: RawTool,

      embed: Embed,

      mention: {
        class: MentionTool,
        config: {
          users: [
            {
              id: "AHXBHIBC IQBCBQ1",
              profile_photo:
                "https://askmescript.com/upload/photos/2020/04/EZQXmD79fDXYYB7CpoDb_22_2564e94001831683083bda12432b7e56_image.png",
              name: "John Doe",
            },
            {
              id: "AHXBHIBC IQBCBQ2",
              href: "http://placehold.it/300x200",
              name: "Jane Doe",
            },
            {
              id: "AHXBHIBC IQBCBQ3",
              href: "http://placehold.it/300x200",
              name: "Jaan Doe",
            },
            {
              id: "AHXBHIBC IQBCBQ4",
              href: "http://placehold.it/300x200",
              name: "Jang Doe",
            },
            {
              id: "AHXBHIBC IQBCBQ5",
              href: "http://placehold.it/300x200",
              name: "Hand Doe",
            },
          ],
        },
      },

      url: {
        class: URLTool,
        config: {
          links: [
            {
              id: "AHXBHIBC IQBCBQ1",
              href:
                "https://google.com",
              linkName: "Google",
            },
            {
              id: "AHXBHIBC IQBCBQ2",
              href:
                "https://youtube.com",
                linkName: "Youtube",
            },
            {
              id: "AHXBHIBC IQBCBQ3",
              href:
                "https://linkedin.com",
                linkName: "LinkedIn",
            },
          ]
        },
      },
    },
    onChange: () => {
      editor
        .save()
        .then((outputData) => {
          console.log(outputData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onReady: () => {
      console.log("Editor.js is ready to work!");
    },
  });
});
