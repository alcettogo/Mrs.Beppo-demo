let img_win_game1

let win_game1

function preload(s) {
    img_win_game1 = PP.assets.image.load(s, "assets/victory_screen_1.png"); 
}

function create(s) {

    win_game1 = PP.assets.image.add(s, img_win_game1, 0, 0, 0, 0);

}

function update(s) {
    if(PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER)) {
        PP.scenes.start("main_menu")
}

}

function destroy(s) {

}

PP.scenes.add("game_over_2", preload, create, update, destroy);