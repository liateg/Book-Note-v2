
# Book Note-v2

A **social platform for book lovers**, built with **Node.js, Express, Prisma ORM, and PostgreSQL**.

Users can:

* Add books they’ve read (via OpenLibrary API)
* Write **public reviews** or **private notes**
* Rate books
* Generate **AI-powered summaries & labels** for books
* Tag books with authors

---

## Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL with Prisma ORM
* **AI Integration**: OpenAI API for automatic summaries and labels

---

## Project Structure

```bash
booknote/
├─ prisma/             # Prisma schema + migrations
├─ src/
│  ├─ controllers/    # Request handlers (users, posts, AI)
│  ├─ routes/         # Express API routes
│  
├─ node_modules/
├─ .env
├─ package.json
├─ package-lock.json
└─ README.md
```

---

## Features Implemented

### Users

* Create, update, delete, and list users

### Books & Authors

* Fetch book info automatically from OpenLibrary API
* Store book details in database
* Store multiple authors per book

### Posts & Notes

* Users can create posts (reviews) with rating and visibility (public/private)
* Users can create multiple private notes linked to books

### AI Features

* Automatic generation of **book review summaries** using OpenAI
* Automatic **book labels** (AI classification)
* AI content saved in database linked to post and book

---

## Setup Instructions

1. **Clone repo**

```bash
git clone https://github.com/your-username/booknote.git
cd booknote
```

2. **Install dependencies**

```bash
npm install
```

3. **Initialize Prisma**

```bash
npx prisma init
```

4. **Configure `.env`**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/booknote"
OPENAI_API_KEY="your_openai_api_key_here"
```

5. **Run migrations**

```bash
npx prisma migrate dev --name init
```

6. **Start server**

```bash
npm run dev
```

---

## API Endpoints

### Users

* `POST /users` – create a user
* `GET /users` – list users
* `GET /users/:id` – get user by ID
* `PUT /users/:id` – update user
* `DELETE /users/:id` – delete user

### Posts

* `POST /posts` – create a post (auto AI summary & label)
* `GET /posts` – list posts
* `GET /posts/:id` – get post by ID
* `PUT /posts/:id` – update post
* `DELETE /posts/:id` – delete post

### Notes

* `POST /notes` – add note for a book
* `GET /notes/:id` – get note by ID
* `PUT /notes/:id` – update note
* `DELETE /notes/:id` – delete note

### Books & Authors

* `GET /books` – list books
* `GET /books/:id` – get book details
* `GET /authors` – list authors

---

## Next Steps (Roadmap)


* Enhance feed with **trending books** based on engagement
* Add **search** with fuzzy matching
* Optional: host reading **contests/challenges**

---

## Contribution

Pull requests are welcome. For major changes, open an issue to discuss first.

---

## License

MIT License © 2025 Your Name

---

