# 🏢 HR Management Backend

A **RESTful HR Management API** built with **Node.js**, **TypeScript**, **Express**, and **PostgreSQL**.  
HR users can authenticate, manage employees, record attendance, and generate monthly reports.  

[🚀 Live Demo](https://hrmanagementbacked-production.up.railway.app/) | [💻 GitHub Repository](https://github.com/JobaerSiddique/hr_management_backed)

---

## ✨ Features

- 🔑 HR user authentication (JWT)
- 👥 Employee CRUD operations with **photo upload**
- 🗓 Daily attendance tracking
- 📊 Monthly attendance reports (late arrivals counted after 09:45 AM)
- ✅ Input validation with Joi
- 💾 File upload support via Multer
- 🔍 Search & pagination for employees and attendance
- ⚡ TypeScript with **strict typing** for all endpoints
- 🔄 Knex migrations & seeds

---

## 🛠 Tech Stack

- **Node.js** + **TypeScript**
- **Express.js**  
- **PostgreSQL**
- **Knex.js** (Query builder & migrations)
- **Multer** (File uploads)
- **Joi** (Input validation)
- **JWT** (Authentication)
- **ESLint & Prettier** (Code quality & formatting)

---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/JobaerSiddique/hr_management_backed.git
cd hr_management_backed

pnpm install

Copy .env.example to .env

pnpm run migrate:latest
pnpm run seed:run


for development run use this command
pnpm run dev