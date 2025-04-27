"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Toolbar from "./toolbar";
import {
  applyFormatting,
  getSelectionInfo,
  insertMention,
} from "@/lib/editor-utils";
import { editorReducer, initialEditorState } from "../lib/editor-reducer";
import MentionMenu from "./MentionsMenu";

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const [state, dispatch] = useReducer(editorReducer, initialEditorState);
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [mentionSearch, setMentionSearch] = useState("");

  const [selectionInfo, setSelectionInfo] = useState({
    range: null,
    text: "",
    isCollapsed: true,
  });

  const handleSelectionChange = useCallback(() => {
    if (!editorRef.current) return;

    const info = getSelectionInfo(editorRef.current);
    if (info) {
      setSelectionInfo(info);

      const selection = window.getSelection();
      if (selection && selection.isCollapsed && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textBefore = getTextBeforeCursor(range);

        if (textBefore.endsWith("@")) {
          const rect = range.getBoundingClientRect();
          const editorRect = editorRef.current.getBoundingClientRect();
          setMentionPosition({
            top: rect.bottom - editorRect.top,
            left: rect.left - editorRect.left,
          });
          setShowMentionMenu(true);
          setMentionSearch("");
        } else if (showMentionMenu) {
          const match = textBefore.match(/@(\w*)$/);
          if (match) {
            setMentionSearch(match[1]);
          } else {
            setShowMentionMenu(false);
          }
        }
      }
    }
  }, [showMentionMenu]);

  const getTextBeforeCursor = (range) => {
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(editorRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    return preSelectionRange.toString();
  };

  useEffect(() => {
    if (!editorRef.current) return;

    editorRef.current.contentEditable = "true";

    const savedContent = localStorage.getItem("rich-editor-content");
    if (savedContent) {
      editorRef.current.innerHTML = savedContent;
      dispatch({ type: "UPDATE_CURRENT", payload: { content: savedContent } });
    } else if (editorRef.current.innerHTML === "") {
      editorRef.current.innerHTML = "<p><br></p>";
    }

    document.addEventListener("selectionchange", handleSelectionChange);

    const handleBlur = () => {
      const currentContent = editorRef.current?.innerHTML || "";
      dispatch({ type: "SAVE_HISTORY", payload: { content: currentContent } });
      localStorage.setItem("rich-editor-content", currentContent);
    };

    editorRef.current.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      editorRef.current?.removeEventListener("blur", handleBlur);
    };
  }, [handleSelectionChange]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!editorRef.current) return;

      if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.shiftKey ? handleRedo() : handleUndo();
        return;
      }

      if (showMentionMenu) {
        if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
          e.preventDefault();
          if (e.key === "Escape") setShowMentionMenu(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state.undoStack, state.redoStack, showMentionMenu]);

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
    if (state.undoStack.length > 0) {
      editorRef.current.innerHTML = state.undoStack[state.undoStack.length - 1];
    }
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
    if (state.redoStack.length > 0) {
      editorRef.current.innerHTML = state.redoStack[state.redoStack.length - 1];
    }
  };

  useEffect(() => {
    const handlePaste = (e) => {
      if (!editorRef.current) return;

      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain") || "";

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);

        dispatch({
          type: "SAVE_HISTORY",
          payload: { content: editorRef.current.innerHTML },
        });
      }
    };

    editorRef.current?.addEventListener("paste", handlePaste);
    return () => editorRef.current?.removeEventListener("paste", handlePaste);
  }, []);

  const handleFormat = useCallback(
    (command, value) => {
      if (!editorRef.current) return;

      if (command === "undo") {
        handleUndo();
        return;
      }

      if (command === "redo") {
        handleRedo();
        return;
      }

      if (!selectionInfo.range) return;

      applyFormatting(command, value, selectionInfo.range, editorRef.current);
      dispatch({
        type: "SAVE_HISTORY",
        payload: { content: editorRef.current.innerHTML },
      });
      editorRef.current.focus();
    },
    [selectionInfo]
  );

  const handleMentionSelect = useCallback(
    (mention) => {
      if (!editorRef.current || !selectionInfo.range) return;

      insertMention(mention, selectionInfo.range, editorRef.current);
      setShowMentionMenu(false);

      dispatch({
        type: "SAVE_HISTORY",
        payload: { content: editorRef.current.innerHTML },
      });
      editorRef.current.focus();
    },
    [selectionInfo]
  );

  return (
    <div className="border border-gray-300 rounded-md">
      <Toolbar onFormat={handleFormat} />
      <div
        ref={editorRef}
        className="min-h-[300px] p-4 focus:outline-none"
        onInput={() => {
          if (editorRef.current) {
            const currentContent = editorRef.current.innerHTML;
            dispatch({
              type: "UPDATE_CURRENT",
              payload: { content: currentContent },
            });
            localStorage.setItem("rich-editor-content", currentContent);
          }
        }}
      />
      {showMentionMenu && (
        <MentionMenu
          position={mentionPosition}
          searchTerm={mentionSearch}
          onSelect={handleMentionSelect}
        />
      )}
    </div>
  );
}
