const questions = [
    {
        question: "1. 단어에 사용된 음운의 개수가 잘못 연결된 것은?",
        choices: [
            "① 누나 - 4개",
            "② 까꿍 - 6개",
            "③ 동생 - 6개",
            "④ 외삼촌 - 7개",
            "⑤ 할머니 - 7개"
        ],
        answer: 1 // 정답 인덱스(0부터 시작)
    },
    {
        question: "2. 다음 중 국어의 자음에 대한 설명으로 적절하지 않은 것은?",
        choices: [
            "① 자음의 개수는 모두 19개이다.",
            "② 모음을 만나야 소리 낼 수 있다.",
            "③ 공기가 방해를 받으며 나오는 소리이다.",
            "④ 입안의 공명 현상을 거쳐서 나온다는 특징이 있다.",
            "⑤ 말의 뜻을 구별해 주는 소리의 가장 작은 단위에 속한다."
        ],
        answer: 3
    }
];

let current = 0;
let selected = null;

function renderQuestion() {
    const section = document.getElementById('question-section');
    section.innerHTML = '';
    const q = questions[current];

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
    if (current < questions.length - 1) {
        current++;
        selected = null;
        renderQuestion();
    } else {
        document.getElementById('question-section').innerHTML = '<h2>모든 문제를 풀었습니다!</h2>';
        document.getElementById('next-btn').style.display = 'none';
    }
};

window.onload = renderQuestion;