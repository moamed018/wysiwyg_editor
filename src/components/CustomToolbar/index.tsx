import * as React from "react";
import { EditorState, RichUtils } from "draft-js";
import "./CustomToolbar.css";

interface ICustomToolbar {
    editorState: EditorState;
    handleEditorChange: (newEditorState: EditorState) => void;
    className?: string;
}

const CustomToolbar: React.FC<ICustomToolbar> = ({
    editorState,
    handleEditorChange,
    className,
}) => {
    const toggleInlineStyle = (style: string) => {
        handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    };

    const toggleBlockType = (blockType: string) => {
        handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const currentStyle = editorState.getCurrentInlineStyle();
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);

    const inlineStyles = [
        {
            style: "BOLD",
            icon: (
                <svg
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
            ),
        },
        {
            style: "ITALIC",
            icon: (
                <svg
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
            ),
        },
        {
            style: "UNDERLINE",
            icon: (
                <svg
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
            ),
        },
        {
            style: "STRIKETHROUGH",
            icon: (
                <svg
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
                    <path d="M16 4H9a3 3 0 0 0-2.8 4" />
                    <path d="M14 20h-5a3 3 0 0 1 0-6h6" />
                    <line x1="4" x2="20" y1="12" y2="12" />
                </svg>
            ),
        },
        {
            style: "CODE",
            icon: (
                <svg
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
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                </svg>
            ),
        },
    ];

    const blockTypes = [
        {
            type: "unstyled",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M12 4v16" />
                    <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
                    <path d="M9 20h6" />
                </svg>
            ),
        },
        {
            type: "header-one",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M4 12h8" />
                    <path d="M4 18V6" />
                    <path d="M12 18V6" />
                    <path d="m17 12 3-2v8" />
                </svg>
            ),
        },
        {
            type: "header-two",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M4 12h8" />
                    <path d="M4 18V6" />
                    <path d="M12 18V6" />
                    <path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" />
                </svg>
            ),
        },
        {
            type: "header-three",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M4 12h8" />
                    <path d="M4 18V6" />
                    <path d="M12 18V6" />
                    <path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" />
                    <path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" />
                </svg>
            ),
        },
        {
            type: "unordered-list-item",
            icon: (
                <svg
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
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3.01" y1="6" y2="6" />
                    <line x1="3" x2="3.01" y1="12" y2="12" />
                    <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
            ),
        },
        {
            type: "ordered-list-item",
            icon: (
                <svg
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
                    <line x1="10" x2="21" y1="6" y2="6" />
                    <line x1="10" x2="21" y1="12" y2="12" />
                    <line x1="10" x2="21" y1="18" y2="18" />
                    <path d="M4 6h1v4" />
                    <path d="M4 10h2" />
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                </svg>
            ),
        },
        {
            type: "blockquote",
            icon: (
                <svg
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
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M13 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
            ),
        },
        {
            type: "code-block",
            icon: (
                <svg
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
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                </svg>
            ),
        },
    ];

    return (
        <div className={`custom-toolbar  ${className || ""}`}>
            <div>
                {blockTypes.map(({ type, icon }) => (
                    <button
                        type="button"
                        key={type}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleBlockType(type);
                        }}
                        className={`toolbar-button ${
                            currentBlockType === type ? "active" : ""
                        }`}
                    >
                        {icon}
                    </button>
                ))}
            </div>
            <div>
                {inlineStyles.map(({ style, icon }) => (
                    <button
                        type="button"
                        key={style}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleInlineStyle(style);
                        }}
                        className={`toolbar-button ${
                            currentStyle.has(style) ? "active" : ""
                        }`}
                    >
                        {icon}
                    </button>
                ))}
            </div>
            <div className="">
                <button
                    className="toolbar-button"
                    onClick={() => {
                        const newEditorState = EditorState.undo(editorState);
                        handleEditorChange(newEditorState);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M3 7v6h6" />
                        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                    </svg>
                </button>
                <button
                    className="toolbar-button"
                    onClick={() => {
                        const newEditorState = EditorState.redo(editorState);
                        handleEditorChange(newEditorState);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M21 7v6h-6" />
                        <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CustomToolbar;
