import React, { useState, useRef, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import "./WYSIWYGEditor.css";
import DefaultToolbar from "../DefaultToolbar/DefaultToolbar";
import useToast from "../../hooks/useToast";
import Toast from "../../ui/Toast/Toast";

interface WYSIWYGEditorProps {
    value?: EditorState;
    onChange?: (editorState: EditorState) => void;
    className?: string;
    style?: React.CSSProperties;
    renderToolbar?: (
        editorState: EditorState,
        setEditorState: (state: EditorState) => void
    ) => React.JSX.Element;
    onSave?: (newEditorState: EditorState) => void;
    btnSaveText?: string;
    btnSaveClassName?: string;
    hideReset?: boolean;
    hideSave?: boolean;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({
    value,
    onChange,
    className = "",
    style,
    renderToolbar,
    onSave,
    btnSaveText,
    btnSaveClassName,
    hideReset = false,
    hideSave = false,
}) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const editorRef = useRef<Editor | null>(null);

    const isControlled = value !== undefined && onChange !== undefined;

    const { addToast, toasts, removeToast } = useToast();

    useEffect(() => {
        if (isControlled && value) {
            setEditorState(value);
        }
    }, [value, isControlled]);

    const handleEditorChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        if (isControlled && onChange) {
            onChange(newEditorState);
        }
    };

    const handleKeyCommand = (command: string, state: EditorState) => {
        const newState = RichUtils.handleKeyCommand(state, command);
        if (newState) {
            handleEditorChange(newState);
            return "handled";
        }
        return "not-handled";
    };

    return (
        <div className={`wysiwyg-editor ${className}`} style={style}>
            {renderToolbar ? (
                renderToolbar(editorState, handleEditorChange)
            ) : (
                <DefaultToolbar
                    editorState={editorState}
                    handleEditorChange={handleEditorChange}
                />
            )}
            <div
                className="editor-container"
                onClick={() => editorRef.current?.focus()}
            >
                <Editor
                    editorState={editorState}
                    ref={editorRef}
                    onChange={handleEditorChange}
                    handleKeyCommand={handleKeyCommand}
                    placeholder="Write something..."
                />
            </div>
            {(!hideReset || !hideSave) && (
                <div className="editor-btn-container">
                    {!hideReset && (
                        <button
                            onClick={() => {
                                setEditorState(EditorState.createEmpty());
                                if (onChange) {
                                    onChange(EditorState.createEmpty());
                                }
                                addToast("Editor reset successfully", "info");
                            }}
                            className={`btn-reset`}
                        >
                            Reset
                        </button>
                    )}
                    {!hideSave && (
                        <button
                            onClick={() => {
                                if (onSave) {
                                    onSave(editorState);
                                } else {
                                    addToast(
                                        `onSave function is not provided\n Current Plain Text:\n ${editorState
                                            .getCurrentContent()
                                            .getPlainText()}`,
                                        "success"
                                    );
                                }
                            }}
                            className={`btn-save ${btnSaveClassName || ""}`}
                        >
                            {btnSaveText || "Save"}
                        </button>
                    )}
                </div>
            )}
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};

export default WYSIWYGEditor;
