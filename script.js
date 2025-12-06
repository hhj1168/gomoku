const BOARD_SIZE = 15;
let board = [];
let currentPlayer = 1; // 1: Black (Human), 2: White (AI or Human)
let gameActive = false;
let lastMove = null;
let gameMode = 'pvp'; // 'pvp' or 'pve'
let aiDifficulty = 'normal'; // 'normal' or 'master'

const boardElement = document.getElementById('board');
const turnText = document.getElementById('turn-text');
const turnIndicator = document.getElementById('turn-indicator');
const winnerDisplay = document.getElementById('winner-display');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');
const modeSelection = document.getElementById('mode-selection');
const gamePanel = document.getElementById('game-panel');
const difficultyPanel = document.getElementById('difficulty-panel');

// Mode selection
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        gameMode = btn.dataset.mode;

        // Show/hide difficulty panel
        if (gameMode === 'pve') {
            difficultyPanel.classList.remove('hidden');
        } else {
            difficultyPanel.classList.add('hidden');
        }
    });
});

// Difficulty selection
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        aiDifficulty = btn.dataset.difficulty;
    });
});

// Start game
startBtn.addEventListener('click', () => {
    modeSelection.classList.add('hidden');
    gamePanel.classList.remove('hidden');
    initGame();
});

// Initialize the game
function initGame() {
    board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    currentPlayer = 1;
    gameActive = true;
    lastMove = null;

    updateStatus();
    renderBoard();
    winnerDisplay.classList.add('hidden');
    winnerDisplay.innerHTML = '';
}

// Render the grid cells
function renderBoard() {
    boardElement.innerHTML = '';
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

// Handle click on a cell
function handleCellClick(e) {
    if (!gameActive) return;

    // In PVE mode, only allow clicks on human's turn
    if (gameMode === 'pve' && currentPlayer === 2) return;

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    if (board[y][x] !== 0) return; // Cell already occupied

    // Place piece
    placePiece(x, y, currentPlayer);

    // Check win
    if (checkWin(x, y, currentPlayer)) {
        endGame(currentPlayer);
    } else if (isBoardFull()) {
        endGame(0); // Draw
    } else {
        // Switch turn
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateStatus();

        // AI turn in PVE mode
        if (gameMode === 'pve' && currentPlayer === 2 && gameActive) {
            setTimeout(() => {
                makeAIMove();
            }, 500); // Small delay for better UX
        }
    }
}

// Visual placement of the piece
function placePiece(x, y, player) {
    board[y][x] = player;
    lastMove = { x, y };

    // Find the cell element
    const index = y * BOARD_SIZE + x;
    const cell = boardElement.children[index];

    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(player === 1 ? 'black' : 'white');

    // Remove previous last-move marker
    const prevLast = document.querySelector('.last-move');
    if (prevLast) prevLast.classList.remove('last-move');

    piece.classList.add('last-move');

    // Animation for placing
    piece.style.transform = 'translate(-50%, -50%) translateZ(50px) scale(1.2)';
    piece.style.opacity = '0';

    cell.appendChild(piece);

    // Trigger reflow for transition
    requestAnimationFrame(() => {
        piece.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        piece.style.transform = 'translate(-50%, -50%) translateZ(2px) scale(1)';
        piece.style.opacity = '1';
    });
}

// Update UI status
function updateStatus() {
    if (gameMode === 'pvp') {
        turnText.textContent = currentPlayer === 1 ? "当前回合: 黑方" : "当前回合: 白方";
    } else {
        turnText.textContent = currentPlayer === 1 ? "当前回合: 玩家" : "当前回合: 电脑";
    }
    turnIndicator.className = 'piece ' + (currentPlayer === 1 ? 'black' : 'white');
}

// Check if board is full
function isBoardFull() {
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0) return false;
        }
    }
    return true;
}

// Check for win condition
function checkWin(x, y, player) {
    const directions = [
        [1, 0],   // Horizontal
        [0, 1],   // Vertical
        [1, 1],   // Diagonal \
        [1, -1]   // Diagonal /
    ];

    for (let [dx, dy] of directions) {
        let count = 1;

        // Check forward
        let i = 1;
        while (true) {
            const nx = x + dx * i;
            const ny = y + dy * i;
            if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE || board[ny][nx] !== player) break;
            count++;
            i++;
        }

        // Check backward
        i = 1;
        while (true) {
            const nx = x - dx * i;
            const ny = y - dy * i;
            if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE || board[ny][nx] !== player) break;
            count++;
            i++;
        }

        if (count >= 5) return true;
    }
    return false;
}

