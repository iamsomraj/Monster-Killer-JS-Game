const attackValue = 10;
const healValue = attackValue * 2;
const strongAttackValue = attackValue + 7;
const monsterAttackValue = attackValue + 5;

const normalAttackMode = 'Attack';
const strongAttackMode = 'Strong Attack';

const logNormalAttackMode = 'Player Attack';
const logStrongAttackMode = 'Player Strong Attack';
const logHealMode = 'Player Heal';
const logMonsterAttackMode = 'Monster Attack';
const logGameOver = 'Game Over';

let logEntries = [];

function writeToLog(
  event,
  data,
  currentPlayerHealthValue,
  currentMonsterHealthValue
) {
  let logEntry = {
    event: event,
    data: data,
    currentPlayerHealthValue: currentPlayerHealthValue,
    currentMonsterHealthValue: currentMonsterHealthValue
  };
  logEntries.push(logEntry);
}

let userInputHealthValue = parseInt(
  prompt('Enter the maximum health value: ', '100')
);

if (isNaN(userInputHealthValue) || userInputHealthValue <= 0) {
  userInputHealthValue = 100;
}

let maximumHealthValue = userInputHealthValue;

let hasBonusLife = true;

let currentMonsterHealthValue = maximumHealthValue;
let currentPlayerHealthValue = maximumHealthValue;

adjustHealthBars(maximumHealthValue);

function reset() {
  currentMonsterHealthValue = maximumHealthValue;
  currentPlayerHealthValue = maximumHealthValue;
  resetGame(maximumHealthValue);
}

function gameCheck() {
  let initialPlayerHealth = currentPlayerHealthValue;
  let playerDamageDone = dealPlayerDamage(monsterAttackValue);
  currentPlayerHealthValue = currentPlayerHealthValue - playerDamageDone;

  writeToLog(
    logMonsterAttackMode,
    playerDamageDone,
    currentPlayerHealthValue,
    currentMonsterHealthValue
  );

  if (currentPlayerHealthValue <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealthValue = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('Bonus Life saved you!');
  }

  if (currentMonsterHealthValue <= 0 && currentPlayerHealthValue > 0) {
    alert('You win!');
    writeToLog(
      logGameOver,
      "Player Win!",
      currentPlayerHealthValue,
      currentMonsterHealthValue
    );
    reset();
  } else if (currentMonsterHealthValue > 0 && currentPlayerHealthValue <= 0) {
    alert('You Lose!');
    writeToLog(
      logGameOver,
      "Monster Win!",
      currentPlayerHealthValue,
      currentMonsterHealthValue
    );
    reset();
  } else if (currentMonsterHealthValue == 0 && currentPlayerHealthValue == 0) {
    alert('Game Draw!');
    writeToLog(
      logGameOver,
      "Game is drawn!",
      currentPlayerHealthValue,
      currentMonsterHealthValue
    );
    reset();
  }
}

function attackMonster(modeOfAttack) {
  let attackPower;
  let attackMode = 1;
  if (modeOfAttack === normalAttackMode) {
    attackPower = attackValue;
    attackMode = 0;
  } else if (modeOfAttack === strongAttackMode) {
    attackPower = strongAttackValue;
  }

  if (attackMode == 0) {
    attackMode = logNormalAttackMode;
  } else {
    attackMode = logStrongAttackMode;
  }

  let damageDone = dealMonsterDamage(attackPower);
  currentMonsterHealthValue = currentMonsterHealthValue - damageDone;
  writeToLog(
    attackMode,
    damageDone,
    currentPlayerHealthValue,
    currentMonsterHealthValue
  );
}

function attackMonsterHandler() {
  attackMonster(normalAttackMode);
  gameCheck();
}

function strongAttackMonsterHandler() {
  attackMonster(strongAttackMode);
  gameCheck();
}

function healPlayerHandler() {
  let healPower;
  if (currentPlayerHealthValue >= maximumHealthValue - healValue) {
    healPower = maximumHealthValue - currentPlayerHealthValue;
  } else {
    healPower = healValue;
  }
  increasePlayerHealth(healPower);
  currentPlayerHealthValue = currentPlayerHealthValue + healPower;
  writeToLog(
    logHealMode,
    healPower,
    currentPlayerHealthValue,
    currentMonsterHealthValue
  );
  gameCheck();
}

function logHandler() {
  console.log(logEntries);
}

attackBtn.addEventListener('click', attackMonsterHandler);
strongAttackBtn.addEventListener('click', strongAttackMonsterHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', logHandler);
