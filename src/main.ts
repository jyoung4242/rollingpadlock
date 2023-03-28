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
        model.combolock.numOfTargets = 3;
        break;
      case "med":
        model.combolock.appwidth = 450;
        model.combolock.numOfTargets = 4;
        break;
      case "hard":
        model.combolock.appwidth = 450;
        model.combolock.numOfTargets = 5;
        break;
    }
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
    onLoad: () => {},
    timeremaining: 30,
    showHelp: () => {},
    closeGame: () => {},
    submitGuess: () => {},
    hiLampOn: true,
    loLampOn: false,
    flashHandler: 0,
    flashHi: (onOff: boolean) => {
      if (onOff) {
        model.combolock.flashHandler = setInterval(() => {
          model.combolock.hiLampOn = !model.combolock.hiLampOn;
        }, 200);
      } else {
        clearInterval(model.combolock.flashHandler);
      }
    },
    flashLo: (onOff: boolean) => {
      if (onOff) {
        model.combolock.flashHandler = setInterval(() => {
          model.combolock.loLampOn = !model.combolock.loLampOn;
        }, 200);
      } else {
        clearInterval(model.combolock.flashHandler);
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
            <div class="timer">0:\${combolock.timeremaining}</div>
        </div>
        
        <div class="lampgroup">
            <div class="lamptitle">Number of attempts</div>
            <div class="lampflex">
                <div class='lamp' \${lamp<=*combolock.numOfTries} style="background-position: \${lamp.getframe}px 0px;"></div>
            </div>
        </div>

        <div class="gameborder">
                    <div class="gamebox">
                        <div class="dials">
                        <div class="dialflex">
                        <div class="dialup">UP</div>
                        <div class="dial">0</div>
                        <div class="dialdown">DOWN</div>
                    </div>
                    <div class="dialflex">
                        <div class="dialup">UP</div>
                        <div class="dial">0</div>
                        <div class="dialdown">DOWN</div>
                    </div>
                    <div class="dialflex">
                        <div class="dialup">UP</div>
                        <div class="dial">0</div>
                        <div class="dialdown">DOWN</div>
                    </div>
                    <div class="dialflex">
                        <div class="dialup">UP</div>
                        <div class="dial">0</div>
                        <div class="dialdown">DOWN</div>
                    </div>
                    <div class="dialflex">
                        <div class="dialup">UP</div>
                        <div class="dial">0</div>
                        <div class="dialdown">DOWN</div>
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
        


    </div>
    
</div>`;
UI.create(document.body, template, model);
