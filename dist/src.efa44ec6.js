// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
// gameState : 게임과 관련된 상태를 저장하는 객체
var gameState = {
  player: true,
  board: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};

var setGame = function setGame() {
  // 게임의 초기상태를 만드는 함수

  // 1) 상태 업데이트
  // 기본 player 를 'green'로 설정한다.
  gameState.player = true;
  // 기본 board array의 요소를 모두 0 으로 만든다.
  gameState.board.map(function (row, rowIndex) {
    row.map(function (colEl, colIndex) {
      gameState.board[rowIndex][colIndex] = 0;
    });
  });

  // winner 엘리먼트의 클래스를 모두 삭제한다.
  document.getElementById('winner').classList.remove('green');
  document.getElementById('winner').classList.remove('purple');

  // 2) 화면 그리기
  drawGame();
};

var drawGame = function drawGame() {
  // 1) player 상태를 html 에 그려준다.
  document.getElementById('currentPlayer').textContent = gameState.player ? 'green' : 'purple';

  // 2) gameState.board 의 상태를 board element 에 그려준다.
  document.querySelectorAll('.row').forEach(function (rowEl, rowIndex) {
    rowEl.querySelectorAll('.cell').forEach(function (colEl, colIndex) {
      if (gameState.board[rowIndex][colIndex] === 1) {
        colEl.classList.add('green');
      } else if (gameState.board[rowIndex][colIndex] === 2) {
        colEl.classList.add('purple');
      } else if (gameState.board[rowIndex][colIndex] === 0) {
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
};

// grid click event handler: gameState.board 의 상태를 업데이트 하는 이벤트 핸들러
document.querySelectorAll('.row').forEach(function (rowEl, rowIndex) {
  rowEl.querySelectorAll('.cell').forEach(function (colEl, colIndex) {
    colEl.addEventListener('click', function (e) {
      // click eventhandler 를 추가한다.
      console.log('html element click event');
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
document.getElementById('btnReset').addEventListener('click', function (e) {
  document.querySelector('.modal').style.display = 'none';
  setGame();
});

var isWinner = function isWinner(board) {
  console.log('who is winner?');

  // 가로
  for (var i = 0; i < board.length; i++) {
    var currentPlayer = void 0;
    var count = void 0;
    for (var j = 0; j < board.length; j++) {
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
  for (var _i = 0; _i < board.length; _i++) {
    var _currentPlayer = void 0;
    var _count = void 0;
    for (var _j = 0; _j < board.length; _j++) {
      if (_currentPlayer !== board[_j][_i]) {
        _currentPlayer = board[_j][_i];
        _count = 1;
      } else {
        _count++;
      }
      if ((_currentPlayer === 1 || _currentPlayer === 2) && _count === 5) {
        return _currentPlayer;
      }
    }
  }
};

// document ready
document.addEventListener("DOMContentLoaded", function () {
  // 1) html document 가 준비되면 게임을 세팅하는 함수를 호출한다.
  setGame();
});
},{}],26:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '56471' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[26,3], null)
//# sourceMappingURL=/src.efa44ec6.map