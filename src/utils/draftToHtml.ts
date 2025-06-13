import { ContentState, convertToRaw } from "draft-js";

export default function draftToHtml(contentState: ContentState) {
    const blocks = convertToRaw(
        ContentState.createFromBlockArray(contentState.getBlocksAsArray())
    ).blocks;
    let html = "";

    blocks.forEach((block) => {
        const blockType = block.type;
        const blockText = block.text;
        let blockHtml = "";

        switch (blockType) {
            case "header-one":
                blockHtml = "<h1>";
                break;
            case "header-two":
                blockHtml = "<h2>";
                break;
            case "unordered-list-item":
                blockHtml = "<li>";
                html += "<ul>";
                break;
            case "ordered-list-item":
                blockHtml = "<li>";
                html += "<ol>";
                break;
            case "blockquote":
                blockHtml = "<blockquote>";
                break;
            default:
                blockHtml = "<p>";
        }

        const rawBlock = block;
        const inlineStyleRanges = rawBlock.inlineStyleRanges || [];

        const stylesAtPosition: string[][] = Array(blockText.length)
            .fill(null)
            .map(() => []);

        inlineStyleRanges.forEach(({ offset, length, style }) => {
            for (let i = offset; i < offset + length; i++) {
                stylesAtPosition[i].push(style);
            }
        });

        let currentHtml = "";
        let lastStyles: string[] = [];
        for (let i = 0; i <= blockText.length; i++) {
            const currentStyles =
                i < blockText.length ? stylesAtPosition[i] : [];

            if (
                JSON.stringify(currentStyles) !== JSON.stringify(lastStyles) ||
                i === blockText.length
            ) {
                if (currentHtml) {
                    let styledText = currentHtml;
                    lastStyles.forEach((style) => {
                        if (style === "BOLD")
                            styledText = `<strong>${styledText}</strong>`;
                        if (style === "ITALIC")
                            styledText = `<em>${styledText}</em>`;
                        if (style === "UNDERLINE")
                            styledText = `<u>${styledText}</u>`;
                    });
                    blockHtml += styledText;
                    currentHtml = "";
                }
                lastStyles = currentStyles;
            }
            if (i < blockText.length) {
                currentHtml += blockText[i];
            }
        }

        const entityRanges = rawBlock.entityRanges || [];
        let entityAdjustedHtml = "";
        let lastEnd = 0;

        entityRanges.forEach(({ offset, length, key }) => {
            const entity = contentState.getEntity(String(key));
            if (entity.getType() === "LINK") {
                const { url } = entity.getData();
                entityAdjustedHtml += blockHtml.slice(lastEnd, offset);
                const entityText = blockHtml.slice(offset, offset + length);
                entityAdjustedHtml += `<a href="${url}">${entityText}</a>`;
                lastEnd = offset + length;
            }
        });

        entityAdjustedHtml += blockHtml.slice(lastEnd);
        blockHtml = entityAdjustedHtml;

        switch (blockType) {
            case "header-one":
                blockHtml += "</h1>";
                break;
            case "header-two":
                blockHtml += "</h2>";
                break;
            case "unordered-list-item":
                blockHtml += "</li>";
                html += blockHtml;
                html += "</ul>";
                break;
            case "ordered-list-item":
                blockHtml += "</li>";
                html += blockHtml;
                html += "</ol>";
                break;
            case "blockquote":
                blockHtml += "</blockquote>";
                break;
            default:
                blockHtml += "</p>";
        }

        if (!["unordered-list-item", "ordered-list-item"].includes(blockType)) {
            html += blockHtml;
        }
    });

    return html;
}
