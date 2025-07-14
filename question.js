const questions = [
    {
        question: "1. 다음 단어의 뜻을 구별해 주는 요소로 알맞지 않은 것은?",
        choices: [
            "① 곰, 솜 - 자음",
            "② 종, 공 - 자음",
            "③ 돌, 돈 - 모음",
            "④ 산, 선 - 모음",
            "⑤ 밥, 법 - 모음"
        ],
        answer: 3
    },
    {
        question: "2. 국어의 음운에 대한 설명으로 적절하지 않은 것은?",
        choices: [
            "① 음운의 종류에는 자음과 모음이 있다.",
            "② 말의 뜻을 구별해 주는 소리의 단위이다.",
            "③ 모음은 공기가 그대로 흘러나오는 소리이다.",
            "④ 자음은 모음 없이 홀로 소리 낼 수 있는 음운이다.",
            "⑤ 음운에 따라 소리 낼 때의 느낌이 달라질 수 있다."
        ],
        answer: 3
    },
    {
        question: "3. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는?",
        choices: [
            "① 음운",
            "② 음절",
            "③ 단어",
            "④ 문장",
            "⑤ 형태소"
        ],
        answer: 5
    },
    {
        question: "4. ‘돌’의 음운 중 하나를 골라 다른 음운으로 바꾼 단어가 아닌 것은?",
        choices: [
            "① 솔",
            "② 달",
            "③ 덕",
            "④ 돈",
            "⑤ 독"
        ],
        answer: 2
    },
    {
        question: "5. 음운에 대한 설명으로 알맞지 않은 것은?",
        choices: [
            "① 단어의 음운을 바꾸어 쓰면 의미가 달라진다.",
            "② 우리말의 음운은 자음과 모음으로 이루어진다.",
            "③ 자음은 공기가 방해를 받으며 나오는 소리이다.",
            "④ 말의 뜻을 구별해 주는 소리의 가장 작은 단위이다.",
            "⑤ 모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다."
        ],
        answer: 4
    }
];

let current = 0;
let selected = null;
let correctCount = 0;
let wrongCount = 0;
let wrongIndexes = []; // 틀린 문제 인덱스 저장
let retryMode = false; // 틀린 문제 다시 풀기 모드

function showResult(isCorrect) {
    let resultDiv = document.getElementById('result-message');
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'result-message';
        resultDiv.style.margin = '1rem 0';
        resultDiv.style.fontWeight = 'bold';
        resultDiv.style.fontSize = '1.2rem';
        document.getElementById('question-section').appendChild(resultDiv);
    }
    resultDiv.textContent = isCorrect ? '정답입니다! 🎉' : '오답입니다. 😢';
    resultDiv.style.color = isCorrect ? '#357ab8' : '#e74c3c';
}

function clearResult() {
    const resultDiv = document.getElementById('result-message');
    if (resultDiv) {
        resultDiv.remove();
    }
}

function renderQuestion() {
    const section = document.getElementById('question-section');
    section.innerHTML = '';
    clearResult();

    let q;
    if (retryMode) {
        q = questions[wrongIndexes[current]];
    } else {
        q = questions[current];
    }

    const qElem = document.createElement('h2');
    qElem.textContent = q.question;
    section.appendChild(qElem);

    q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice';
        btn.textContent = choice;
        btn.onclick = () => {
            document.querySelectorAll('.choice').forEach(el => el.classList.remove('selected'));
            btn.classList.add('selected');
            selected = idx;
        };
        section.appendChild(btn);
    });
}

