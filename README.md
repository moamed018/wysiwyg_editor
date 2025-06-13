# WYSIWYG Text Editor Project Documentation

## Overview

This project is a feature-rich, customizable WYSIWYG (What You See Is What You Get) text editor built from scratch using **React**, **TypeScript**, and **Jest** for testing. The editor leverages **Draft.js** as its core engine for managing rich text state and formatting, while maintaining a lightweight and modular architecture. All core functionalities, including Draft.js content conversion to HTML (`draftToHtml`) and toast notifications (`useToast`), were implemented **without relying on prebuilt libraries** such as `draft-js-to-html` or `react-toastify`. This approach ensures precise control over the output, optimized performance, and tailored behavior to meet specific requirements.

The editor supports various use cases, including controlled and uncontrolled modes, custom and extended toolbar configurations, asynchronous content loading, and real-time content preview (HTML and plain text). The codebase includes targeted testing with **Jest** for the `DefaultToolbar` component to ensure reliability.

## Demo Link:

[vercel](https://wysiwyg-editor-ruddy.vercel.app/)

## Key Features

-   **Controlled and Uncontrolled Modes**: Supports both controlled mode (with synchronized state updates) and uncontrolled mode (for stateless editing).
-   **Customizable Styling**: Allows custom CSS classes and inline styles for the editor and buttons.
-   **Extended Toolbar**: Integrates additional controls like undo and redo alongside the default toolbar.
-   **Custom Toolbar**: Enables complete replacement of the default toolbar with a custom implementation.
-   **Asynchronous Behavior**: Simulates async content loading and saving with visual feedback (e.g., loading states and toast notifications).
-   **Real-Time Content Conversion**: Converts Draft.js content to HTML or plain text in real-time using a custom `draftToHtml` utility.
-   **Toast Notifications**: A custom-built notification system via the `useToast` hook and `Toast` component.
-   **Targeted Testing**: The `DefaultToolbar` component is tested with Jest to verify rendering, interactivity, and formatting behavior.

## Technology Stack

-   **React**: For building UI components and managing state.
-   **TypeScript**: For type safety and improved developer experience.
-   **Draft.js**: For rich text editing and content management.

## Implementation Highlights

-   **Custom Draft.js to HTML Conversion**: A bespoke `draftToHtml` utility was developed to convert Draft.js content to HTML, avoiding dependencies like `draft-js-to-html`. This ensures precise control over the output format.
-   **Custom Toast System**: The `useToast` hook and `Toast` component were built from scratch, providing a lightweight, customizable notification system without relying on libraries like `react-toastify`.
-   **Modular Toolbar Design**: The toolbar is split into `DefaultToolbar` and `CustomToolbar`, offering flexibility to extend or replace default controls.
-   **Asynchronous Behavior Simulation**: Fake async operations (e.g., content loading and saving) use `setTimeout` to mimic API interactions, with proper loading states and user feedback via toasts.
-   **Jest for Testing**: The `DefaultToolbar` component is tested with Jest, using Testing Library for robust DOM and user interaction testing.

## Demo Features (Home Page)

The home page (`App.tsx`) demonstrates the editor’s capabilities through six sections, each showcasing a specific feature:

1. **Controlled Mode**:

    - Renders a `WYSIWYGEditor` in controlled mode, with `editorState` managed via React state.
    - Includes tabs to switch between HTML and plain text views, updated in real-time using `draftToHtml` and `getPlainText`.

2. **Uncontrolled Mode**:

    - Displays a `WYSIWYGEditor` without external state management for stateless editing.
    - Ideal for simple use cases where internal state suffices.

3. **Customization Style**:

    - Showcases styling customization with custom CSS classes (`customize-editor`) and inline styles (e.g., green border, rounded corners).
    - Customizes the save button with a specific class (`customize-save-btn`).

4. **Extended Toolbar**:

    - Combines `DefaultToolbar` with undo and redo buttons, using `EditorState.undo` and `EditorState.redo`.
    - Hides default reset and save buttons via `hideReset` and `hideSave` props.

5. **Custom Toolbar**:

    - Replaces the default toolbar with a `CustomToolbar` component via the `renderToolbar` prop.
    - Offers full control over toolbar UI and behavior.

6. **Fake Async Behavior**:
    - Simulates async content loading and saving with a 1-second delay using `setTimeout`.
    - Includes a “Load Content” button to trigger fake async content loading.
    - Displays loading states for the editor and save button, with success notifications via `useToast`.

## Test Cases Overview

The project includes a test suite written with **Jest** for the `DefaultToolbar` component, executed in a `jsdom` environment with TypeScript support. The following seven test cases ensure the toolbar’s rendering, interactivity, and formatting functionality:

1. **Renders the toolbar with the correct class**:

    - Verifies that the toolbar renders with the `toolbar` class when passed as a prop.
    - Ensures the toolbar element has the correct ARIA role (`role="toolbar"`).

2. **Displays the Bold, Italic, and Underline buttons**:

    - Confirms that three buttons (Bold, Italic, Underline) are rendered.
    - Verifies that each button contains an SVG icon, identified by `toolbar-svg` test ID.

3. **Applies BOLD formatting when the Bold button is clicked**:

    - Tests that clicking the Bold button triggers `handleEditorChange` once.
    - Ensures the passed `editorState` object contains the expected structure.

4. **Applies ITALIC formatting when the Italic button is clicked**:

    - Tests that clicking the Italic button triggers `handleEditorChange` once.
    - Verifies the passed `editorState` object has the expected structure.

5. **Applies UNDERLINE formatting when the Underline button is clicked**:

    - Tests that clicking the Underline button triggers `handleEditorChange` once.
    - Confirms the passed `editorState` object matches the expected structure.

6. **Adds the active class to the Bold button when the formatting is enabled**:

    - Verifies that the Bold button has the `active` class when the `editorState` has `BOLD` formatting applied via `RichUtils.toggleInlineStyle`.

7. **Prevents the default behavior when the Bold button is clicked**:
    - Tests that a `mousedown` event on the Bold button calls `preventDefault` once, ensuring default browser behavior is suppressed.

## Installation

### Prerequisites

-   **Node.js**: Version 18 or higher recommended.
-   **npm**: Comes with Node.js (or use `yarn` if preferred).

### Installation Steps

1. **Clone the Repository**:

    ```bash
    git clone <repository-url>
    cd wysiwyg_editor
    ```

2. **Install Dependencies**:
   Install all dependencies:

    ```bash
    npm install
    ```

    This installs production dependencies (`draft-js`, `react`, `react-dom`) and development dependencies (`jest`, `jest-environment-jsdom`, `ts-jest`, Testing Library packages, `identity-obj-proxy`, etc.).

3. **Verify Configuration**:
   The project is pre-configured with the following files:
    - `jest.config.js`: Sets up Jest with `ts-jest`, `jsdom`, and CSS module mocking.
    - `jest.setup.ts`: Imports `@testing-library/jest-dom` for extended assertions.
    - `tsconfig.json`: Configures TypeScript with `es2015`, `dom`, and Jest-related types.
  
### Running the Project

To start the project in development mode, run the following command:

```bash
npm run dev
```

This launches the Vite development server, and the application will be available at `http://localhost:5173` (or another port if specified).

### Troubleshooting Installation

-   **Missing Dependencies**: Re-run `npm install`.
-   **Jest Environment Errors**: Ensure `jest-environment-jsdom` is installed (`npm install --save-dev jest-environment-jsdom`).
-   **TypeScript Errors**: Run `tsc --noEmit` to check types.
-   **CSS Issues**: Verify `identity-obj-proxy` is installed and `moduleNameMapper` is set in `jest.config.js`.

## Important Notes

-   **Performance**: Optimized with memoization (e.g., in `WYSIWYGEditor`) to minimize re-renders.
-   **Extensibility**: Modular design supports adding new toolbar buttons or content formats.
-   **Cross-Browser Compatibility**: Configured for older browsers via `target: es5`.
-   **Security**: HTML output from `draftToHtml` is assumed sanitized to prevent XSS.
-   **Maintainability**: Uses TypeScript for type safety and CSS Modules for scoped styling.

## Future Improvements

-   Support additional formatting (e.g., lists, headings).
-   Integrate real APIs for async content loading/saving.
-   Enhance accessibility with improved ARIA labels and keyboard navigation.
-   Develop a plugin system for feature extensions.
-   Optimize `draftToHtml` for complex Draft.js content.

## Conclusion

This WYSIWYG text editor is a robust, customizable solution built from scratch with React, TypeScript, and Draft.js. By implementing features like `draftToHtml` and `useToast` without external libraries, it achieves a lightweight footprint while meeting modern requirements. The Jest test suite for `DefaultToolbar` ensures reliability, and the modular architecture supports future enhancements. The demo sections in `App.tsx` showcase its versatility, making it suitable for diverse applications.
