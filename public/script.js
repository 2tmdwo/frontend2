document.addEventListener('DOMContentLoaded', function() {  // DOM이 완전히 로드된 후에 스크립트를 실행합니다.
    const textForm = document.getElementById('textForm');  // 폼 요소를 가져옵니다.
    const userInputElement = document.getElementById('userInput');  // 텍스트 입력 요소를 가져옵니다.
    const rewrittenTextElement = document.getElementById('rewrittenText');  // 리라이팅된 텍스트를 표시할 요소를 가져옵니다.

    textForm.addEventListener('submit', async function(event) {  // 폼 제출 이벤트에 대한 핸들러를 정의합니다.
        event.preventDefault();  // 폼의 기본 제출 동작을 방지합니다.

        const userInput = userInputElement.value;  // 사용자가 입력한 텍스트를 가져옵니다.
        rewrittenTextElement.innerText = '';  // 리라이팅된 텍스트 표시 영역을 초기화합니다.

        try {
            const response = await fetch('https://port-0-backend2-ly9ig2ti56e078b0.sel5.cloudtype.app/rewrite', {  // 백엔드 API로 POST 요청을 보냅니다.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // 요청 본문이 JSON 형식임을 명시합니다.
                },
                body: JSON.stringify({ text: userInput })  // 사용자 입력을 JSON 형식으로 변환하여 보냅니다.
            });

            if (!response.ok) {  // 응답이 성공적이지 않다면 오류를 발생시킵니다.
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();  // JSON 형식의 응답 데이터를 파싱합니다.
            rewrittenTextElement.innerText = result.rewrittenText.trim();  // 리라이팅된 텍스트를 표시합니다.
        } catch (error) {
            console.error('Error:', error);  // 오류 발생 시 콘솔에 로그를 출력합니다.
            rewrittenTextElement.innerText = '요청 처리 중 오류';  // 오류 메시지를 표시합니다.
        }
    });  // 여기가 닫히지 않으면 오류 발생
});  // 여기가 닫히지 않으면 오류 발생
