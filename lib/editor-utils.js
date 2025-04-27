// Get selection information from the editor
export function getSelectionInfo(editorElement) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);

  if (!editorElement.contains(range.commonAncestorContainer)) return null;

  return {
    range,
    text: selection.toString(),
    isCollapsed: selection.isCollapsed,
  };
}

// Apply formatting to the selected text
export function applyFormatting(command, value, range, editorElement) {
  const selection = window.getSelection();
  if (!selection) return;

  editorElement.focus();
  selection.removeAllRanges();
  selection.addRange(range);

  if (command === "formatBlock" && value) {
    try {
      document.execCommand(command, false, value);
    } catch (e) {
      const blockElement = document.createElement(value);
      const selectedContent = range.extractContents();
      blockElement.appendChild(selectedContent);
      range.insertNode(blockElement);

      range.selectNodeContents(blockElement);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  } else if (command === "fontSize" && value) {
    const size = Math.min(
      7,
      Math.max(1, Math.floor(Number.parseInt(value) / 6))
    );
    document.execCommand(command, false, size.toString());
  } else if (command === "fontName" && value) {
    document.execCommand(command, false, value);
  } else if (command === "foreColor" && value) {
    document.execCommand(command, false, value);
  } else if (
    command === "insertUnorderedList" ||
    command === "insertOrderedList"
  ) {
    document.execCommand(command, false);
    const lists = editorElement.querySelectorAll("ul, ol");
    lists.forEach((list) => {
      Array.from(list.children).forEach((child) => {
        if (child.tagName !== "LI") {
          const li = document.createElement("li");
          li.appendChild(child.cloneNode(true));
          list.replaceChild(li, child);
        }
      });
    });
  } else {
    document.execCommand(command, false);
  }
}

// Insert a list (ordered or unordered)
export function insertList(type, range, editorElement) {
  const selection = window.getSelection();
  if (!selection) return;

  editorElement.focus();
  selection.removeAllRanges();
  selection.addRange(range);

  if (type === "ordered") {
    document.execCommand("insertOrderedList", false);
  } else {
    document.execCommand("insertUnorderedList", false);
  }
}

// Insert a special block (quote, code block, or callout)
export function insertSpecialBlock(type, range, editorElement) {
  const selection = window.getSelection();
  if (!selection) return;

  editorElement.focus();
  selection.removeAllRanges();
  selection.addRange(range);

  if (type === "quote") {
    document.execCommand("formatBlock", false, "blockquote");
  } else if (type === "code") {
    document.execCommand("formatBlock", false, "pre");
  } else if (type === "callout") {
    const callout = document.createElement("div");
    callout.className = "callout";
    callout.contentEditable = "true";
    range.deleteContents();
    range.insertNode(callout);

    range.selectNodeContents(callout);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

// Create a link in the editor
export function createLink(url, range, editorElement) {
  const selection = window.getSelection();
  if (!selection) return;

  editorElement.focus();
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand("createLink", false, url);
}

// Insert a mention in the editor
export function insertMention(username, range, editorElement) {
  const selection = window.getSelection();
  if (!selection) return;

  editorElement.focus();
  selection.removeAllRanges();
  selection.addRange(range);

  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(editorElement);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  const textBefore = preSelectionRange.toString();

  const atIndex = textBefore.lastIndexOf("@");
  if (atIndex >= 0) {
    const charsToDelete = textBefore.length - atIndex;
    const deleteRange = range.cloneRange();
    deleteRange.setStart(
      deleteRange.startContainer,
      deleteRange.startOffset - charsToDelete
    );
    deleteRange.deleteContents();
    range = deleteRange;
  }

  const mentionSpan = document.createElement("span");
  mentionSpan.className = "mention";
  mentionSpan.contentEditable = "false";
  mentionSpan.dataset.username = username;
  mentionSpan.textContent = `@${username}`;

  mentionSpan.style.color = "#1d4ed8";
  mentionSpan.style.backgroundColor = "#dbeafe";
  mentionSpan.style.padding = "0 2px";
  mentionSpan.style.borderRadius = "2px";
  mentionSpan.style.userSelect = "all";

  range.insertNode(mentionSpan);

  range.setStartAfter(mentionSpan);
  range.setEndAfter(mentionSpan);
  selection.removeAllRanges();
  selection.addRange(range);

  const space = document.createTextNode(" ");
  range.insertNode(space);

  range.setStartAfter(space);
  range.setEndAfter(space);
  selection.removeAllRanges();
  selection.addRange(range);
}

export const mentionUsers = [
  {
    id: 1,
    username: "johndoe",
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    username: "janedoe",
    name: "Jane Doe",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    username: "alice",
    name: "Alice Smith",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    username: "bob",
    name: "Bob Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    username: "charlie",
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];
