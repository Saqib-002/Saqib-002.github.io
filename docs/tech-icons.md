# Adding technology icons

Skills, project cards, and project details share `src/components/TechTag.jsx`.
The icon registry starts empty, so all tags display their existing text until
you add icons yourself. No icon package is required.

## Add an icon

1. Place your icon in `public/assets/tech-icons/`, for example `python.svg`.
   Prefer SVG with a `viewBox` and colors that are visible on the dark background.
2. Add its path to `src/data/techIcons.js`:

   ```js
   export const techIcons = {
     Python: 'assets/tech-icons/python.svg',
     'Next.js': 'assets/tech-icons/nextjs.svg',
   };
   ```

   These are examples; add entries only for files you have supplied.
   Paths are relative to `public/`, without `public/` or a leading slash.
   The component adds Vite's base URL for deployment under a subdirectory.
3. Use the exact registered name in a skill's `items` array or a project's
   `techStack` array. One entry supplies the icon everywhere that name appears.

Skills and featured projects are in `src/data/data.json`. Additional projects
are in the category JSON files imported by `src/data/projects.js`.
Keep these arrays as strings; no icon fields are needed in project data.

For aliases, register both labels with the same file path when appropriate.
Unregistered technologies and failed images show text only. Labels remain
visible, and icons have empty alt text to avoid repeating the label to screen readers.

## Check your addition

Run `npm run dev` and check the skills section, a project card, and its detail
modal at desktop and mobile widths. Verify the icon is legible, labels wrap,
and technologies without registered icons still display normally.
Run `npm run build` before deploying.

## Reuse in another project

Copy `TechTag.jsx`, `techIcons.js`, your icon folder, and the `.skill-tag`,
`.tech-tag`, `.tech-tag-icon`, and `.tech-tag-label` CSS rules from `src/index.css`.
Adjust relative imports to suit that project's folders. Use
`<TechTag name="Python" />` wherever you need a technology badge.
The base URL expression assumes Vite; adapt it if the new project uses another bundler.