// End Game
function endGame(winner) {
    gameActive = false;
    if (winner === 0) {
        winnerDisplay.innerHTML = `<div class="winner-text">🤝 平局! 🤝</div>`;
    } else {
        let winnerName;
        if (gameMode === 'pvp') {
            winnerName = winner === 1 ? "黑方" : "白方";
        } else {
            winnerName = winner === 1 ? "玩家" : "电脑";
        }
        winnerDisplay.innerHTML = `<div class="winner-text">🎉 ${winnerName} 获胜! 🎉</div>`;
    }
    winnerDisplay.classList.remove('hidden');
    turnText.textContent = "游戏结束";
}

// Restart button
restartBtn.addEventListener('click', () => {
    gamePanel.classList.add('hidden');
    modeSelection.classList.remove('hidden');
});

// ====== AI LOGIC ======

function makeAIMove() {
    if (!gameActive) return;

    let move;
    if (aiDifficulty === 'normal') {
        move = getNormalAIMove();
    } else {
        move = getMasterAIMove();
    }

    if (move) {
        placePiece(move.x, move.y, 2);

        if (checkWin(move.x, move.y, 2)) {
            endGame(2);
        } else if (isBoardFull()) {
            endGame(0);
        } else {
            currentPlayer = 1;
            updateStatus();
        }
    }
}

// Normal AI: Simple strategy
function getNormalAIMove() {
    // 1. Check if AI can win
    let winMove = findWinningMove(2);
    if (winMove) return winMove;

    // 2. Block player's winning move
    let blockMove = findWinningMove(1);
    if (blockMove) return blockMove;

    // 3. Find a good position near existing pieces
    let goodMove = findGoodMove();
    if (goodMove) return goodMove;

    // 4. Random move
    return getRandomMove();
}

// Master AI: Advanced strategy with deeper analysis
function getMasterAIMove() {
    // 1. Immediate win
    let winMove = findWinningMove(2);
    if (winMove) return winMove;

    // 2. Block immediate loss
    let blockMove = findWinningMove(1);
    if (blockMove) return blockMove;

    // 3. Find live four (活四) for AI - guaranteed win in next move
    let liveFour = findLiveFour(2);
    if (liveFour) return liveFour;

    // 4. Block opponent's live four
    let blockLiveFour = findLiveFour(1);
    if (blockLiveFour) return blockLiveFour;

    // 5. Create double live three (双活三) - unstoppable attack
    let doubleLiveThree = findDoubleLiveThree(2);
    if (doubleLiveThree) return doubleLiveThree;

    // 6. Block opponent's double live three
    let blockDoubleLiveThree = findDoubleLiveThree(1);
    if (blockDoubleLiveThree) return blockDoubleLiveThree;

    // 7. Create live three (活三)
    let liveThree = findLiveThree(2);
    if (liveThree) return liveThree;

    // 8. Block opponent's live three with high priority
    let blockLiveThree = findLiveThree(1);
    if (blockLiveThree) return blockLiveThree;

    // 9. Create rush four (冲四) - four with one end blocked
    let rushFour = findRushFour(2);
    if (rushFour) return rushFour;

    // 10. Advanced position evaluation
    return getAdvancedScoredMove();
}

// Find a move that creates a winning line
function findWinningMove(player) {
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0) {
                board[y][x] = player;
                if (checkWin(x, y, player)) {
                    board[y][x] = 0;
                    return { x, y };
                }
                board[y][x] = 0;
            }
        }
    }
    return null;
}

// Find a move that creates double threats (two potential winning lines)
function findDoubleThreatMove(player) {
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0) {
                board[y][x] = player;
                let threats = countThreats(x, y, player);
                board[y][x] = 0;
                if (threats >= 2) {
                    return { x, y };
                }
            }
        }
    }
    return null;
}

// Count how many open-four or active-three patterns this move creates
function countThreats(x, y, player) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    let threatCount = 0;

    for (let [dx, dy] of directions) {
        let count = 1;
        let openEnds = 0;

        // Check forward
        let i = 1;
        while (i <= 4) {
            const nx = x + dx * i;
            const ny = y + dy * i;
            if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE) break;
            if (board[ny][nx] === player) {
                count++;
            } else if (board[ny][nx] === 0) {
                openEnds++;
                break;
            } else {
                break;
            }
            i++;
        }

        // Check backward
        i = 1;
        while (i <= 4) {
            const nx = x - dx * i;
            const ny = y - dy * i;
            if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE) break;
            if (board[ny][nx] === player) {
                count++;
            } else if (board[ny][nx] === 0) {
                openEnds++;
                break;
            } else {
                break;
            }
            i++;
        }

        // Four in a row with at least one open end = threat
        if (count >= 4 && openEnds >= 1) {
            threatCount++;
        }
        // Three in a row with two open ends = threat
        if (count === 3 && openEnds === 2) {
            threatCount++;
        }
    }

    return threatCount;
}

