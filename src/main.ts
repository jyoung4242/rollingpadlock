import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Assets } from "@peasy-lib/peasy-assets";
import { Input } from "@peasy-lib/peasy-input";
import { Chance } from "chance";

const chance = new Chance();

const model = {
  launch: (event: any, model: any) => {
    switch (model.level) {
      case "easy":
        model.combolock.appwidth = 450;
        model.combolock.timeremaining = 50;
        model.combolock.numOfTargets = 3;
        break;
      case "med":
        model.combolock.appwidth = 450;
        model.combolock.numOfTargets = 4;
        model.combolock.timeremaining = 40;
        break;
      case "hard":
        model.combolock.appwidth = 450;
        model.combolock.numOfTargets = 5;
        model.combolock.timeremaining = 30;
        break;
    }
    model.result = "pending...";
    model.combolock.numOfTries.forEach((t: any) => (t.status = true));
    model.combolock.isVisible = !model.combolock.isVisible;
    setTimeout(() => {
      model.combolock.onLoad(model);
    }, 375);
  },
  level: "easy",
  result: "waiting",
  combolock: {
    appwidth: 650,
    isVisible: false,
    isHelpVisible: false,
    showFinalModal: false,
    victoryStatus: "cancelled",
    winningAnswer: 0,
    numOfTries: [
      {
        id: 0,
        status: false,
        get getframe() {
          if (this.status) return -20;
          else return 0;
        },
      },
      {
        id: 1,
        status: false,
        get getframe() {
          if (this.status) return -20;
          else return 0;
        },
      },
      {
        id: 2,
        status: false,
        get getframe() {
          if (this.status) return -20;
          else return 0;
        },
      },
      {
        id: 3,
        status: false,
        get getframe() {
          if (this.status) return -20;
          else return 0;
        },
      },
      {
        id: 4,
        status: false,
        get getframe() {
          if (this.status) return -20;
          else return 0;
        },
      },
      {
        id: 5,
        status: false,
        get getframe() {
          if (this.status) return -20;
          else return 0;
        },
      },
      {
        id: 6,
        status: false,
        get getframe() {
          if (this.status) return -20;
          else return 0;
        },
      },
    ],
    numOfTargets: 3,
    onLoad: () => {
      //reset game defaults
      model.combolock.guessLock = false;
      model.combolock.dials = [];
      model.combolock.numUserGuesses = 0;
      model.combolock.timeIsRunning = false;
      for (let index = 0; index < model.combolock.numOfTargets; index++) {
        model.combolock.dials.push({
          id: index,
          value: 0,
          up: (_e: any, model: any) => {
            checkTime();
            if (model.dial.value == 9) model.dial.value = 0;
            else model.dial.value++;
          },
          down: (_e: any, model: any) => {
            checkTime();
            if (model.dial.value == 0) model.dial.value = 9;
            else model.dial.value--;
          },
        });
      }

      if (model.combolock.numOfTargets == 3) model.combolock.winningAnswer = chance.integer({ max: 999, min: 0 });
      else if (model.combolock.numOfTargets == 4) model.combolock.winningAnswer = chance.integer({ max: 9999, min: 0 });
      else model.combolock.winningAnswer = chance.integer({ max: 99999, min: 0 });
    },
    numUserGuesses: 0,
    dials: <any>[],
    timeremaining: 30,
    timeIsRunning: false,
    get getTimeRemaining() {
      if (model.combolock.timeremaining >= 10) {
        return model.combolock.timeremaining.toString();
      } else {
        let rtrnSTring = model.combolock.timeremaining.toString();
        return rtrnSTring.padStart(2, "0");
      }
    },
    timeHandler: 0,
    showHelp: () => (model.combolock.isHelpVisible = !model.combolock.isHelpVisible),
    closeGame: () => {
      model.combolock.isHelpVisible = false;
      model.combolock.showFinalModal = false;
      model.combolock.isVisible = false;
      clearInterval(model.combolock.timeHandler);

      model.combolock.victoryStatus = "cancelled";
      model.result = "CANCELLED";
    },
    guessLock: false,
    submitGuess: (_e: any, model: any) => {
      if (model.combolock.guessLock) return;
      model.combolock.guessLock = true;
      let newGuess = 0;

      switch (model.combolock.dials.length) {
        case 3:
          newGuess =
            model.combolock.dials[0].value * 100 + model.combolock.dials[1].value * 10 + model.combolock.dials[2].value;
          break;
        case 4:
          newGuess =
            model.combolock.dials[0].value * 1000 +
            model.combolock.dials[1].value * 100 +
            model.combolock.dials[2].value * 10 +
            model.combolock.dials[3].value;
          break;
        case 5:
          newGuess =
            model.combolock.dials[0].value * 10000 +
            model.combolock.dials[1].value * 1000 +
            model.combolock.dials[2].value * 100 +
            model.combolock.dials[3].value * 10 +
            model.combolock.dials[4].value;
          break;
        default:
          break;
      }
      let answer = model.combolock.winningAnswer;
      //test answer

      if (newGuess < answer) {
        flashLo();
      } else if (newGuess > answer) {
        flashHi();
      } else {
        //winning guess
        model.combolock.timeIsRunning = false;
        model.combolock.victoryStatus = "SUCCESS";
        model.combolock.showFinalModal = true;
        setTimeout(() => {
          model.combolock.isHelpVisible = false;
          model.combolock.showFinalModal = false;
          model.combolock.isVisible = false;
          clearInterval(model.combolock.timeHandler);
          model.result = "SUCCESS";
        }, 1500);
      }
    },
    timeCheck: () => {
      if (!model.combolock.timeIsRunning) {
        model.combolock.timeIsRunning = true;
        model.combolock.timeHandler = setInterval(() => {
          if (model.combolock.timeremaining == 0) {
            model.combolock.timeIsRunning = false;
            model.combolock.victoryStatus = "UNSUCCESSFUL";
            model.combolock.showFinalModal = true;
            setTimeout(() => {
              model.combolock.isHelpVisible = false;
              model.combolock.showFinalModal = false;
              model.combolock.isVisible = false;
              model.result = "UNSUCCESSFUL";
            }, 1500);
          } else model.combolock.timeremaining--;
        }, 1000);
      }
    },
    hiLampOn: false,
    loLampOn: false,
    flashHandler: 0,
    flashHi: (onOff: boolean) => {
      if (onOff) {
        model.combolock.flashHandler = setInterval(() => {
          model.combolock.hiLampOn = !model.combolock.hiLampOn;
        }, 200);
      } else {
        clearInterval(model.combolock.flashHandler);
        model.combolock.hiLampOn = false;
      }
    },
    flashLo: (onOff: boolean) => {
      if (onOff) {
        model.combolock.flashHandler = setInterval(() => {
          model.combolock.loLampOn = !model.combolock.loLampOn;
        }, 200);
      } else {
        clearInterval(model.combolock.flashHandler);
        model.combolock.loLampOn = false;
      }
    },
  },
};
const template = `
<div> 
    <div class='controls'> 
        <button \${click@=>launch}> launch minigame</button>
        <select>
            <option \${'easy' ==> level}>Easy</option>
            <option \${'med' ==> level}>Medium</option>
            <option \${'hard' ==> level}>Hard</option>
        </select>
        <input class="result" type="text" readonly \${value<==result}></input>   
    </div>
    <div class="minigame" \${===combolock.isVisible} style="width:\${combolock.appwidth}px">
        <div style="width: 100%;height:10%; "><span class="game_title">COMBONATION LOCK</span></div>
        <div style="width: 100%;height:10%; "><span class="game_subtitle">Find the correct PIN !!!</span></div>
        <div class="pipFlex">
            <div class="pipButtons" \${click@=>combolock.closeGame}>Exit</div>
            <div class="pipButtons" \${click@=>combolock.showHelp}>Help</div>
        </div>
        <div class="timerflex">
            Time Remaining
            <div class="timer">0:\${combolock.getTimeRemaining}</div>
        </div>
        
       

        <div class="gameborder">
              <div class="gamebox">
                <div class="dials" >
                    <div class="dialflex"  data-index="\${dial.$index}" \${dial<=*combolock.dials}>
                      <div class="dialup" \${click@=>dial.up}>UP</div>
                      <div class="dial">\${dial.value}</div>
                      <div class="dialdown" \${click@=>dial.down}>DOWN</div>
                    </div>
                  
              </div>
              <div class="dialControls">
                  <div class="guess">
                      <div class="pipButtons bigbutton" \${click@=>combolock.submitGuess}>Guess</div>
                  </div>
                  <div class="dialLamps">
                      <div class="dialLamp">
                          <div>HIGH</div>
                          <div class="lamp" style="background-position: \${ '-20px' = combolock.hiLampOn }\${ '0px' ! combolock.hiLampOn } 0px;"></div>
                      </div>
                      <div class="dialLamp">
                          <div>LOW</div>
                          <div class="lamp" style="background-position: \${ '-20px' = combolock.loLampOn }\${ '0px' ! combolock.loLampOn } 0px;"></div>
                      </div>                    
                  </div>
              </div>
            </div>
        </div>
        <div class="helpModal" \${===combolock.isHelpVisible}>
          <div class="helpText">
            <p>Instructions: Objective of game is to identify the PIN code before time runs out.</p>
            <p>Controls: left-click on the up/down buttons to change the code, Guess button submits the entry for test</p>
            <p>GamePlay: If the code is too large, the High Lamp blinks, if the code is too small, the Low lamp blinks</p>
            <p>As the game becomes more difficult, you increase the digits availble to decode and reduce time allotted</p>
          </div>
        </div>
        <div class="finalModal" \${===combolock.showFinalModal}>
          <div class="modalText">\${combolock.victoryStatus}</div>
        </div> 
    </div>
</div>
`;

/**
 *  <div class="lampgroup">
            <div class="lamptitle">Number of attempts</div>
            <div class="lampflex">
                <div class='lamp' \${lamp<=*combolock.numOfTries} style="background-position: \${lamp.getframe}px 0px;"></div>
            </div>
        </div>
 */

UI.create(document.body, template, model);

function flashHi() {
  model.combolock.flashHi(true);
  setTimeout(() => {
    model.combolock.flashHi(false);
    model.combolock.guessLock = false;
  }, 1500);
}
function flashLo() {
  model.combolock.flashLo(true);
  setTimeout(() => {
    model.combolock.flashLo(false);
    model.combolock.guessLock = false;
  }, 1500);
}
function checkTime() {
  model.combolock.timeCheck();
}
