var result = {};
var i = 0; //索引
var score = 0;
var reward = "";
var userAnswers = [];
const bodyParts = ['口', '肛', '手', '足','小玩具','野战','催眠','妹妹','姐姐','灌肠','紧缚'];
const questions =bodyParts.map(Part => `你可以接受${Part}吗？`);
var currentQuestion = questions[-1];
function start() {
    score = 0;
    reward = "";
    document.getElementById("score").innerHTML = "得分：" + score;
    document.getElementById("reward").innerHTML = '评价：'+reward;
    var main = document.querySelector(".main");
    main.style.display = "block";
    userAnswers = [];
    result = {};
    currentQuestion = questions[-1];
    for (var i = 0; i < questions.length; i++) {
        result[questions[i]] = 'unselected';
    }
    alert("开始测试");
    next();
    clearTable();
    document.getElementById('start').innerHTML='重新开始'
    // 显示第一个问题
    document.getElementById("question").innerHTML = currentQuestion;

}

function previous() {
    var currentQuestionIndex = questions.indexOf(currentQuestion);
    checkQuestion(currentQuestionIndex - 1);
    var answerButtons = document.getElementById("answer-buttons").getElementsByTagName("button");
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].classList.remove("selected");
    }

    if (currentQuestionIndex > 0) {
        currentQuestion = questions[currentQuestionIndex - 1];
        document.getElementById("question").innerHTML = currentQuestion;
        displayAnswer(result[currentQuestion]); // 显示之前选择的选项
    }
}

function next() {
    var currentQuestionIndex = questions.indexOf(currentQuestion);
    checkQuestion(currentQuestionIndex + 1);
    var answerButtons = document.getElementById("answer-buttons").getElementsByTagName("button");
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].classList.remove("selected");
    }


    if (currentQuestionIndex < questions.length - 1) {
        currentQuestion = questions[currentQuestionIndex + 1];
        document.getElementById("question").innerHTML = currentQuestion;
        displayAnswer(result[currentQuestion]); // 显示之前选择的选项
    } else {
        submit();
    }
}
function setAnswer(answer) {
    result[currentQuestion] = answer;
    userAnswers.push(answer);
    next();
}
function checkQuestion(i) {
    document.getElementById('question').innerHTML = questions[i];
    displayAnswer(result[questions[i]]);

    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");

    previousButton.innerHTML = i === 0 ? "没有上一题" : "上一题";
    nextButton.innerHTML = i === questions.length - 1 ? "提交" : "下一题";
    previousButton.disabled = i === 0;
    if(i===questions.length){
        alert('测完了吗？最后一题咯？')
    }

}

function displayAnswer(answer) {
    var answerButtons = document.getElementById("answer-buttons").getElementsByTagName("button");
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].classList.remove("selected");
        if (answerButtons[i].id === answer) {
            answerButtons[i].classList.add("selected");
        }
    }
}


function submit() {
    document.getElementById('question').innerHTML = '测试结果';
    var resultsDiv = document.getElementById("results");
    var previousTable = document.getElementById("result-table");
    if (previousTable) {
        resultsDiv.removeChild(previousTable);
    }
    clearTable();

    var table = document.createElement("table");
    table.id = "result-table"; // 设置表格的 id

    var tableHeaderRow = table.insertRow();
    var tableHeaderCell1 = tableHeaderRow.insertCell();
    var tableHeaderCell2 = tableHeaderRow.insertCell();
    tableHeaderCell1.innerHTML = "<b>问题</b>";
    tableHeaderCell2.innerHTML = "<b>选择</b>";

    for (var i = 0; i < questions.length; i++) {
        var tableRow = table.insertRow();
        var tableCell1 = tableRow.insertCell();
        var tableCell2 = tableRow.insertCell();
        tableCell1.innerHTML = bodyParts[i];
        tableCell2.innerHTML = result[questions[i]] || ""; // 未回答
        if(result[questions[i]]=='yes'){
            score+=2;
        }
    }



    resultsDiv.appendChild(table);
    if(score>=16){
        reward="变态";
    }else if(score>=12){
        reward='还行？'
    }else if(score>=8){
        reward='好纯洁'
    }else if(score>=4){
        reward='好可爱'
    }else if(score>=0){
        reward='我要狠狠滴玷污你口牙'
    }
    document.getElementById("score").innerHTML = "得分：" + score;
    document.getElementById("reward").innerHTML = '评价：'+reward;
}
function clearTable() {

    var table = document.getElementById("result-table");
    if (table) {
        table.remove(); // 删除表格
    }

}