let credits_img;
let back_img;

let credits;
let back_button;

function preload(s) {
    credits_img = PP.assets.image.load(s, "assets/start-menu/credits.png"); 
    back_button = PP.assets.image.load(s,"assets/start-menu/back-button.png"); 
}

function go_back (s) {
    PP.scenes.start("main_menu");
}

function create(s) {
    credits = PP.assets.image.add(s, credits_img, 0, 0, 0, 0);

    back_button = PP.assets.image.add(s, back_button, -50, 300, 0, 0);
        PP.interactive.mouse.add(back_button,"pointerdown", go_back);
  
}

function update(s) {

}

function destroy(s) {

}

PP.scenes.add("credits", preload, create, update, destroy);