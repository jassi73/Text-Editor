# Text Editor - Next.js

A **custom Text Editor** built with **Next.js**, designed for full flexibility and customization.  
It supports powerful text formatting, nested lists, custom block elements, inline components, and user mentions — all while keeping the editing experience smooth and intuitive.

## ✨ Features

- **Text Formatting**  
  - Bold, Italic, Underline
  - Headings (H1, H2, H3, etc.)

- **Nested Lists**  
  - Custom indentation behavior for better list management

- **Custom Block Elements**  
  - Quotes
  - Code Blocks

- **Inline Component System**  
  - Highlight text and open a dropdown to update or replace content
  - Insert interactive elements seamlessly within text
  - Edit properties of inserted components without disrupting surrounding text

- **User Mentions**  
  - Type `@` to mention users in the content

---

## 📦 Installation

```bash
git clone https://github.com/jassi73/Text-Editor.git
cd Text-Editor
npm install
npm run dev
```

Your app will be running at `http://localhost:3000`.

---

## 🚀 Usage

- Start typing normally.
- Use the toolbar to apply **bold**, **italic**, **underline**, or set **headings**.
- Create **nested lists** by indenting/unindenting items.
- Insert **block elements** like quotes, code blocks.
- Highlight any text and use the **dropdown** to insert **inline components**.
- Type `@` to open the **user mention** popup and select a user.

---

## 📂 Project Structure

```plaintext
/pages
/components
    /RichTextEditor
    /toolbar
    /MentionsMenu
    /ThemeProvider
/lib
    editor-reducer.js
    editor_utils.js
styles/
public/
```

---

## 🔧 Built With

- **Next.js** — React Framework
- **React Reducer — State management
- **TailwindCSS** or **CSS Modules** — Styling

---



---

## 👌 Acknowledgements

Special thanks to the open-source community for the libraries and tools used to make this project possible.

