let tavola1_img;
let tavola2_img;
let tavola3_img;
let next_img;
let back_img;
let play_img;

let tavola1;
let tavola2;
let tavola3;
let next_button;
let back_button;
let play_button

let play;

let show_1 = false;
let show_2 = false;
let show_3 = false;


function preload(s) {
    tavola1_img = PP.assets.image.load(s, "assets/start-menu/tavola1.png"); 
    tavola2_img = PP.assets.image.load(s, "assets/start-menu/tavola2.png"); 
    tavola3_img = PP.assets.image.load(s, "assets/start-menu/tavola3.png"); 
    back_button = PP.assets.image.load(s, "assets/start-menu/back-button.png"); 
    play_button = PP.assets.image.load(s, "assets/start-menu/play-button.png"); 
}

// Need to add A Few things

function go_back (s) {
    PP.scenes.start("main_menu");
}

function go_to_game(s) {
  PP.scenes.start("level1");
}

function create(s) {
    tavola1 = PP.assets.image.add(s, tavola1_img, 0, 0, 0, 0);
    back_button = PP.assets.image.add(s, back_button, 20, 570, 0, 0);
        PP.interactive.mouse.add(back_button,"pointerdown", go_back);
    show_1 = true;
}

function create_2(s) {
    show_2 = true;
    show_1 = false;
}

function create_3 (s) {
    show_3 = true;
    show_2 = false;
}

function update(s) {
    if (show_1 == true && PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) 
        {PP.timers.add_timer(s, 1500, create_2, false)
        tavola2 = PP.assets.image.add(s, tavola2_img, 0, 0, 0, 0);
    }
    if (show_2 == true && PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) 
        {PP.timers.add_timer(s, 1500, create_3, false)
        tavola3 = PP.assets.image.add(s, tavola3_img, 0, 0, 0, 0);
        play = PP.assets.image.add(s, play_button, 930, 200, 0, 0);
        PP.interactive.mouse.add(play,"pointerdown", go_to_game);
    }

}

function destroy(s) {

}

PP.scenes.add("story", preload, create, update, destroy);