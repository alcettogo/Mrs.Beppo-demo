let menu_img;
let story_button;
let play_button;
let credits_button;

let menu;
let story;
let play;
let credits;

function preload(s) {
  
menu_img = PP.assets.image.load(s, "assets/start-menu/start-menu.png"); 
story_button = PP.assets.image.load(s, "assets/start-menu/story-button.png"); 
play_button = PP.assets.image.load(s, "assets/start-menu/play-button.png"); 
credits_button = PP.assets.image.load(s, "assets/start-menu/credits-button.png");
}

function go_to_credits(s) {
  PP.scenes.start("credits");
}

function go_to_story(s) {
  PP.scenes.start("story");
}

function go_to_game(s) {
  PP.scenes.start("level1");
}

function increase_energy() {
  PP.game_state.set_variable("energy", PP.game_state.get_variable("energy")+1);
}

function create(s) {

    
    PP.game_state.set_variable("lvl progression", 0); // increase var is at the end of player.js

  menu = PP.assets.image.add(s, menu_img, 0, 0, 0, 0);

  play = PP.assets.image.add(s, play_button, 150, 240, 0.5, 0);
    PP.interactive.mouse.add(play,"pointerdown", go_to_game);
  story = PP.assets.image.add(s, story_button, 150, 430, 0.5, 0);
    PP.interactive.mouse.add(story,"pointerdown", go_to_story);
  credits = PP.assets.image.add(s, credits_button, 150, 570, 0.5, 0);
    PP.interactive.mouse.add(credits,"pointerdown", go_to_credits);
      
}

function update(s) {

}



function destroy(s) {

}

PP.scenes.add("main_menu", preload, create, update, destroy);