const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');
const sendButton = document.getElementById('send-button');

// Remove welcome message on first interaction
let isFirstMessage = true;

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Remove welcome message on first user message
  if (isFirstMessage) {
    const welcomeMessage = chatMessages.querySelector('.welcome-message');
    if (welcomeMessage) {
      welcomeMessage.remove();
    }
    isFirstMessage = false;
  }

  appendMessage('user', userMessage);
  input.value = '';
  
  // Disable form while processing
  sendButton.disabled = true;
  input.disabled = true;

  // Show typing indicator
  const typingIndicator = showTypingIndicator();
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    
    // Remove typing indicator
    hideTypingIndicator(typingIndicator);
    
    if (response.ok) {
      appendMessage('bot', data.response || data.text);
    } else {
      appendMessage('bot', 'Sorry, I encountered an error: ' + data.error);
    }
  } catch (error) {
    // Remove typing indicator
    hideTypingIndicator(typingIndicator);
    appendMessage('bot', 'Sorry, I could not connect to the server.');
    console.error('Error:', error);
  } finally {
    // Re-enable form
    sendButton.disabled = false;
    input.disabled = false;
    input.focus();
  }
});

function appendMessage(sender, text) {
  const messageWrapper = document.createElement('div');
  messageWrapper.classList.add('message-wrapper', sender);

  if (sender === 'bot') {
    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar', 'bot');
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    messageWrapper.appendChild(avatar);
  }

  const messageContent = document.createElement('div');
  messageContent.classList.add('message', sender);
  
  const messageText = document.createElement('div');
  messageText.textContent = text;
  messageContent.appendChild(messageText);

  const messageTime = document.createElement('div');
  messageTime.classList.add('message-time');
  messageTime.textContent = getCurrentTime();
  messageContent.appendChild(messageTime);

  messageWrapper.appendChild(messageContent);
  chatMessages.appendChild(messageWrapper);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  return messageWrapper;
}

function showTypingIndicator() {
  const messageWrapper = document.createElement('div');
  messageWrapper.classList.add('message-wrapper', 'bot');

  const avatar = document.createElement('div');
  avatar.classList.add('message-avatar', 'bot');
  avatar.innerHTML = '<i class="fas fa-robot"></i>';
  messageWrapper.appendChild(avatar);

  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('typing-indicator');
  
  const typingText = document.createElement('span');
  typingText.textContent = 'Gemini is typing';
  
  const typingDots = document.createElement('div');
  typingDots.classList.add('typing-dots');
  
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.classList.add('typing-dot');
    typingDots.appendChild(dot);
  }
  
  typingIndicator.appendChild(typingText);
  typingIndicator.appendChild(typingDots);
  messageWrapper.appendChild(typingIndicator);
  
  chatMessages.appendChild(messageWrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  return messageWrapper;
}

function hideTypingIndicator(indicator) {
  if (indicator && indicator.parentNode) {
    indicator.parentNode.removeChild(indicator);
  }
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Auto-focus input on page load and load API info
window.addEventListener('load', async () => {
  input.focus();
  await loadApiInfo();
});

// Load API information
async function loadApiInfo() {
  try {
    const response = await fetch('/api/info');
    const data = await response.json();
    
    document.getElementById('model-name').textContent = data.model;
    document.getElementById('api-key-display').textContent = data.apiKey;
  } catch (error) {
    console.error('Failed to load API info:', error);
  }
}

// Handle Enter key
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
});