// Find a good position near existing pieces
function findGoodMove() {
    let candidates = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0 && hasAdjacentPiece(x, y)) {
                candidates.push({ x, y });
            }
        }
    }

    if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    return null;
}

// Check if a position has any adjacent pieces
function hasAdjacentPiece(x, y) {
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE) {
                if (board[ny][nx] !== 0) return true;
            }
        }
    }
    return false;
}

// Get best move based on position scoring
function getBestScoredMove() {
    let bestScore = -Infinity;
    let bestMoves = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0 && (hasAdjacentPiece(x, y) || (x === 7 && y === 7))) {
                let score = evaluatePosition(x, y, 2) - evaluatePosition(x, y, 1) * 0.9;

                if (score > bestScore) {
                    bestScore = score;
                    bestMoves = [{ x, y }];
                } else if (score === bestScore) {
                    bestMoves.push({ x, y });
                }
            }
        }
    }

    if (bestMoves.length > 0) {
        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    return getRandomMove();
}

// Evaluate position value for a player
function evaluatePosition(x, y, player) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    let score = 0;

    // Center bonus
    const centerDist = Math.abs(x - 7) + Math.abs(y - 7);
    score += (14 - centerDist) * 2;

    for (let [dx, dy] of directions) {
        let count = 1;
        let openEnds = 0;
        let enemyBlocked = false;

        // Check forward
        let i = 1;
        while (i <= 4) {
            const nx = x + dx * i;
            const ny = y + dy * i;
            if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE) break;
            if (board[ny][nx] === player) {
                count++;
            } else if (board[ny][nx] === 0) {
                openEnds++;
                break;
            } else {
                enemyBlocked = true;
                break;
            }
            i++;
        }

        // Check backward
        i = 1;
        while (i <= 4) {
            const nx = x - dx * i;
            const ny = y - dy * i;
            if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE) break;
            if (board[ny][nx] === player) {
                count++;
            } else if (board[ny][nx] === 0) {
                openEnds++;
                break;
            } else {
                enemyBlocked = true;
                break;
            }
            i++;
        }

        // Score based on pattern
        if (count >= 5) score += 100000;
        else if (count === 4 && openEnds === 2) score += 10000;
        else if (count === 4 && openEnds === 1) score += 1000;
        else if (count === 3 && openEnds === 2) score += 500;
        else if (count === 3 && openEnds === 1) score += 100;
        else if (count === 2 && openEnds === 2) score += 50;
        else if (count === 2 && openEnds === 1) score += 10;
    }

    return score;
}

// Get a random available move
function getRandomMove() {
    let available = [];

    // If board is empty, start near center
    if (lastMove === null) {
        return { x: 7, y: 7 };
    }

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0) {
                available.push({ x, y });
            }
        }
    }

    if (available.length > 0) {
        return available[Math.floor(Math.random() * available.length)];
    }

    return null;
}

// ====== ADVANCED AI FUNCTIONS FOR MASTER DIFFICULTY ======

// Find a live four (活四) - four in a row with both ends open
function findLiveFour(player) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0) {
                board[y][x] = player;

                // Check if this creates a live four
                for (let [dx, dy] of directions) {
                    let pattern = getLinePattern(x, y, dx, dy, player);
                    if (pattern.count === 4 && pattern.openEnds === 2) {
                        board[y][x] = 0;
                        return { x, y };
                    }
                }

                board[y][x] = 0;
            }
        }
    }
    return null;
}

// Find a live three (活三) - three in a row with both ends open
function findLiveThree(player) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    let candidates = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0 && hasAdjacentPiece(x, y)) {
                board[y][x] = player;

                for (let [dx, dy] of directions) {
                    let pattern = getLinePattern(x, y, dx, dy, player);
                    // Three with both ends open, and can extend to live four
                    if (pattern.count === 3 && pattern.openEnds === 2 && pattern.space >= 5) {
                        candidates.push({ x, y, priority: 10 });
                        break;
                    }
                }

                board[y][x] = 0;
            }
        }
    }

    if (candidates.length > 0) {
        candidates.sort((a, b) => b.priority - a.priority);
        return candidates[0];
    }
    return null;
}

