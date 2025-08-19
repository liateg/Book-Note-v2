
#  Book Note-v2

A **social platform for book lovers**, built with **Node.js, Express, Prisma ORM, and PostgreSQL**.  

Users can:  
- Add books they’ve read (manually or via external API)  
- Write **private notes** or **public reviews**  
- Rate books, like and comment on public posts  
- Discover **trending books** based on engagement  
- Generate **AI-powered summaries & labels** for books  
- Tag books with **genres and moods**  
- Create **groups** around shared reading interests  
- (Optional) Host **contests** like reading challenges  

---

##  Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL with Prisma ORM  
- **Frontend**: EJS templates + CSS (static, lightweight)  
- **AI Integration**: OpenAI API (summaries, mood/genre labels)  
- **Search**: PostgreSQL Full-Text Search (fuzzy matching)  
- **Auth**: JWT-based authentication  

---

##  Project Structure

```

booknote/
├─ prisma/             # Prisma schema + migrations
├─ src/
│  ├─ config/         # Database + app config
│  ├─ routes/         # Express routes
│  ├─ controllers/    # Request handlers
│  ├─ services/       # Business logic (AI, book API, search, etc.)
│  ├─ middlewares/    # Authentication, validation
│  ├─ utils/          # Helpers (logger, error handler)
│  └─ models/         # Prisma model wrappers (optional)
├─ public/             # Static assets
├─ README.md           # Project documentation
├─ package.json
└─ .env

````

---

##  Setup Instructions

1. **Clone repo**  
```bash
git clone https://github.com/your-username/booknote.git
cd booknote
````

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
OPENAI_API_KEY="your_api_key_here"
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

## 🔮 Roadmap

* [ ] User auth & profile system
* [ ] Add/Review/Rate books
* [ ] AI-powered summaries + labels
* [ ] Like/comment on reviews
* [ ] Trending books feed
* [ ] Groups & contests

---

##  Learning Journal

This project is part of my **Backend Mastery Plan**.

| Week | Focus                              | Key Learnings & Tasks                                                                                                                                               |
| ---- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Project Setup & Core Features      | Designed ERD & Prisma schema. Setup Express + Prisma + PostgreSQL. Implemented user auth & book posting system. Learned to structure folders for maintainable code. |
| 2    | Reviews, Notes, and AI Integration | Added AI summaries & labels for books. Built private/public notes functionality. Learned API integration & async data handling.                                     |
| 3    | Social Features                    | Implemented likes & comments. Built trending book feed. Learned relational queries in Prisma.                                                                       |
| 4    | Groups & Contests                  | Created groups (book clubs) and contest structures. Learned advanced Prisma relations & joins.                                                                      |
| 5    | Search & Optimization              | Added full-text fuzzy search for books and posts. Learned query optimization and indexing in PostgreSQL.                                                            |
| 6    | Polishing & Deployment             | Improved EJS frontend & user experience. Learned environment management, deployment, and logging. Finalized README & documentation for portfolio.                   |

---

##  Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss.

---

##  License

MIT License © 2025 Your Name

```

