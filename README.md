

# 🧠 SubTrack App  
[![CI/CD Build Status](https://github.com/JessyMaurelle/SubTrack-App/actions/workflows/deploy.yml/badge.svg)](https://github.com/JessyMaurelle/SubTrack-App/actions/workflows/deploy.yml)  
![Angular](https://img.shields.io/badge/Angular-18-red?logo=angular)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)
![Playwright](https://img.shields.io/badge/Tested_with-Playwright-green?logo=playwright)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🌍 Live Demo
🖥️ [**Visit the live app on Vercel**](https://subtrack-app.vercel.app)

---

## 📖 Overview

**SubTrack App** is a modern **Angular web application** designed to help users **track and manage their subscriptions** (e.g., Netflix, Spotify, etc.) easily and efficiently.  
It provides clear insights into your subscriptions — categories, renewal dates, payment cycles, and more.

This project includes a **complete CI/CD pipeline**:
- ✅ **End-to-End testing** with **Playwright**
- 🧱 **Automated Angular build**
- 🚀 **Continuous deployment** on **Vercel**
- 🔍 **Automatic deployment verification (HTTP 200)**

---

## 🧩 Main Features

- 📅 Manage subscriptions: add, edit, and delete  
- 💶 Automatic total calculation (monthly & yearly)  
- 🔔 Highlight upcoming renewals and price increases  
- 🔎 Filter and search subscriptions by name, category, and status  
- 📈 Interactive table with sorting and pagination  
- ⚙️ Settings page for language and currency selection  
- 🧠 Built using **Angular Signals** for reactive state management  
- 🧪 End-to-end testing powered by **Playwright**

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | Angular 18 |
| UI Library | Angular Material |
| Language | TypeScript |
| State Management | Angular Signals |
| Mock Backend | JSON Server |
| E2E Tests | Playwright |
| CI/CD | GitHub Actions + Vercel |
| Hosting | Vercel |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the project
```bash
git clone https://github.com/JessyMaurelle/SubTrack-App.git
cd SubTrack-App
2️⃣ Install dependencies
bash
Code kopieren
npm install
3️⃣ Start the mock backend
bash
Code kopieren
npm run api
Default server runs on http://localhost:3001

4️⃣ Run the Angular app
bash
Code kopieren
ng serve
Open http://localhost:4200

🧪 End-to-End Testing (Playwright)
## 🧪 QA Testing Approach

This project includes end-to-end testing using Playwright to ensure application reliability and stability.

### Testing Strategy

- Each test is independent and creates its own test data  
- Core user flows are covered: Create, Edit, Delete, Filter  
- Regression tests are executed to ensure existing features continue to work after changes  

### What is tested

- Form interactions (inputs, validation, submission)  
- Dynamic UI components (tables, dropdowns, Angular Material)  
- User interactions and data updates  
- Visibility and correctness of displayed data  

### Test Structure

- Tests are written using Playwright Test Runner  
- Stable selectors are used (`getByRole`, `locator`)  
- Assertions ensure expected UI behavior (`expect`)  

### Goal

The goal is to simulate real user behavior and ensure that critical features remain functional across updates.
Run tests
bash
Code kopieren
npx playwright test --ui
Generate an HTML report
bash
Code kopieren
npx playwright show-report
Test coverage includes:

Page rendering and navigation

Adding, editing, and deleting subscriptions

Table loading and data visibility

Pagination and filtering

⚡ Continuous Integration / Continuous Deployment (CI/CD)
Trigger
Each push to the main branch will automatically:

Install dependencies

Run Playwright tests

Build the Angular project

Deploy the app on Vercel

Verify that the app is online (HTTP 200 check)

Example GitHub Actions workflow:
(see .github/workflows/deploy.yml)

yaml
Code kopieren
- name: Verify deployment (HTTP 200)
  run: |
    DEPLOY_URL="https://subtrack-app.vercel.app"
    STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" $DEPLOY_URL)
    if [ $STATUS_CODE -eq 200 ]; then
      echo "✅ Deployment successful ($STATUS_CODE)"
    else
      echo "❌ Deployment failed ($STATUS_CODE)"
      exit 1
    fi

🧱 Best Practices
Uses Signals instead of BehaviorSubject or NgRx

Clean, reusable, and well-documented components


🔐 Environment Variables
To enable automated deployment, create a GitHub secret:

Key	Description
VERCEL_TOKEN	Your personal Vercel token (from Vercel → Account Settings → Tokens)

🧑‍💻 Author
👤 Jessy Maurelle
💼 Frontend Developer (Angular)
🌐 GitHub Profile

🪪 License
This project is licensed under the MIT License — free to use, modify, and distribute.

✨ Built with love using Angular, Material, and Playwright ❤️

yaml
Code kopieren

---

### ✅ Highlights of this English version:
- Native and recruiter-friendly phrasing  
- Clear structure (Overview → Setup → Tests → CI/CD → Author)  
- Perfect for showcasing on **GitHub**, **LinkedIn**, or in a **portfolio**  
- Keeps a professional tone without jargon overload  