document.getElementById('next-btn').onclick = () => {
    if (selected === null) {
        alert('정답을 선택하세요!');
        return;
    }

    let qIdx = retryMode ? wrongIndexes[current] : current;
    const isCorrect = selected === questions[qIdx].answer;
    showResult(isCorrect);

    if (!retryMode) {
        if (isCorrect) {
            correctCount++;
        } else {
            wrongCount++;
            wrongIndexes.push(current);
        }
    } else {
        // 다시 풀기 모드에서는 맞춘 문제는 wrongIndexes에서 제거
        if (isCorrect) {
            // 현재 문제 인덱스를 wrongIndexes에서 제거
            wrongIndexes.splice(current, 1);
            // current를 1 감소시켜 다음 문제로 이동 시 정상 동작
            current--;
            correctCount++;
            wrongCount--;
        }
    }

    setTimeout(() => {
        if (retryMode) {
            if (wrongIndexes.length === 0) {
                document.getElementById('question-section').innerHTML =
                    `<h2>틀린 문제를 모두 맞췄습니다!</h2>
                    <div style="margin-top:1.5rem;font-size:1.1rem;">
                        <strong>총 맞춘 문제 수:</strong> ${correctCount}개<br>
                        <strong>총 틀린 문제 수:</strong> ${wrongCount}개
                    </div>`;
                document.getElementById('next-btn').style.display = 'none';
                return;
            }
            if (current < wrongIndexes.length - 1) {
                current++;
                selected = null;
                renderQuestion();
            } else {
                // 틀린 문제 다시 풀기 종료 후, 계속 반복 여부 확인
                let askDiv = document.createElement('div');
                askDiv.style.marginTop = '1.5rem';
                askDiv.style.fontSize = '1.1rem';
                askDiv.innerHTML = `
                    <strong>틀린 문제 다시 풀기 완료!</strong><br>
                    <strong>총 맞춘 문제 수:</strong> ${correctCount}개<br>
                    <strong>총 틀린 문제 수:</strong> ${wrongCount}개<br><br>
                    <span>틀린 문제를 다시 한 번 더 풀겠습니까?</span>
                `;

                let yesBtn = document.createElement('button');
                yesBtn.textContent = '네, 다시 풀기';
                yesBtn.style.margin = '1rem 1rem 0 0';
                yesBtn.style.padding = '0.7rem 2rem';
                yesBtn.style.background = '#4a90e2';
                yesBtn.style.color = '#fff';
                yesBtn.style.border = 'none';
                yesBtn.style.borderRadius = '5px';
                yesBtn.style.fontSize = '1rem';
                yesBtn.style.cursor = 'pointer';

                let noBtn = document.createElement('button');
                noBtn.textContent = '아니오, 종료하기';
                noBtn.style.margin = '1rem 0 0 0';
                noBtn.style.padding = '0.7rem 2rem';
                noBtn.style.background = '#e74c3c';
                noBtn.style.color = '#fff';
                noBtn.style.border = 'none';
                noBtn.style.borderRadius = '5px';
                noBtn.style.fontSize = '1rem';
                noBtn.style.cursor = 'pointer';

                yesBtn.onclick = () => {
                    current = 0;
                    selected = null;
                    renderQuestion();
                    askDiv.remove();
                    document.getElementById('next-btn').style.display = '';
                };

                noBtn.onclick = () => {
                    document.getElementById('question-section').innerHTML =
                        `<h2>문제 풀이를 종료합니다.</h2>
                        <div style="margin-top:1.5rem;font-size:1.1rem;">
                            <strong>총 맞춘 문제 수:</strong> ${correctCount}개<br>
                            <strong>총 틀린 문제 수:</strong> ${wrongCount}개
                        </div>`;
                    document.getElementById('next-btn').style.display = 'none';
                };

                document.getElementById('question-section').innerHTML = '';
                document.getElementById('question-section').appendChild(askDiv);
                askDiv.appendChild(yesBtn);
                askDiv.appendChild(noBtn);
                document.getElementById('next-btn').style.display = 'none';
            }
        } else if (current < questions.length - 1) {
            current++;
            selected = null;
            renderQuestion();
        } else {
            let retryBtn = document.createElement('button');
            retryBtn.textContent = '틀린 문제 다시 풀기';
            retryBtn.id = 'retry-btn';
            retryBtn.style.marginTop = '1.5rem';
            retryBtn.style.padding = '0.7rem 2rem';
            retryBtn.style.background = '#e67e22';
            retryBtn.style.color = '#fff';
            retryBtn.style.border = 'none';
            retryBtn.style.borderRadius = '5px';
            retryBtn.style.fontSize = '1rem';
            retryBtn.style.cursor = 'pointer';

            retryBtn.onclick = () => {
                if (wrongIndexes.length === 0) {
                    alert('틀린 문제가 없습니다!');
                    return;
                }
                retryMode = true;
                current = 0;
                selected = null;
                document.getElementById('next-btn').style.display = '';
                renderQuestion();
                retryBtn.remove();
            };

            document.getElementById('question-section').innerHTML =
                `<h2>모든 문제를 풀었습니다!</h2>
                <div style="margin-top:1.5rem;font-size:1.1rem;">
                    <strong>맞춘 문제 수:</strong> ${correctCount}개<br>
                    <strong>틀린 문제 수:</strong> ${wrongCount}개
                </div>`;
            document.getElementById('question-section').appendChild(retryBtn);
            document.getElementById('next-btn').style.display = 'none';
        }
    }, 1200);
};

window.onload = renderQuestion;