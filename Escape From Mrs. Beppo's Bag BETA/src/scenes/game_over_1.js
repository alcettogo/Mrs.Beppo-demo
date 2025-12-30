let img_lose_game

let lose_game

function preload(s) {
    img_lose_game = PP.assets.image.load(s, "assets/lost_game.png"); 
}

function create(s) {

    lose_game = PP.assets.image.add(s, img_lose_game, 0, 0, 0, 0);

}

function update(s) {
    if(PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER)) { if (player_on_level1 == true) {
        PP.scenes.start("level1")
    } else if (player_on_level2 == true) {
        PP.scenes.start("level2")
    } else if (player_on_level3 == true){
        PP.scenes.start("level3")
    }
}

}

function destroy(s) {

}

PP.scenes.add("game_over_1", preload, create, update, destroy);