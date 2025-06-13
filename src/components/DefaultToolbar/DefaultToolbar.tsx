import { RichUtils, EditorState } from "draft-js";

interface IDefaultToolbar {
    editorState: EditorState;
    handleEditorChange: (newEditorState: EditorState) => void;
    className?: string;
}

const DefaultToolbar = ({
    editorState,
    handleEditorChange,
    className,
}: IDefaultToolbar) => {
    const toggleInlineStyle = (style: string) => {
        handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    };

    return (
        <div className={`toolbar ${className || ""}`} role="toolbar">
            <button
                type="button"
                data-testid="bold-button"
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleInlineStyle("BOLD");
                }}
                className={
                    editorState.getCurrentInlineStyle().has("BOLD")
                        ? "active"
                        : ""
                }
            >
                <svg
                    data-testid="toolbar-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
                </svg>
            </button>
            <button
                type="button"
                data-testid="italic-button"
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleInlineStyle("ITALIC");
                }}
                className={
                    editorState.getCurrentInlineStyle().has("ITALIC")
                        ? "active"
                        : ""
                }
            >
                <svg
                    data-testid="toolbar-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="19" x2="10" y1="4" y2="4" />
                    <line x1="14" x2="5" y1="20" y2="20" />
                    <line x1="15" x2="9" y1="4" y2="20" />
                </svg>
            </button>
            <button
                type="button"
                data-testid="underline-button"
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleInlineStyle("UNDERLINE");
                }}
                className={
                    editorState.getCurrentInlineStyle().has("UNDERLINE")
                        ? "active"
                        : ""
                }
            >
                <svg
                    data-testid="toolbar-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
                    <line x1="4" x2="20" y1="20" y2="20" />
                </svg>
            </button>
        </div>
    );
};

export default DefaultToolbar;
