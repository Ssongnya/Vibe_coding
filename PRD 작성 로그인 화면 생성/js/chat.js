document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.querySelector('.chat-window');

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (!message) return;

        addMessageToWindow(message, 'user');
        messageInput.value = '';
        
        // 로딩 인디케이터 표시
        const loadingIndicator = addMessageToWindow('...', 'bot', true);

        try {
            // OpenAI API 연동 (현재는 Mock 구현)
            const response = await getOpenAiResponse(message);
            loadingIndicator.remove(); // 로딩 인디케이터 제거
            addMessageToWindow(response, 'bot');
        } catch (error) {
            loadingIndicator.remove(); // 로딩 인디케이터 제거
            addMessageToWindow('죄송합니다. 오류가 발생했습니다.', 'bot');
            console.error(error);
        }
    });

    function addMessageToWindow(message, sender, isLoading = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`, 'mb-2');
        
        const paragraph = document.createElement('p');
        paragraph.classList.add('mb-0');
        paragraph.textContent = message;
        messageElement.appendChild(paragraph);

        if (isLoading) {
            messageElement.classList.add('loading');
        }

        // 새 메시지를 맨 위에 추가
        chatWindow.insertBefore(messageElement, chatWindow.firstChild);
        
        // 스크롤을 맨 아래로 (새 메시지가 보이도록)
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        return messageElement;
    }

    async function getOpenAiResponse(prompt) {
        // PRD 요구사항: API Key가 없는 경우 고정된 답변 출력
        // 실제 API Key는 서버 환경 변수 등을 통해 안전하게 관리해야 합니다.
        const apiKey = ''; // 여기에 실제 OpenAI API 키를 입력하세요.

        if (!apiKey) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve('API Key가 없습니다.');
                }, 1000); // 1초 딜레이
            });
        }

        // 아래는 실제 OpenAI API를 사용하는 코드 예시입니다.
        // 현재는 실행되지 않습니다.
        /*
        const client = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
        const response = await client.completions.create({
            model: "gpt-5-nano", // PRD에서 명시된 모델명은 실제와 다를 수 있습니다.
            prompt: prompt,
            max_tokens: 150,
        });
        return response.choices[0].text.trim();
        */
    }
});