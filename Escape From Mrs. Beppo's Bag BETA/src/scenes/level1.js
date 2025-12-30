// add src with player, platform, NPC info here

let img_background;
let img_background_pile;
let img_player;
let img_halil;
let img_halil_textbox;
let img_final_object;
let img_floor1;
let img_energy_icon;
let img_HP_icon;
let img_sword;
let img_lvl1_end_text;

let background;
let background_pile;
let floor;
let halil;
let kill_zone;
let halil_textbox;
let final_object;
let lvl1end_text;

let azariel_text;
let img_azariel_text;

let text_tutorial_interact;

let energy_end1;

// plot tutorial (etichetta)
let img_label;
let img_indicator;

let indicator;
let label;


// there is temporary text, will be replaced with textboxes

// Score GUI

let txt_energy;
let energy_icon;

let lives_icon;
let current_HP;

let sword;

function preload(s) {

    img_background = PP.assets.image.load(s, "assets/background_pattern.png");

    img_background_pile = PP.assets.image.load(s,"assets/background_pile1.png");

    img_floor1 = PP.assets.image.load(s, "assets/floor_first.png");

    img_player = PP.assets.sprite.load_spritesheet(s, "assets/player_spritesheet.png", 150, 225);
    img_final_object = PP.assets.sprite.load_spritesheet(s, "assets/final_object.png", 100, 100);
    img_label = PP.assets.image.load(s, "assets/Label_tutorial.png");
    img_indicator = PP.assets.image.load(s, "assets/arrow.png");
    img_azariel_text = PP.assets.image.load(s, "assets/azariel_text.png");

    preload_platforms(s);
    preload_energy (s);
    preload_fall_object(s)

    img_halil = PP.assets.sprite.load_spritesheet(s, "assets/halil_sprite.png",150, 225);
    img_halil_textbox = PP.assets.image.load(s, "assets/halil_textbox.png");

    // GUI
    img_energy_icon = PP.assets.image.load(s, "assets/energy_icon.png");
    img_HP_icon = PP.assets.sprite.load_spritesheet(s, "assets/lives_icon.png", 267, 80);
    img_sword = PP.assets.sprite.load_spritesheet(s, "assets/sword.png", 267, 80);

    img_lvl1_end_text = PP.assets.image.load(s, "assets/end_level1_text.png")
}

function increase_energy() {
  PP.game_state.set_variable("energy", PP.game_state.get_variable("start__energy")+1);
}

