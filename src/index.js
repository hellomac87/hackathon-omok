// gameState : 게임과 관련된 상태를 저장하는 객체
const gameState = {
  player : true,
  board : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
}

const setGame = () => {
  // 게임의 초기상태를 만드는 함수

  // 1) 상태 업데이트
  // 기본 player 를 'green'로 설정한다.
  gameState.player = true; 
  // 기본 board array의 요소를 모두 0 으로 만든다.
  gameState.board.map((row, rowIndex) => {
    row.map((colEl, colIndex) => {
      gameState.board[rowIndex][colIndex] = 0;
    });
  });

  // winner 엘리먼트의 클래스를 모두 삭제한다.
  document.getElementById('winner').classList.remove('green');
  document.getElementById('winner').classList.remove('purple');
  
  // 2) 화면 그리기
  drawGame();
}

const drawGame = () => {
  // 1) player 상태를 html 에 그려준다.
  document.getElementById('currentPlayer').textContent = gameState.player ? 'green' : 'purple';

  // 2) gameState.board 의 상태를 board element 에 그려준다.
  document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
    rowEl.querySelectorAll('.cell').forEach((colEl, colIndex) => {
      if (gameState.board[rowIndex][colIndex] === 1){
        colEl.classList.add('green');
      } else if (gameState.board[rowIndex][colIndex] === 2){
        colEl.classList.add('purple');
      } else if(gameState.board[rowIndex][colIndex] === 0){
        colEl.classList.remove('purple');
        colEl.classList.remove('green');
      }
    });
  });

  // 승리자 체크 함수 : 상태를 모두 업데이트 한 뒤 확인해야 한다.
  if (isWinner(gameState.board) === 1) {
    document.querySelector('.modal').style.display = 'flex';
    document.getElementById('winner').textContent = 'green';
    document.getElementById('winner').classList.add('green');
  }
  if (isWinner(gameState.board) === 2) {
    document.querySelector('.modal').style.display = 'flex';
    document.getElementById('winner').textContent = 'purple';
    document.getElementById('winner').classList.add('purple');
  }

  console.log('draw');
}


// grid click event handler: gameState.board 의 상태를 업데이트 하는 이벤트 핸들러
document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
  rowEl.querySelectorAll('.cell').forEach((colEl, colIndex) => {
    colEl.addEventListener('click', (e) => { // click eventhandler 를 추가한다.
      console.log('html element click event')
      // 해당 엘리먼트가 green or purple 클래스를 가지고 있다면 상태를 변경하지 않고 return 한다.
      if (colEl.classList.contains('green') || colEl.classList.contains('purple')) {
        return;
      }

      // 현재 player 의 상태에 따라 board의 해당 인덱스 요소를 1 or 2 로 변경해주는 조건문
      if (gameState.player) {
        gameState.board[rowIndex][colIndex] = 1;
      } else {
        gameState.board[rowIndex][colIndex] = 2;
      }

      // board 상태를 업데이트 한뒤, player 를 토글한다.
      gameState.player = !gameState.player;

      // TODO : 상태 확인용 console.log 개발 후 지우기
      console.log('player: ', gameState.player);
      console.log('board :', gameState.board);

      // 변경한 상태를 화면에 그린다.
      drawGame();
    });
  });
});

// modal reset btn click event handler : modal 창의 reset 버튼 클릭시
document.getElementById('btnReset').addEventListener('click', (e) => {
  document.querySelector('.modal').style.display = 'none';
  setGame();
});


const isWinner = (board) => {
  console.log('who is winner?');
  
  // 가로
  for (let i = 0; i < board.length; i++) {
    let currentPlayer;
    let count;
    for (let j = 0; j < board.length; j++) {
      if (currentPlayer !== board[i][j]) {
        currentPlayer = board[i][j];
        count = 1;
      } else {
        count++;
      }
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }

  // 세로
  for (let i = 0; i < board.length; i++) {
    let currentPlayer;
    let count;
    for (let j = 0; j < board.length; j++) {
      if (currentPlayer !== board[j][i]) {
        currentPlayer = board[j][i];
        count = 1;
      } else {
        count++;
      }
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }
  { // 대각선 좌상 우하
    let memory = [];
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < board.length; j++) {
        memory.push(
          board[i][j],
          board[i + 1][j + 1],
          board[i + 2][j + 2],
          board[i + 3][j + 3],
          board[i + 4][j + 4]
        );
        if (memory.every(item => item === 1)) {
          return 1;
        }
        if (memory.every(item => item === 2)) {
          return 2;
        }
        memory = [];
      }
    }
  }
  {
    let memory = [];
    for (let i = 0; i < 11; i++) {
      for (let j = 5; j < board.length; j++) {
        memory.push(
          board[i][j],
          board[i + 1][j - 1],
          board[i + 2][j - 2],
          board[i + 3][j - 3],
          board[i + 4][j - 4]
        );
        if (memory.every(item => item === 1)) {
          return 1;
        }
        if (memory.every(item => item === 2)) {
          return 2;
        }
        memory = [];
      }
    }
  }
}

// document ready
document.addEventListener("DOMContentLoaded", () => {
  // 1) html document 가 준비되면 게임을 세팅하는 함수를 호출한다.
  setGame();
});

