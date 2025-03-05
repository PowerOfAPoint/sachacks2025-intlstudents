# 🐦 Flock: Personalized Visa & Career Navigator  

## 🔥 Inspiration  
As international students ourselves, we’ve lived through the confusion, stress, and uncertainty that comes with navigating the U.S. visa system. From understanding **Day 1 CPT risks**, to figuring out **OPT start dates**, to keeping up with constantly shifting **H-1B policies** — we’ve asked ourselves **“Now what?”** more times than we can count.  

The more we researched, the clearer it became: this isn’t just our story. It’s the story of **thousands of international students** facing the same struggles every year.  

In the **2024 academic year**, over **1.1 million international students** were studying in the U.S., a **7% increase** from the year before (SEVIS Data, 2024). Yet, fewer than **25% of international student graduates** successfully secure H-1B visas after graduation (Migration Policy Institute, 2023). The reasons?  

🔻 **Confusing visa rules**  
🔻 **Missed deadlines**  
🔻 **Conflicting advice from unreliable sources**  

The consequences of these gaps are serious — missed opportunities, financial stress, and even legal trouble.  

We created **Flock** because we believe **international students deserve better**. Our vision is to build a **clear, reliable, and supportive guide** for the entire visa and career journey — so students can focus on their **dream careers**, not bureaucratic headaches.

---

## 💡 What it does  
**Flock** is an **all-in-one platform** designed to simplify the visa and career journey for international students and early-career professionals. It combines:  

✅ **Personalized Visa Roadmaps**  
Step-by-step guidance tailored to each user’s visa status, graduation date, and major — covering Day 1 CPT, OPT, STEM OPT, Cap-Gap, and H-1B.  

✅ **AI-Powered Chatbot**  
A smart assistant that delivers **fact-checked, official answers** sourced directly from **USCIS, DOL, ICE, and SEVP** — no hallucinations, just verified truth.  

✅ **Community Forum**  
A space for students to ask questions, share experiences, and get **expert-verified answers** from immigration lawyers and senior F-1 visa holders.  

---

## 🛠️ How we built it  
- 🎨 **Figma**: UI/UX design  
- ⚙️ **LangChain + LangGraph**: RAG chatbot logic  
- 🤖 **OpenAI**: LLM integration  
- 💻 **Next.js**: Frontend development  
- 🔑 **Better Auth**: Authentication for the forum  
- 🗃️ **PostgreSQL**: Forum data storage  
- 🐳 **Docker**: Local environment setup  
- 🚂 **Railway**: Backend hosting (database & chatbot API)  
- ▲ **Vercel**: Frontend hosting  

---

## 🚧 Challenges we ran into  
🔗 Connecting the Python backend for the chatbot to the Next.js frontend was tricky — aligning the API structure, handling cross-origin requests, and ensuring data flow was smooth.  

---

## 🎉 Accomplishments we’re proud of  
✨ Clean and intuitive **site design**  
✨ Fully functional **RAG-powered chatbot** that **cites official sources**  
✨ Creating something that directly supports the **international student community** — a resource we **wish we had** when we started our journeys.  

---

## 📚 What we learned  
🔗 How to write and expose a **Python API** for use in a **Next.js** frontend.  
⚡️ How to implement **caching** for faster chatbot responses.  
🔎 The importance of **fact-checking AI outputs** in sensitive, legal contexts.  

---

## 🚀 What’s next for Flock  
✅ Connect the backend RAG chatbot to the live frontend (in progress)  
✅ Add **voting & reputation system** for the community forum  
✅ Expand chatbot functionality to support **document uploads** and **chat history saving**  
✅ Add **Google Calendar integration** for visa deadline reminders  

---

## 🔗 Built With  
| Tech | Purpose |
|---|---|
| Next.js | Frontend |
| Tailwind CSS | Styling |
| Node.js + Express | Backend |
| PostgreSQL | Database |
| LangChain + OpenAI | Chatbot logic |
| Pinecone | Vector storage (for RAG) |
| Firebase | Authentication |
| Docker | Local dev |
| Railway + Vercel | Hosting |