function create(s) {

    // the pattern
    background = PP.assets.tilesprite.add(s, img_background, 0, 0, 1280, 800, 0, 0);
      background.tile_geometry.scroll_factor_x = 0;
      background.tile_geometry.scroll_factor_y = 0;
 
    background_pile = PP.assets.tilesprite.add(s, img_background_pile, 0, 0, 10000, 800, 0, 0);
      background_pile.tile_geometry.scroll_factor_x = 0;
      background_pile.tile_geometry.scroll_factor_y = 0.5;
      // Scrolling in update
    
    let layer_player = PP.layers.create(s);

    player = PP.assets.sprite.add(s, img_player, -250, 620, 0.5, 1);
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 
    PP.layers.add_to_layer(layer_player, player);

    PP.layers.set_z_index(layer_player, 2);

    floor = PP.assets.image.add(s, img_floor1, -550, 620, 0, 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC); 
    PP.physics.add_collider(s, player, floor);

    kill_zone = PP.shapes.rectangle_add(s, 640, 900, 9000, 1, "0x000000", 0);
    PP.physics.add(s, kill_zone, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, kill_zone, collision_kill_zone);

    // tutorial label (etichetta) will happen later 
    indicator = PP.assets.image.add(s, img_indicator, 0, 535, 0, 0);
    PP.physics.add(s, indicator, PP.physics.type.STATIC); 
    PP.physics.add_overlap_f(s, player, indicator, collision_first_tutorial);

    // NPC
    halil = PP.assets.sprite.add(s, img_halil, -50, -500, 0.5, 1);
    PP.physics.add(s, halil, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, player, halil, interact_halil);
    PP.assets.sprite.animation_add_list(halil, "idle", [0, 1, 2, 1, 0], 5, -1);
    PP.assets.sprite.animation_play(halil, "idle");
    halil.geometry.flip_x = true;

    //object for next level
    final_object = PP.assets.sprite.add(s, img_final_object, -250, -1450, 0, 0)
      // object position is (+100, -100, 0, 0) with ref. to platform its on
    PP.physics.add(s, final_object, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, player, final_object, end_level1);
    
    configure_player_animations(s);
    create_platforms(s);
    create_energy(s);
    create_energy_balls (s);
    create_fall_object(s, player);

    PP.camera.start_follow(s, player, 0, 220);

    txt_energy = PP.shapes.text_add(s, 110, 50, " ", PP.game_state.get_variable("energy"))
    txt_energy.tile_geometry.scroll_factor_x = 0;
    txt_energy.tile_geometry.scroll_factor_y = 0;

    energy_icon = PP.assets.image.add(s, img_energy_icon, 30, 20, 0, 0);
    energy_icon.tile_geometry.scroll_factor_x = 0;
    energy_icon.tile_geometry.scroll_factor_y = 0;

    PP.game_state.set_variable("energy", 0);

    lives_icon = PP.assets.sprite.add(s, img_HP_icon, 30, 100, 0, 0)
    lives_icon.tile_geometry.scroll_factor_x = 0;
    lives_icon.tile_geometry.scroll_factor_y = 0;
    
    PP.assets.sprite.animation_add(lives_icon, "fullhealth", 0, 0, 5, 0);
    PP.assets.sprite.animation_add(lives_icon, "half health", 1, 1, 5, 0);
    PP.assets.sprite.animation_add(lives_icon, "low health", 2, 2, 5, 0);

    // Animation for health does not work. Different js file for GUI?
    if(PP.game_state.get_variable("HP")== 3){
      PP.assets.sprite.animation_play(lives_icon, "fullhealth");
    }
    if(PP.game_state.get_variable("HP")== 2){
      PP.assets.sprite.animation_play(lives_icon, "half health");
    }
    if(PP.game_state.get_variable("HP")== 1){
      PP.assets.sprite.animation_play(lives_icon, "low health");
    }

    PP.game_state.set_variable("HP", 3);

    // All this is placeholder
    PP.shapes.text_add(s, -400, 340, "Use the arrow keys to move around")
    PP.shapes.text_add(s, 520, 420, "Jump with the SPACEBAR")
    PP.shapes.text_add(s, 1700, 50, "Jump higher with these platforms")
}

function interact_halil(s, player, halil) {
  halil_textbox = PP.assets.image.add(s, img_halil_textbox, 50, -750, 0, 0);
}

// Etichetta
function collision_first_tutorial(s) {
  label = PP.assets.image.add(s, img_label, 0, 200, 0, 0);
  PP.assets.destroy(indicator);
  PP.timers.add_timer(s, 1000, azariel_dialogue, false)
}

function azariel_dialogue(s) {
  azariel_text = PP.assets.image.add(s, img_azariel_text, 250, 300, 0, 0);
  // GUI
  sword = PP.assets.sprite.add(s, img_sword, 1000, 20, 0, 0);
    sword.tile_geometry.scroll_factor_x = 0;
    sword.tile_geometry.scroll_factor_y = 0;
    PP.assets.sprite.animation_add(sword, "start", 0, 0, 5, 0);
    PP.assets.sprite.animation_add(sword, "handle", 1, 1, 5, 0);
    PP.assets.sprite.animation_play(sword, "start");
}

function end_level1(s) {
  // Show the textbox
  PP.timers.add_timer(s, 6000, go_to_level2, false);
  PP.assets.destroy(final_object);
  PP.assets.sprite.animation_play(sword, "handle");
  lvl1end_text= PP.assets.image.add(s, img_lvl1_end_text, -150, -1650, 0, 0)
  // -250, -1450, 0, 0
}

function go_to_level2(s) {
  PP.scenes.start("level2")
  // For scores / GUI
  player_on_level1 = false;
  player_on_level2 = true;
  player_on_level3 = false;
  increase_lvl()
  PP.game_state.set_variable("energy_lvl1", PP.game_state.get_variable("energy"));
}


// Game over screen for kill zone
function collision_kill_zone(s, player, kill_zone) {
            PP.scenes.start("game_over_1");
}

function update(s) {
  background_pile.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.2;

    manage_player_update(s, player);
    update_platforms(s);
    update_fall_object(s);

    PP.shapes.text_change(txt_energy, "energy " + PP.game_state.get_variable("energy"));

    if(collision_energy == true ){ // make variable in energy file
        PP.game_state.set_variable("energy", current + gain);
    }


}



function destroy(s) {

}

PP.scenes.add("level1", preload, create, update, destroy);