const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  const submitButton = form.querySelector('button[type="submit"]');
  
  appendMessage('user', userMessage);
  input.value = '';
  
  // Disable form while processing
  submitButton.disabled = true;
  input.disabled = true;

  // Show typing indicator
  const typingMsg = appendMessage('bot', 'Gemini is thinking...');
  
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
    chatBox.removeChild(typingMsg);
    
    if (response.ok) {
      appendMessage('bot', data.response || data.text);
    } else {
      appendMessage('bot', 'Sorry, I encountered an error: ' + data.error);
    }
  } catch (error) {
    // Remove typing indicator
    chatBox.removeChild(typingMsg);
    appendMessage('bot', 'Sorry, I could not connect to the server.');
    console.error('Error:', error);
  } finally {
    // Re-enable form
    submitButton.disabled = false;
    input.disabled = false;
    input.focus();
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}
