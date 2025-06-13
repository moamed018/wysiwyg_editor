import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditorState, RichUtils } from "draft-js";
import DefaultToolbar from "./DefaultToolbar";

const mockHandleEditorChange = jest.fn();

describe("DefaultToolbar", () => {
    let editorState: EditorState;
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        editorState = EditorState.createEmpty();
        mockHandleEditorChange.mockClear();
        user = userEvent.setup();
    });

    test("Renders the toolbar with the correct class", () => {
        const { getByRole } = render(
            <DefaultToolbar
                editorState={editorState}
                handleEditorChange={mockHandleEditorChange}
                className="toolbar"
            />
        );

        const toolbar = getByRole("toolbar");
        expect(toolbar).toHaveClass("toolbar");
        expect(toolbar).toHaveClass("toolbar");
    });

    test("Displays the Bold, Italic, and Underline buttons", () => {
        const { getAllByRole, getAllByTestId } = render(
            <DefaultToolbar
                editorState={editorState}
                handleEditorChange={mockHandleEditorChange}
            />
        );

        const buttons = getAllByRole("button");
        expect(buttons).toHaveLength(3);

        expect(getAllByTestId("toolbar-svg")).toHaveLength(3);
    });

    test("Applies BOLD formatting when the Bold button is clicked", async () => {
        const { getByTestId } = render(
            <DefaultToolbar
                editorState={editorState}
                handleEditorChange={mockHandleEditorChange}
            />
        );

        const boldButton = getByTestId("bold-button");
        await user.click(boldButton);

        expect(mockHandleEditorChange).toHaveBeenCalledTimes(1);
        expect(mockHandleEditorChange).toHaveBeenCalledWith(
            expect.objectContaining({
                _immutable: expect.anything(),
            })
        );
    });

    test("Applies ITALIC formatting when the Italic button is clicked", async () => {
        const { getByTestId } = render(
            <DefaultToolbar
                editorState={editorState}
                handleEditorChange={mockHandleEditorChange}
            />
        );

        const italicButton = getByTestId("italic-button");
        await user.click(italicButton);

        expect(mockHandleEditorChange).toHaveBeenCalledTimes(1);
        expect(mockHandleEditorChange).toHaveBeenCalledWith(
            expect.objectContaining({
                _immutable: expect.anything(),
            })
        );
    });

    test("Applies UNDERLINE formatting when the Underline button is clicked", async () => {
        const { getByTestId } = render(
            <DefaultToolbar
                editorState={editorState}
                handleEditorChange={mockHandleEditorChange}
            />
        );

        const underlineButton = getByTestId("underline-button");
        await user.click(underlineButton);

        expect(mockHandleEditorChange).toHaveBeenCalledTimes(1);
        expect(mockHandleEditorChange).toHaveBeenCalledWith(
            expect.objectContaining({
                _immutable: expect.anything(),
            })
        );
    });

    test("Adds the active class to the Bold button when the formatting is enabled", () => {
        const boldEditorState = RichUtils.toggleInlineStyle(
            EditorState.createEmpty(),
            "BOLD"
        );

        render(
            <DefaultToolbar
                editorState={boldEditorState}
                handleEditorChange={mockHandleEditorChange}
            />
        );

        const boldButton = screen.getByTestId("bold-button");
        expect(boldButton).toHaveClass("active");
    });

    test("Prevents the default behavior when the Bold button is clicked", async () => {
        render(
            <DefaultToolbar
                editorState={editorState}
                handleEditorChange={mockHandleEditorChange}
            />
        );

        const boldButton = screen.getByTestId("bold-button");

        const event = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
        });
        jest.spyOn(event, "preventDefault");

        fireEvent(boldButton, event);

        expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });
});
