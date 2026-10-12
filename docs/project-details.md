# Portfolio data and project reference

This guide documents the properties currently supported by the portfolio. Edit the JSON files below to change content; the JSON is imported at build time.

## Which file to edit

| File | Purpose | Root structure |
| --- | --- | --- |
| `src/data/data.json` | Main page: identity, summary, education, skills, experience, certifications, and featured projects | Object |
| `src/data/ai-projects.json` | Project source collection | Array of project objects |
| `src/data/fullstack-projects.json` | Project source collection | Array of project objects |
| `src/data/desktop-projects.json` | Project source collection | Array of project objects |
| `src/data/app-projects.json` | Project source collection | Array of project objects |
| `src/data/landing-pages.json` | Project source collection | Array of project objects |
| `src/data/projects.js` | Merges and exports the All Projects catalog | JavaScript module |

`src/data/projects.js` concatenates the five source arrays in the order listed above. Every entry is preserved, including projects with the same name. Source array order controls display order.

Category tabs and counts use only each project's top-level `categories` array, regardless of its source filename. Supported values are `ai`, `fullstack`, `desktop`, `app`, and `landing`. For example, `"categories": ["fullstack", "app"]` places a project in both tabs. An empty array shows the project only in All. Every source entry must provide this array; there is no filename-based fallback. Each entry uses its own categories independently, including entries with the same name.

The catalog does not read the main file's featured `projects` array. Homepage projects remain separate copies: update both if you want matching content.

`public/assets/data.json` is not the main application's data source; `src/App.jsx` imports `src/data/data.json`.

## Main data file

| Property | Type | Purpose |
| --- | --- | --- |
| `personalInfo` | Object | Header identity and social links. |
| `summary` | Object | Profile summary section. |
| `education` | Array of objects | Education entries. |
| `skills` | Array of objects | Skill categories and their tags. |
| `experience` | Array of objects | Employment entries. |
| `certifications` | Array of objects | Credentials and their links. |
| `projects` | Array of project objects | Featured project cards on the homepage. See the project reference below. |

Keep the expected object and array types. Empty arrays are supported. Omitting an entire section causes its component to return nothing, but individual entries should contain the fields described below.

### personalInfo

| Property | Type | Purpose |
| --- | --- | --- |
| `name` | String | Display name; rendered in uppercase. Required when `personalInfo` exists. |
| `title` | String | Professional title; rendered in uppercase. Required when `personalInfo` exists. |
| `socialLinks` | Object | Map of platform names to link objects. Use `{}` for no social links. Required when `personalInfo` exists. |
| `socialLinks.mail` | Link object | Email link with an envelope icon. |
| `socialLinks.linkedin` | Link object | LinkedIn link with a LinkedIn icon. |
| `socialLinks.github` | Link object | GitHub link with a GitHub icon. |
| `socialLinks.<platform>.url` | String | Destination URL; use `mailto:address@example.com` for email. |
| `socialLinks.<platform>.label` | String | Visible text and accessible label for the link. |

Additional platform keys render a text link, but have no built-in icon. Social link order follows the object key order.

The profile photo (`public/assets/pic.jpg`), resume (`public/assets/resume.pdf`), and hero sentence are currently configured in `src/components/Header.jsx`, not in JSON. Replace those asset files or edit that component to change them.

### summary

| Property | Type | Purpose |
| --- | --- | --- |
| `profile` | String | Summary text. An empty or missing value hides the summary section. This field is rendered as HTML, unlike project detail text. |

For highlighted text, use `<span class="highlight">FastAPI</span>` inside the string, escaping the double quotes as `\"` in JSON. Use trusted, manually authored HTML.

### education[]

| Property | Type | Purpose |
| --- | --- | --- |
| `degree` | String | Qualification heading. |
| `institute` | String | School or university name. |
| `timeline` | String | Displayed dates; no date parsing is performed. |
| `marks` | String | Optional score, displayed only when nonempty. |
| `isGpa` | Boolean | Optional; `true` labels the score CGPA, otherwise it is labeled Marks. |
| `total_marks` | String | Present in the data, but currently unused by the renderer. It does not display a denominator. |
| `award` | String | Optional award badge; omitted or empty hides the badge. |

