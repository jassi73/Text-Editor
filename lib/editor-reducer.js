// Initial state for the editor
export const initialEditorState = {
  currentContent: "",
  undoStack: [],
  redoStack: [],
  maxHistoryLength: 50,
};

// Reducer function to handle editor state changes
export function editorReducer(state, action) {
  switch (action.type) {
    case "UPDATE_CURRENT":
      return {
        ...state,
        currentContent: action.payload.content,
      };

    case "SAVE_HISTORY":
      // Only save to history if content has changed
      if (state.currentContent === action.payload.content) {
        return state;
      }

      // Add current content to undo stack and clear redo stack
      return {
        ...state,
        currentContent: action.payload.content,
        undoStack: [
          ...state.undoStack.slice(-state.maxHistoryLength + 1),
          state.currentContent,
        ],
        redoStack: [],
      };

    case "UNDO":
      if (state.undoStack.length === 0) {
        return state;
      }

      // Get the last item from undo stack
      const previousContent = state.undoStack[state.undoStack.length - 1];

      return {
        ...state,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [...state.redoStack, state.currentContent],
        currentContent: previousContent,
      };

    case "REDO":
      if (state.redoStack.length === 0) {
        return state;
      }

      const nextContent = state.redoStack[state.redoStack.length - 1];

      return {
        ...state,
        redoStack: state.redoStack.slice(0, -1),
        undoStack: [...state.undoStack, state.currentContent],
        currentContent: nextContent,
      };

    default:
      return state;
  }
}
