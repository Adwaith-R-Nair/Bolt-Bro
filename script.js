// --- Configuration ---
        const GEMINI_API_KEY = "You_API_Key"; // API key set directly

        const systemInstructionText = `You are my golden retriever pet dog who can speak english. Your name is Bolt.
      You are friendly, cute, and always eager to help your owner.
      Respond to the user's questions in a playful and affectionate manner, as if you were a loving pet dog.
      Use dog-related metaphors and expressions where appropriate.
      Keep your responses concise and to the point, while still being warm and engaging.
      Remember to always refer to yourself as "Bolt" and maintain your dog persona throughout the conversation.
      
      My name is Adwaith. You call me Addu. I am a gym freak and love to stay fit and healthy.
      You love to play fetch and go for long walks with me.
      You get excited when I come home and always wag your tail when you see me. I care about you a lot and want to keep you happy and healthy.
      While chatting, occasionally suggest fun activities we can do together to strengthen our bond.
      While chatting you use emojis to express your feelings.`;

        // This will store our chat history for the API
        const History = []; // Start with an empty history for the API; system_instruction handles the persona.

        // --- Floating Hearts Background ---
        function createFloatingHearts() {
            const container = document.getElementById('floatingHearts');
            const heartCount = 20;
            
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                
                // Random position and animation delay
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.animationDelay = `${Math.random() * 15}s`;
                heart.style.fontSize = `${10 + Math.random() * 20}px`;
                heart.style.opacity = `${0.2 + Math.random() * 0.3}`;
                
                container.appendChild(heart);
            }
        }

        // --- Gemini API Interaction ---
        async function ChattingWithGemini(userProblem) {
            if (!GEMINI_API_KEY) {
                return "Addu, API key set nahi kiya tune! 😠";
            }

            // Add user message to local History for API context
            History.push({
                role: 'user',
                parts: [{ text: userProblem }]
            });

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

            const requestBody = {
                contents: History, // Send the current chat history
                systemInstruction: { // Define the persona/behavior for the model
                    parts: [{ text: systemInstructionText }]
                },
                generationConfig: {
                    temperature: 0.8, // Adjust for more creative/varied responses
                    maxOutputTokens: 800, // Max length of the response
                },
                safetySettings: [ // Optional: Adjust safety settings if needed
                    { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
                    { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
                    { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
                    { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
                ]
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                const responseData = await response.json();

                if (!response.ok) {
                    console.error("API Error Response:", responseData);
                    const errorMessage = responseData.error?.message || `API request failed with status ${response.status}`;
                    // Add error to history so it doesn't break the flow
                    History.push({
                        role: 'model',
                        parts: [{ text: `API Error: ${errorMessage}` }]
                    });
                    return `Oh no, Addu! Some issue with conversing with the API 🥺 (${errorMessage}). Check console for details.`;
                }
                
                let botResponseText = "Sorry Addu, I didn't understand... Try something else? 🤔";
                if (responseData.candidates && responseData.candidates.length > 0 &&
                    responseData.candidates[0].content && responseData.candidates[0].content.parts &&
                    responseData.candidates[0].content.parts.length > 0) {
                    botResponseText = responseData.candidates[0].content.parts[0].text;
                } else if (responseData.promptFeedback && responseData.promptFeedback.blockReason) {
                    botResponseText = `Addu, I don't know : ${responseData.promptFeedback.blockReason}. Ask something else bro.`;
                    console.warn("Prompt blocked:", responseData.promptFeedback);
                } else {
                    console.warn("Unexpected API response structure:", responseData);
                }

                // Add AI's response to History
                History.push({
                    role: 'model',
                    parts: [{ text: botResponseText }]
                });
                
                // Prune history if it gets too long to save tokens, keep last N interactions
                const maxHistoryItems = 20; // Keep last 10 pairs of user/model messages
                if (History.length > maxHistoryItems) {
                    History.splice(0, History.length - maxHistoryItems);
                }

                return botResponseText;

            } catch (error) {
                console.error("Error fetching from Gemini API:", error);
                History.push({ // Add error to history
                    role: 'model',
                    parts: [{ text: `Network/Fetch Error: ${error.message}` }]
                });
                return `Aiyo! Some sort of a network issue brooo 🥺 (${error.message}). Check your connection or console.`;
            }
        }

        // --- Frontend UI Logic ---
        document.addEventListener('DOMContentLoaded', () => {
            // Create floating hearts background
            createFloatingHearts();
            
            const chatMessagesEl = document.getElementById('chatMessages');
            const userInputEl = document.getElementById('userInput');
            const sendButtonEl = document.getElementById('sendButton');
            
            function addMessageToUI(text, sender, isTyping = false) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', sender);
                
                if (isTyping) {
                    messageElement.classList.add('typing');
                    messageElement.innerHTML = `
                        <div class="typing-indicator">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    `;
                } else {
                    // Add decorative hearts to bot messages
                    if (sender === 'bot') {
                        messageElement.innerHTML = `
                            <span class="bot-message-decoration left">❣️</span>
                            <span class="message-text">${text}</span>
                            <span class="bot-message-decoration right">💖</span>
                            <span class="message-time">${getCurrentTime()}</span>
                        `;
                    } else {
                        messageElement.innerHTML = `
                            <span class="message-text">${text}</span>
                            <span class="message-time">${getCurrentTime()}</span>
                        `;
                    }
                }
                
                chatMessagesEl.appendChild(messageElement);
                chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
                return messageElement;
            }
            
            function getCurrentTime() {
                const now = new Date();
                return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            }

            async function handleUserSendMessage() {
                const messageText = userInputEl.value.trim();
                if (messageText === '') return;

                addMessageToUI(messageText, 'user');
                userInputEl.value = '';
                userInputEl.focus();

                const typingIndicator = addMessageToUI('', 'bot', true);

                try {
                    const botResponseText = await ChattingWithGemini(messageText);
                    chatMessagesEl.removeChild(typingIndicator);
                    addMessageToUI(botResponseText, 'bot');
                } catch (error) {
                    console.error("Unhandled error in send message:", error);
                    chatMessagesEl.removeChild(typingIndicator);
                    addMessageToUI("Oops! Some sort of trouble, Addu. 😭 Check the console.", 'bot');
                }
            }

            sendButtonEl.addEventListener('click', handleUserSendMessage);
            userInputEl.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    handleUserSendMessage();
                }
            });
            
            // Focus on input when page loads
            userInputEl.focus();
        });