### skills[]

| Property | Type | Purpose |
| --- | --- | --- |
| `category` | String | Category heading. |
| `items` | Array of strings | Skill tags in display order. Required for each category; use `[]` for no tags. |

### experience[]

| Property | Type | Purpose |
| --- | --- | --- |
| `title` | String | Job title. |
| `company` | String | Employer name. |
| `timeline` | String | Displayed employment dates. |
| `description` | String | Plain-text description of the work. |

### certifications[]

| Property | Type | Purpose |
| --- | --- | --- |
| `name` | String | Credential name. |
| `institute` | String | Issuer name. |
| `link` | String | URL for See Credentials, opened in a new tab. Provide a real URL; the link is always rendered. |

### Main data example

This example shows every main-data property. Replace the featured project with a project from the complete example below as needed.

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Software Engineer",
    "socialLinks": {
      "mail": { "url": "mailto:you@example.com", "label": "MAIL" },
      "linkedin": { "url": "https://www.linkedin.com/in/your-profile", "label": "LINKEDIN" },
      "github": { "url": "https://github.com/your-user", "label": "GITHUB" }
    }
  },
  "summary": {
    "profile": "I build products with <span class=\"highlight\">React</span> and Python."
  },
  "education": [
    {
      "degree": "BS in Computer Science",
      "institute": "Your University",
      "timeline": "2020–2024",
      "marks": "3.93",
      "isGpa": true,
      "total_marks": "4.00",
      "award": "Gold Medal"
    }
  ],
  "skills": [
    { "category": "LANGUAGES", "items": ["Python", "JavaScript"] }
  ],
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Your Company",
      "timeline": "Jul 2024–Present",
      "description": "Built and maintained full-stack applications."
    }
  ],
  "certifications": [
    {
      "name": "Example Certification",
      "institute": "Example Issuer",
      "link": "https://example.com/credential"
    }
  ],
  "projects": [
    {
      "name": "Example Project",
      "description": "Short card summary.",
      "techStack": ["React", "FastAPI"],
      "details": {
        "blocks": [{ "type": "paragraph", "text": "Project overview." }]
      }
    }
  ]
}
```

## Project properties

The same schema applies to featured projects in the main file and entries in all category files.

| Property | Type | Required? | Purpose |
| --- | --- | --- | --- |
| `name` | String | Yes | Project title on the card and in dialogs. |
| `categories` | Array of strings | Yes for catalog entries | Tab membership: `ai`, `fullstack`, `desktop`, `app`, `landing`. Use `[]` for All only. Featured homepage selection does not use this field. |
| `description` | String | Recommended | Short card summary; it is not automatically repeated in details. |
| `techStack` | Array of strings | No | Technology tags. Defaults to `[]`; cards show the first four with a remaining count, details show all. |
| `coverImage` | String | No | Card thumbnail. Without it, a placeholder with the project name appears. |
| `liveLink` | String | No | Live demo link, represented by a globe icon. |
| `githubLink` | String | No | Repository link, represented by a GitHub icon. |
| `appLink` | String | No | Android app link, represented by an Android icon. |
| `iosLink` | String | No | iOS app link, represented by an Apple icon. |
| `videos` | Array of video objects | No | Separate modal playlist; independent from inline detail videos. Defaults to no modal videos. |
| `details` | Object | Yes | Container for the project detail body. |
| `details.blocks` | Array of block objects | Yes | Complete detail body in display order. Use `[]` for an intentionally empty body. |

An omitted, empty, or `"#"` project link is hidden. Available external links open in a new tab. The video icon appears only when the top-level `videos` array contains at least one entry with a nonempty string `src`, including when no external links are present. It has a tooltip and accessible label; no visible Videos text.

There is no supported top-level `images` field or legacy `points` fallback. Put detail screenshots and text inside `details.blocks`. Unknown block types are ignored.

## Detail blocks

Every block needs `type`. Repeat and mix blocks freely; they render in array order. Text in headings, paragraphs, lists, titles, and captions is plain text, not HTML.

### heading

| Property | Type | Purpose |
| --- | --- | --- |
| `type` | String | `"heading"`. |
| `text` | String | Heading text. |
| `level` | Number | Optional; `3` renders a smaller subsection heading. Omit for the standard detail heading. |

### paragraph

| Property | Type | Purpose |
| --- | --- | --- |
| `type` | String | `"paragraph"`. |
| `text` | String | Paragraph text. |

### list

| Property | Type | Purpose |
| --- | --- | --- |
| `type` | String | `"list"`. |
| `items` | Array of strings | List entries. Defaults to an empty list. |
| `ordered` | Boolean | Optional; `true` displays a numbered list, otherwise bullets. |

### image

| Property | Type | Purpose |
| --- | --- | --- |
| `type` | String | `"image"`. |
| `src` | String | Required full image path; used by the enlarged image viewer. |
| `previewSrc` | String | Optional smaller preview shown in the detail body; defaults to `src`. |
| `alt` | String | Accessible image description. If absent, the caption is used, then an empty string. |
| `caption` | String | Optional text below the image. |
| `width` | String | Optional; `"wide"` applies the wider detail-image layout. Omit for the default layout. |

Clicking the image opens its original `src`, even if a separate preview is shown. The viewer supports Fit, zoom from 100% to 400%, and dragging or scrolling a zoomed image. Close with X, Escape, or the backdrop.

### gallery

| Property | Type | Purpose |
| --- | --- | --- |
| `type` | String | `"gallery"`. |
| `caption` | String | Optional gallery label used for the accessible gallery name. |
| `images` | Array of image objects | Screenshots in order. Empty galleries render nothing. |
| `images[].src` | String | Full image path, required for each image. |
| `images[].previewSrc` | String | Optional preview used in the slide and thumbnail strip; defaults to `src`. |
| `images[].alt` | String | Accessible description; falls back to the item caption, then gallery label. |
| `images[].caption` | String | Optional caption for the selected slide. |

Galleries show the selected caption and slide count. Multiple images add previous/next buttons and thumbnails. Clicking the selected image opens its original `src`. `width` is supported only on standalone image blocks, not gallery items.

### video

| Property | Type | Purpose |
| --- | --- | --- |
| `type` | String | `"video"`. |
| `src` | String | Required direct video-file path or URL. |
| `title` | String | Optional heading above the player and accessible player label. |
| `caption` | String | Optional text below the player; used as the accessible label when title is missing. |
| `poster` | String | Optional image shown before playback. |

Inline videos have native controls, no autoplay, and a 16:9 preview area. Videos fit without cropping. Metadata is requested before playback; a poster provides a reliable preview image. This block does not add a video to the separate modal.

### videos

| Property | Type | Purpose |
| --- | --- | --- |
| `type` | String | `"videos"`. |
| `videos` | Array of video objects | Multiple inline players in order. Each object supports `src`, `title`, `caption`, and `poster` as above; it does not need `type`. |

An omitted or empty array renders no players. Use multiple entries here only when you want stacked inline players in the detail body.

## Separate video modal

Project-level `videos` uses the same video-object fields: required `src`, optional `title`, `caption`, and `poster`. Do not add `type` to these entries. Use one entry for a single video or multiple entries for a playlist.

This collection is independent from `details.blocks`: defining a video in one does not add it to the other. To show the same video both inline and in the modal, add an entry in each place.

The icon beside project links opens a modal with one large player and a selectable playlist. `poster` supplies both the player preview and the playlist thumbnail; entries without a poster show a generic film icon in the playlist. Titles default when omitted. Captions appear below the selected player. The layout stacks on mobile.

Selecting another entry stops the previous player. Opening the modal pauses inline videos. Closing with X, Escape, or the backdrop stops modal playback, restores focus to the trigger, and keeps underlying project details open. A message appears if the selected video cannot load. Videos do not autoplay.

## Complete project example

This example includes every supported project field and every block type. Media paths are placeholders: add matching files before testing playback or images.

```json
{
  "name": "Example Project",
  "categories": ["fullstack", "app"],
  "description": "A short summary for the project card.",
  "techStack": ["React", "FastAPI", "PostgreSQL", "Docker", "Redis"],
  "coverImage": "assets/media/project/cover.png",
  "liveLink": "https://example.com",
  "githubLink": "https://github.com/your-user/your-project",
  "appLink": "https://play.google.com/store/apps/details?id=com.example.app",
  "iosLink": "https://apps.apple.com/app/id123456789",
  "videos": [
    {
      "src": "assets/media/project/demo.mp4",
      "title": "Project demo",
      "caption": "A tour of the main workflow.",
      "poster": "assets/media/project/demo-preview.png"
    },
    {
      "src": "assets/media/project/setup.mp4",
      "title": "Setup walkthrough",
      "caption": "How to get started.",
      "poster": "assets/media/project/setup-preview.png"
    }
  ],
  "details": {
    "blocks": [
      { "type": "heading", "text": "Overview" },
      { "type": "paragraph", "text": "Describe the project here." },
      {
        "type": "image",
        "src": "assets/media/project/dashboard.png",
        "previewSrc": "assets/media/project/dashboard-thumbnail.png",
        "alt": "Project dashboard",
        "caption": "Dashboard overview",
        "width": "wide"
      },
      { "type": "heading", "level": 3, "text": "My contribution" },
      { "type": "list", "items": ["Built the API.", "Designed the dashboard."] },
      { "type": "list", "ordered": true, "items": ["Install dependencies.", "Run the app."] },
      {
        "type": "gallery",
        "caption": "Application screens",
        "images": [
          {
            "src": "assets/media/project/settings.png",
            "previewSrc": "assets/media/project/settings-thumbnail.png",
            "alt": "Settings screen",
            "caption": "Application settings"
          },
          {
            "src": "assets/media/project/reports.png",
            "alt": "Reports screen",
            "caption": "Reporting dashboard"
          }
        ]
      },
      {
        "type": "video",
        "src": "assets/media/project/demo.mp4",
        "title": "Inline project demo",
        "caption": "This video also appears in the separate modal collection.",
        "poster": "assets/media/project/demo-preview.png"
      },
      {
        "type": "videos",
        "videos": [
          {
            "src": "assets/media/project/setup.mp4",
            "title": "Inline setup walkthrough",
            "caption": "Getting started.",
            "poster": "assets/media/project/setup-preview.png"
          },
          {
            "src": "assets/media/project/features.mp4",
            "title": "Inline feature tour",
            "caption": "Additional features.",
            "poster": "assets/media/project/features-preview.png"
          }
        ]
      }
    ]
  }
}
```

## Assets and checking changes

- Store local media under `public/`. For example, `public/assets/media/project/demo.mp4` is referenced as `assets/media/project/demo.mp4`. Do not include `public/` in the JSON path.
- Match filenames and letter case exactly, including on GitHub Pages. Use forward slashes in JSON paths.
- Direct hosted image and video-file URLs are supported. YouTube/Vimeo page URLs are not supported video sources; there is no embed block.
- Use video formats and codecs supported by your target browser. MP4 with H.264 video is a practical choice; a `.mp4` extension alone does not ensure compatibility.
- Images use `previewSrc`; videos use `poster`; cards use `coverImage`. These fields serve different display locations.
- Use valid JSON: double-quoted keys and strings, no comments, and no trailing commas. Optional fields can be omitted.
- Run `npm run dev`, open the URL printed in the terminal, and inspect the homepage and category cards. Test detail images, inline playback, modal playlist selection, and closing behavior. Changes to imported JSON refresh during development; rebuild and redeploy to update the live site.
- Run `npm run build` to check production compilation. This does not verify that media files exist or that a browser can play them.
