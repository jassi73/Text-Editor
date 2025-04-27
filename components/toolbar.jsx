"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ChevronDown,
  X,
  Strikethrough,
  Undo,
  Redo,
  Type,
} from "lucide-react";

export default function Toolbar({ onFormat }) {
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("11");
  const [textColor, setTextColor] = useState("#000000");

  const fonts = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
  ];
  const fontSizes = [
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "16",
    "18",
    "20",
    "24",
    "30",
    "36",
    "48",
    "60",
    "72",
  ];
  const colors = [
    "#000000", // Black
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
    "#800080", // Purple
    "#008000", // Dark Green
    "#800000", // Maroon
    "#008080", // Teal
    "#000080", // Navy
    "#808080", // Gray
    "#FF6347", // Tomato
  ];

  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  return (
    <div className="flex items-center p-2 border-b border-gray-300 flex-wrap gap-1">
      {/* Font dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md"
          onClick={() => setShowFontDropdown(!showFontDropdown)}
        >
          <span>{fontFamily}</span>
          <ChevronDown size={14} />
        </button>

        {showFontDropdown && (
          <div className="absolute top-full left-0 z-10 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
            {fonts.map((font) => (
              <button
                key={font}
                className="w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => {
                  setFontFamily(font);
                  onFormat("fontName", font);
                  setShowFontDropdown(false);
                }}
              >
                {font}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Font size dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md"
          onClick={() => setShowSizeDropdown(!showSizeDropdown)}
        >
          <span>{fontSize}</span>
          <ChevronDown size={14} />
        </button>

        {showSizeDropdown && (
          <div className="absolute top-full left-0 z-10 w-20 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {fontSizes.map((size) => (
              <button
                key={size}
                className="w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => {
                  setFontSize(size);
                  onFormat("fontSize", size);
                  setShowSizeDropdown(false);
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Text color dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md"
          onClick={() => setShowColorDropdown(!showColorDropdown)}
          title="Text Color"
        >
          <Type size={18} style={{ color: textColor }} />
          <div
            className="w-4 h-4 rounded-sm border border-gray-300"
            style={{ backgroundColor: textColor }}
          ></div>
        </button>

        {showColorDropdown && (
          <div className="absolute top-full left-0 z-10 w-40 bg-white border border-gray-300 rounded-md shadow-lg p-2">
            <div className="grid grid-cols-5 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-sm border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setTextColor(color);
                    onFormat("foreColor", color);
                    setShowColorDropdown(false);
                  }}
                  title={color}
                ></button>
              ))}
            </div>
            <input
              type="color"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                onFormat("foreColor", e.target.value);
              }}
              className="w-full mt-2 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("bold")}
        title="Bold (Ctrl+B)"
      >
        <Bold size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("italic")}
        title="Italic (Ctrl+I)"
      >
        <Italic size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("underline")}
        title="Underline (Ctrl+U)"
      >
        <Underline size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("strikeThrough")}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("justifyLeft")}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("justifyCenter")}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("justifyRight")}
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Lists */}
      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("insertUnorderedList")}
        title="Bullet List"
      >
        <List size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("insertOrderedList")}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("undo")}
        title="Undo (Ctrl+Z)"
      >
        <Undo size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("redo")}
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo size={18} />
      </button>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => onFormat("formatBlock", "blockquote")}
        title="Quote"
      >
        <Quote size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => {
          onFormat("formatBlock", "pre");
          setTimeout(() => {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const pre = range.startContainer.parentElement.closest("pre");
              if (pre) {
                pre.className = "bg-gray-100 p-2 rounded font-mono my-2";
              }
            }
          }, 10);
        }}
        title="Code Block"
      >
        <Code size={18} />
      </button>

      {/* Headings */}
      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => {
          onFormat("formatBlock", "h1");
          setTimeout(() => {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const h1 = range.startContainer.parentElement.closest("h1");
              if (h1) {
                h1.className = "text-3xl font-bold my-3";
              }
            }
          }, 10);
        }}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => {
          onFormat("formatBlock", "h2");
          setTimeout(() => {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const h2 = range.startContainer.parentElement.closest("h2");
              if (h2) {
                h2.className = "text-2xl font-bold my-2";
              }
            }
          }, 10);
        }}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => {
          onFormat("formatBlock", "h3");
          setTimeout(() => {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const h3 = range.startContainer.parentElement.closest("h3");
              if (h3) {
                h3.className = "text-xl font-bold my-2";
              }
            }
          }, 10);
        }}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>

      {/* Clear formatting */}
      <button
        className="p-1 hover:bg-gray-100 rounded ml-auto"
        onClick={() => onFormat("removeFormat")}
        title="Clear Formatting"
      >
        <X size={18} />
      </button>
    </div>
  );
}
