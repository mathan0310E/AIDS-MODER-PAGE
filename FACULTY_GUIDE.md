# How to add / update faculty profiles & photos

All faculty content lives in **`src/data/content.ts`** in the `faculty` array.
The site is CMS-ready: you edit plain data, rebuild, and redeploy — no database
required.

## 1. Add a faculty photo

Drop the photo into `public/faculty/` using a lowercase, no-spaces filename, for
example:

```
public/faculty/dr-jane-doe.jpg
```

Recommended: square image, at least 400×400 px, under ~200 KB. The card crops it
to a circle automatically.

## 2. Add / edit the faculty entry

Open `src/data/content.ts`, find the `faculty` array, and update a placeholder
(or add a new object). Each entry looks like this:

```ts
{
  id: "faculty-1",                       // unique id
  name: "Dr. Jane Doe",                  // full name
  designation: "Professor",               // Professor | Associate Professor | Assistant Professor
  qualification: "Ph.D. (AI), Anna University",
  specialization: ["Machine Learning", "Computer Vision"],
  email: "jane.doe@skpec.edu.in",
  linkedin: "https://www.linkedin.com/in/jane-doe",  // optional
  publications: "12 international journals",          // optional
  photo: "/faculty/dr-jane-doe.jpg",     // path under public/
  isPlaceholder: false,                   // set to false once verified
},
```

The `photo` path is relative to the `public/` folder, so a file at
`public/faculty/dr-jane-doe.jpg` is referenced as `"/faculty/dr-jane-doe.jpg"`.

## 3. Build & deploy

```bash
npm run build   # verify it compiles
```

Then commit and push. If you deploy on Vercel, the production build runs
automatically on push.

## Removing the placeholders

Once real profiles are added, delete the `faculty-placeholder-*` entries (or set
their `isPlaceholder: true`) from the `faculty` array. The faculty page banner
explains that profiles are editable until verified, so leaving placeholders is
safe while you migrate.

## Where it shows up

The `FacultyCard` component renders each entry's photo, name, designation,
qualification, specializations, email, LinkedIn and publications on the
`/faculty` page, with live search and filter.
