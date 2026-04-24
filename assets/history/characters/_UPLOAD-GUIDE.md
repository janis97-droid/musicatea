# Character image upload guide

Use one folder per character under `assets/history/characters/`.

Recommended file names:

- `portrait.webp` or `portrait.jpg` — main portrait image.
- `stage-1.webp` / `stage-1.jpg` — optional performance image.
- `archive-1.webp` / `archive-1.jpg` — optional archive image.

After uploading images, update `data/character-images.js` so each character slug points to the uploaded file.

Preferred path format:

```js
"character-slug": {
  main_image: "assets/history/characters/character-slug/portrait.webp",
  main_image_caption: "...",
  extra_images: []
}
```

Keep image names in English lowercase, with hyphens instead of spaces. Avoid Arabic filenames and avoid spaces.
