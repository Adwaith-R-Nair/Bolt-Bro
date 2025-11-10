# 🐶 Bolt Bro

> Your loyal AI golden retriever who loves to chat, play, and make your day brighter! 💛

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Adwaith-R-Nair/Bolt-Bro)

---

## 🐾 Overview

**Bolt Bro** is an AI-powered chatbot inspired by a golden retriever named **Bolt** — your playful, loyal, and ever-curious best friend.  
Built using the **Google Gemini API**, this bot brings warmth and personality to your conversations by embodying Bolt’s friendly canine persona.

He wags his tail when you say hi, calls you *Addu*, and occasionally suggests fun activities — like going for a walk or playing fetch! 🦴  
This isn’t just a chatbot — it’s your *virtual pet* that talks back with love, loyalty, and a touch of puppy charm.

---

## ✨ Features

- **🐕 Dog Persona:** Bolt behaves just like your golden retriever — affectionate, loyal, and playful.  
- **💬 Natural Conversations:** Powered by Google Gemini API for smooth, context-aware interactions.  
- **❤️ Personalized Touch:** Remembers you as *Addu* and reflects your gym-loving personality in chats.  
- **🌙 Modern Dark UI:** Clean and responsive chat interface for a cozy conversation vibe.  
- **⚡ Instant Replies:** Real-time interaction with Bolt directly from your browser.  

---

## 🧠 Personality Prompt

Bolt’s personality and behavior are defined by a **custom system prompt**, ensuring that every message feels true to his friendly dog nature:

> “You are my golden retriever pet dog who can speak English.  
> Your name is Bolt. You are friendly, cute, and always eager to help your owner.  
> You call me Addu, love playing fetch, wag your tail when happy, and use emojis to express feelings.” 🐾

---

## 🧩 Technology Stack

| Category | Technologies Used |
|-----------|-------------------|
| **Frontend** | HTML, CSS, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **AI Integration** | Google Gemini API (`gemini-2.5-flash` model) |
| **Dependencies** | `express`, `node-fetch`, `dotenv` |

---

## ⚙️ How It Works

1. **User Input:** You send a message to Bolt via the chat interface in `index.html`.  
2. **Frontend Request:** `script.js` captures your message and sends it as a `POST` request to the `/ask` endpoint.  
3. **Backend Processing:** The Express server (`server.js`) forwards your query along with Bolt’s predefined persona prompt to the Gemini API.  
4. **AI Response:** The Gemini API generates a friendly, dog-like response — sometimes emotional, sometimes playful, but always *Bolt*. 🐕  
5. **Display:** The frontend formats and displays the response in an engaging chat layout.  

---

## 🧰 Getting Started

To run **Bolt Bro** locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Adwaith-R-Nair/Bolt-Bro.git
cd Bolt-Bro
```

### 2.  **Install dependencies:**
  ```bash
    npm install
  ```

### 3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google Gemini API key. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
  ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
  ```

### 4.  **Start the server:**
  ```bash
    node server.js
  ```

### 5.  **Open the application:**
    Navigate to `http://localhost:3000` in your web browser.

## File Structure

-   `index.html`: The HTML file for the main user interface.
-   `styles.css`: Contains all the CSS for the application's UI design and layout.
-   `script.js`: Handles all client-side logic, including capturing user input, making API calls to the backend, and rendering the AI's response.
-   `package.json`: Defines project metadata and lists the Node.js dependencies.
-   `GR.js`: Test script for Bolt’s persona prompt.
