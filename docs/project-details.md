# Flexible project details

Add `details.blocks` to any project in `src/data/data.json` or the category JSON files. Blocks render in exactly the order you provide. Repeat any type as often as needed. Text is plain text, not HTML.

All existing projects now use this schema. Their screenshot galleries come first, followed by the overview and highlights. Move or split gallery/image blocks anywhere in the array to change the layout. The separate `coverImage` field controls the card thumbnail.

```json
{
  "details": {
    "blocks": [
      { "type": "heading", "text": "Overview" },
      { "type": "paragraph", "text": "Describe the project here." },
      {
        "type": "image",
        "src": "assets/media/MIS/mandumah/initial_view.png",
        "alt": "Initial application view",
        "caption": "The initial application view",
        "width": "wide"
      },
      { "type": "heading", "text": "My contribution" },
      {
        "type": "list",
        "items": ["First contribution.", "Second contribution."]
      },
      { "type": "heading", "level": 3, "text": "Implementation steps" },
      { "type": "list", "ordered": true, "items": ["First step.", "Second step."] },
      {
        "type": "gallery",
        "caption": "Application screens",
        "images": [
          {
            "src": "assets/media/MIS/mandumah/chat_sample.png",
            "alt": "Example chat",
            "caption": "An example chat session"
          }
        ]
      },
      { "type": "paragraph", "text": "Add another paragraph wherever you need it." }
    ]
  }
}
```

- Heading: `text`; optional `level: 3` for a smaller subsection heading.
- Paragraph: `text`.
- List: `items` array of strings; optional `ordered: true`.
- Image: `src`, `alt`, optional `caption`; optional `width: "wide"`.
- Gallery: `images` array of objects with `src`, `alt`, optional `caption`.

Images open in the website's image viewer when clicked. Zoom in or out from 100% (fit) to 400%, and use Fit to reset. Drag with a mouse or touch, or scroll, to inspect a zoomed image. Close with the X button, Escape, or the surrounding backdrop. Paths reference files under `public/`.

Every project requires `details.blocks`. This is the complete detail body, so include all text, images, and galleries there. An empty array intentionally produces no detail body. There is no top-level `images` property or old description/points fallback.

Use `coverImage` (an image path) on the project to choose a card thumbnail separately from the detail content. Keep `description` as a short card summary. All detail text and screenshots belong in `details.blocks`. Links use `liveLink`, `githubLink`, `appLink` (Android), and `iosLink`.
