import WYSIWYGEditor from "./components/WYSIWYGEditor/WYSIWYGEditor";
import Navbar from "./ui/Navbar/Navbar";
import "./App.css";
import { useState } from "react";
import { ContentState, EditorState } from "draft-js";
import draftToHtml from "./utils/draftToHtml";
import DefaultToolbar from "./components/DefaultToolbar/DefaultToolbar";
import CustomToolbar from "./components/CustomToolbar";
import useToast from "./hooks/useToast";
import Toast from "./ui/Toast/Toast";

function App() {
    // Controlled mode
    const [controlledTab, setControlledTab] = useState("html");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [html, setHtml] = useState<string>("");
    const [plainText, setPlainText] = useState<string>("");

    const handleControlledEditorChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        if (controlledTab === "html") {
            const htmlContent = draftToHtml(newEditorState.getCurrentContent());
            setHtml(htmlContent);
        }
        if (controlledTab === "plain") {
            const plainText = newEditorState.getCurrentContent().getPlainText();
            setPlainText(plainText);
        }
    };

    // Extended toolbar
    const extendedToolbar = (
        editorState: EditorState,
        setEditorState: (state: EditorState) => void
    ) => {
        return (
            <div className="extended-toolbar">
                <DefaultToolbar
                    editorState={editorState}
                    handleEditorChange={setEditorState}
                    className="extended-toolbar-customize"
                />
                <div className="extended-toolbar-buttons">
                    <button
                        onClick={() => {
                            const newEditorState =
                                EditorState.undo(editorState);
                            setEditorState(newEditorState);
                        }}
                        className="btn undo-btn"
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
                        onClick={() => {
                            const newEditorState =
                                EditorState.redo(editorState);
                            setEditorState(newEditorState);
                        }}
                        className="btn redo-btn"
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

    // Async behavior
    const { addToast, toasts, removeToast } = useToast();

    const [editorStateAsync, setEditorStateAsync] = useState<EditorState>(
        EditorState.createEmpty()
    );
    const [btnAsyncClicked, setBtnAsyncClicked] = useState<boolean>(false);
    const [asyncContentLoading, setAsyncContentLoading] =
        useState<boolean>(false);
    const [asyncBtnLoading, setAsyncBtnLoading] = useState<boolean>(false);

    const fakeAsyncBehavior = async () => {
        setBtnAsyncClicked(true);
        setAsyncContentLoading(true);
        setTimeout(() => {
            const content = ContentState.createFromText(
                "This is a fake async content loaded after 1 second."
            );
            setEditorStateAsync(EditorState.createWithContent(content));
            setAsyncContentLoading(false);
        }, 1000);
    };
    const onSaveFake = () => {
        setAsyncBtnLoading(true);
        setTimeout(() => {
            addToast(
                `Content saved successfully! (Content: ${editorStateAsync
                    .getCurrentContent()
                    .getPlainText()})`,
                "success"
            );
            setAsyncBtnLoading(false);
        }, 1000);
    };

    return (
        <>
            <Navbar />
            <main>
                <section className="controlled-section">
                    <h2 className="section-heading">Controlled Mode</h2>
                    <div className="section-content">
                        <WYSIWYGEditor
                            value={editorState}
                            onChange={handleControlledEditorChange}
                        />
                        <div className="section-view">
                            <div className="section-view-tabs">
                                <button
                                    onClick={() => {
                                        handleControlledEditorChange(
                                            editorState
                                        );
                                        setControlledTab("html");
                                    }}
                                    className={`btn ${
                                        controlledTab === "html" ? "active" : ""
                                    }`}
                                >
                                    Html View
                                </button>
                                <button
                                    onClick={() => {
                                        handleControlledEditorChange(
                                            editorState
                                        );
                                        setControlledTab("plain");
                                    }}
                                    className={`btn ${
                                        controlledTab === "plain"
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Plain Text View
                                </button>
                            </div>
                            <div className="section-view-content">
                                {controlledTab === "html" && (
                                    <div
                                        className="html-view"
                                        dangerouslySetInnerHTML={{
                                            __html: html,
                                        }}
                                    />
                                )}
                                {controlledTab === "plain" && (
                                    <div className="plain-text-view">
                                        {plainText}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="uncontrolled-section">
                    <h2 className="section-heading">Uncontrolled Mode</h2>
                    <div className="section-content">
                        <WYSIWYGEditor />
                    </div>
                </section>

                <section className="customization-section">
                    <h2 className="section-heading">Customization Style</h2>
                    <div className="section-content">
                        <WYSIWYGEditor
                            className="customize-editor"
                            style={{
                                border: "2px solid green",
                                borderRadius: "8px",
                                padding: "10px",
                                boxShadow: "none",
                            }}
                            btnSaveClassName="customize-save-btn"
                        />
                    </div>
                </section>

                <section className="extended-toolbar-section">
                    <h2 className="section-heading">Extended Toolbar</h2>
                    <div className="section-content">
                        <WYSIWYGEditor
                            renderToolbar={extendedToolbar}
                            hideReset
                            hideSave
                        />
                    </div>
                </section>

                <section className="custom-toolbar-section">
                    <h2 className="section-heading">Custom Toolbar</h2>
                    <div className="section-content">
                        <WYSIWYGEditor
                            renderToolbar={(editorState, setEditorState) => (
                                <CustomToolbar
                                    editorState={editorState}
                                    handleEditorChange={setEditorState}
                                />
                            )}
                            hideReset
                            hideSave
                        />
                    </div>
                </section>

                <section className="async-behavior-section">
                    <h2 className="section-heading">Fake an Async Behavior</h2>
                    <div className="section-content">
                        <button
                            className="btn async-btn"
                            onClick={fakeAsyncBehavior}
                            disabled={asyncContentLoading}
                        >
                            {asyncContentLoading
                                ? "Loading..."
                                : btnAsyncClicked
                                ? "Reload Content After 1 Second"
                                : "Load Content After 1 Second"}
                        </button>
                        <WYSIWYGEditor
                            value={editorStateAsync}
                            onChange={setEditorStateAsync}
                            onSave={onSaveFake}
                            btnSaveClassName={`async-save-btn ${
                                asyncBtnLoading ? "loading" : ""
                            }`}
                            btnSaveText={
                                asyncBtnLoading ? "Saving..." : "Save Content"
                            }
                        />
                    </div>
                </section>
            </main>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </>
    );
}

export default App;