// Find double live three (双活三) - creating two live threes at once
function findDoubleLiveThree(player) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0 && hasAdjacentPiece(x, y)) {
                board[y][x] = player;

                let liveThreeCount = 0;
                for (let [dx, dy] of directions) {
                    let pattern = getLinePattern(x, y, dx, dy, player);
                    if (pattern.count === 3 && pattern.openEnds === 2 && pattern.space >= 5) {
                        liveThreeCount++;
                    }
                }

                board[y][x] = 0;

                if (liveThreeCount >= 2) {
                    return { x, y };
                }
            }
        }
    }
    return null;
}

// Find rush four (冲四) - four in a row with one end open
function findRushFour(player) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0 && hasAdjacentPiece(x, y)) {
                board[y][x] = player;

                for (let [dx, dy] of directions) {
                    let pattern = getLinePattern(x, y, dx, dy, player);
                    if (pattern.count === 4 && pattern.openEnds === 1) {
                        board[y][x] = 0;
                        return { x, y };
                    }
                }

                board[y][x] = 0;
            }
        }
    }
    return null;
}

// Get detailed line pattern information
function getLinePattern(x, y, dx, dy, player) {
    let count = 1;
    let openEnds = 0;
    let space = 1;

    // Check forward direction
    let i = 1;
    let forwardSpace = 0;
    while (i <= 5) {
        const nx = x + dx * i;
        const ny = y + dy * i;

        if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE) break;

        if (board[ny][nx] === player) {
            count++;
            forwardSpace++;
        } else if (board[ny][nx] === 0) {
            if (forwardSpace === i - 1) { // Continuous empty space
                openEnds++;
                forwardSpace++;
            }
            break;
        } else {
            break; // Blocked by opponent
        }
        i++;
    }

    // Check backward direction
    i = 1;
    let backwardSpace = 0;
    while (i <= 5) {
        const nx = x - dx * i;
        const ny = y - dy * i;

        if (nx < 0 || nx >= BOARD_SIZE || ny < 0 || ny >= BOARD_SIZE) break;

        if (board[ny][nx] === player) {
            count++;
            backwardSpace++;
        } else if (board[ny][nx] === 0) {
            if (backwardSpace === i - 1) {
                openEnds++;
                backwardSpace++;
            }
            break;
        } else {
            break;
        }
        i++;
    }

    space = count + forwardSpace + backwardSpace;

    return { count, openEnds, space };
}

// Advanced scoring with better pattern recognition
function getAdvancedScoredMove() {
    let bestScore = -Infinity;
    let bestMoves = [];
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (board[y][x] === 0 && (hasAdjacentPiece(x, y) || (x === 7 && y === 7))) {
                let score = 0;

                // Evaluate for AI (player 2)
                board[y][x] = 2;
                score += evaluateAdvancedPosition(x, y, 2, directions) * 1.2;
                board[y][x] = 0;

                // Evaluate blocking opponent (player 1)
                board[y][x] = 1;
                score += evaluateAdvancedPosition(x, y, 1, directions) * 1.0;
                board[y][x] = 0;

                // Center preference
                const centerDist = Math.abs(x - 7) + Math.abs(y - 7);
                score += (14 - centerDist) * 3;

                if (score > bestScore) {
                    bestScore = score;
                    bestMoves = [{ x, y }];
                } else if (score === bestScore) {
                    bestMoves.push({ x, y });
                }
            }
        }
    }

    if (bestMoves.length > 0) {
        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    return getRandomMove();
}

// Advanced position evaluation with pattern recognition
function evaluateAdvancedPosition(x, y, player, directions) {
    let score = 0;

    for (let [dx, dy] of directions) {
        let pattern = getLinePattern(x, y, dx, dy, player);

        // Scoring based on sophisticated pattern analysis
        if (pattern.count >= 5) {
            score += 1000000; // Winning move
        } else if (pattern.count === 4) {
            if (pattern.openEnds === 2) {
                score += 100000; // Live four - guaranteed win
            } else if (pattern.openEnds === 1) {
                score += 10000; // Rush four - strong threat
            }
        } else if (pattern.count === 3) {
            if (pattern.openEnds === 2) {
                score += 5000; // Live three - very strong
            } else if (pattern.openEnds === 1 && pattern.space >= 5) {
                score += 1000; // Sleep three - good potential
            } else if (pattern.openEnds === 1) {
                score += 200;
            }
        } else if (pattern.count === 2) {
            if (pattern.openEnds === 2 && pattern.space >= 5) {
                score += 500; // Live two with space
            } else if (pattern.openEnds === 2) {
                score += 100;
            } else if (pattern.openEnds === 1) {
                score += 20;
            }
        } else if (pattern.count === 1) {
            if (pattern.openEnds === 2 && pattern.space >= 5) {
                score += 10;
            }
        }
    }

    return score;
}

