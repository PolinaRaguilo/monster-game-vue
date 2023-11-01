const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: "",
      logs: [],
    };
  },
  computed: {
    monsterHealthBarWidth() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: `${this.monsterHealth}%` };
    },
    playerHealthBarWidth() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: `${this.playerHealth}%` };
    },
    disableSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      const damageValue = Math.floor(Math.random() * (12 - 5)) + 5;
      this.monsterHealth -= damageValue;
      this.currentRound++;
      this.addLogMessage("player", "attack", damageValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const damageValue = Math.floor(Math.random() * (15 - 8)) + 8;
      this.playerHealth -= damageValue;
      this.addLogMessage("monster", "attack", damageValue);
    },
    specialAttack() {
      const damageValue = Math.floor(Math.random() * (25 - 10)) + 10;
      this.monsterHealth -= damageValue;
      this.addLogMessage("player", "special attack", damageValue);
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = Math.floor(Math.random() * (20 - 8)) + 8;
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
        return;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
    },
    restartHandler() {
      this.winner = "";
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.logs = [];
    },
    surrender() {
      this.playerHealth = 0;
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      const newMessage = {
        id: new Date(),
        author: who,
        action: what,
        value,
      };
      this.logs.unshift(newMessage);
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
});

app.mount("#game");
