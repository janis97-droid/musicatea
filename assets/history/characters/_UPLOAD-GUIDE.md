# Character image upload guide

Use one folder per character under `assets/history/characters/`.

You do **not** need to rename uploaded images. You can upload each image with its original filename.

The important rule is this:

- Put each image inside the correct character folder.
- After upload, I will scan the repo tree, read the actual filenames, and connect each file path manually in `data/character-images.js`.

Examples:

- If you upload `IMG_4938.jpeg` inside `assets/history/characters/fairuz/`, I will connect that exact file path to `fairuz`.
- If you upload `download (3).webp` inside `assets/history/characters/mohamed-abdel-wahab/`, I will connect that exact file path to `mohamed-abdel-wahab`.

Recommended names like `portrait.webp`, `stage-1.webp`, or `archive-1.webp` are cleaner, but they are **not required**.

After uploading images, tell me:

`connect the uploaded character images`

Then I will update:

`data/character-images.js`

Preferred mapping format:

```js
"character-slug": {
  main_image: "assets/history/characters/character-slug/original-file-name.jpg",
  main_image_caption: "...",
  extra_images: []
}
```

If a folder contains more than one image, I will usually use the clearest portrait-looking image as `main_image` and put the rest in `extra_images` when appropriate.
