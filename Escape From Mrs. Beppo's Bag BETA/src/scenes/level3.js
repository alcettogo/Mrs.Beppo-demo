let img_background_3;
let img_background_pile_3;
let img_player;
let img_linyin;
let img_linyin_textbox;
let img_energy_icon;
let img_HP_icon;
let img_heart;
let img_final_object_3;
let img_lvl3_end_text;

let background_3;
let background_pile_3
let floor;
let kill_zone;
let linyin;
let linyin_textbox;
let final_object_3;
let lvl3end_text;

//GUI

let txt_energy;
let energy_icon;

let lives_icon;
let HP_indicator;

// Missing sword GUI

function preload(s){

    img_background_3 = PP.assets.image.load(s, "assets/background_pattern_3.png");

    img_background_pile_3 = PP.assets.image.load(s,"assets/background_pile3.png");

    img_player = PP.assets.sprite.load_spritesheet(s, "assets/player_spritesheet.png", 150, 225);

  // preload_energy(s); // this also needs a new js file

  img_linyin = PP.assets.sprite.load_spritesheet(s, "assets/linyin_sprite.png", 150, 225);
  img_linyin_textbox = PP.assets.image.load(s,"assets/linyin_textbox.png");

  img_final_object_3 = PP.assets.sprite.load_spritesheet(s, "assets/final_object.png", 100, 100); // BE DIFFERENT
  img_lvl3_end_text = PP.assets.image.load(s, "assets/end_level3_text.png")

  img_energy_icon = PP.assets.image.load(s, "assets/energy_icon.png");
  img_HP_icon = PP.assets.sprite.load_spritesheet(s, "assets/lives_icon.png", 267, 80);

 preload_platforms_3(s); 
  // fall objects in platform

}

function create(s){

    background_3 = PP.assets.tilesprite.add(s, img_background_3, 0, 0, 1280, 800, 0, 0);
      background_3.tile_geometry.scroll_factor_x = 0;
      background_3.tile_geometry.scroll_factor_y = 0;

    background_pile_3 = PP.assets.tilesprite.add(s, img_background_pile_3, 0, 0, 10000, 800, 0, 0);
      background_pile_3.tile_geometry.scroll_factor_x = 0;
      background_pile_3.tile_geometry.scroll_factor_y = 0.5;
      
  player = PP.assets.sprite.add(s, img_player, 150, 620, 0.5, 1);
  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  kill_zone = PP.shapes.rectangle_add(s, 640, 900, 9000, 1, "0x000000", 0);
    PP.physics.add(s, kill_zone, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, kill_zone, collision_kill_zone);

  linyin = PP.assets.sprite.add(s, img_linyin, 500, 620, 0.5, 1);
  PP.physics.add(s, linyin, PP.physics.type.STATIC);
  PP.physics.add_overlap_f(s, player, linyin, interact_linyin);
  PP.assets.sprite.animation_add_list(linyin, "idle", [0, 1, 2, 1, 0], 5, -1);
  PP.assets.sprite.animation_play(linyin, "idle");

  configure_player_animations(s);
  //configure_platform3_animations(s)

  create_platforms_3(s);

  // create_energy_3(s); // no js file yet
    final_object_3 = PP.assets.sprite.add(s, img_final_object_3, -940, -2830, 0, 0)
      // object position is (+100, -100, 0, 0) with ref. to platform its on
    PP.physics.add(s, final_object_3, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, player, final_object_3, end_level3);

  PP.camera.start_follow(s, player, 0, 220);

  // GUI
  lives_icon = PP.assets.sprite.add(s, img_HP_icon, 30, 100, 0, 0)
    lives_icon.tile_geometry.scroll_factor_x = 0;
    lives_icon.tile_geometry.scroll_factor_y = 0;
    
    PP.assets.sprite.animation_add(lives_icon, "fullhealth", 0, 0, 5, 0);
    PP.assets.sprite.animation_add(lives_icon, "half health", 1, 1, 5, 0);
    PP.assets.sprite.animation_add(lives_icon, "low health", 2, 2, 5, 0);

    if(PP.game_state.get_variable("HP")== 3){
      PP.assets.sprite.animation_play(lives_icon, "fullhealth");
    }
    if(PP.game_state.get_variable("HP")== 2){
      PP.assets.sprite.animation_play(lives_icon, "half health");
    }
    if(PP.game_state.get_variable("HP")== 1){
      PP.assets.sprite.animation_play(lives_icon, "low health");
    }

    // change this
  PP.game_state.set_variable("energy", PP.game_state.get_variable("energy_lvl2"))
  PP.game_state.set_variable("HP", 3);

  txt_energy = PP.shapes.text_add(s, 110, 50, " ", PP.game_state.get_variable("energy"))
    txt_energy.tile_geometry.scroll_factor_x = 0;
    txt_energy.tile_geometry.scroll_factor_y = 0;

    energy_icon = PP.assets.image.add(s, img_energy_icon, 30, 20, 0, 0);
    energy_icon.tile_geometry.scroll_factor_x = 0;
    energy_icon.tile_geometry.scroll_factor_y = 0;
}

function interact_linyin(s, player, linyin) {
  linyin_textbox = PP.assets.image.add(s, img_linyin_textbox, 150, 270, 0, 0);
  }

function end_level3(s) {
  // Show the textbox
  PP.timers.add_timer(s, 4000, go_to_level3, false);
  PP.assets.destroy(final_object_3);
  //PP.assets.sprite.animation_play(sword, "hilt");
  lvl3end_text= PP.assets.image.add(s, img_lvl3_end_text, -840, -2030, 0, 0);
} // -940, -2830, 0, 0

function go_to_level3(s) {
  PP.scenes.start("game_over_2") // add js
  // For scores / GUI
  player_on_level1 = false;
  player_on_level2 = false;
  player_on_level3 = false;
  increase_lvl()
  PP.game_state.set_variable("energy_lvl2", PP.game_state.get_variable("energy"));
}

function update(s) {
    background_pile_3.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.2;

  manage_player_update(s, player);
  update_platforms_3(s);
  // update_fall_object(s);

  PP.shapes.text_change(
    txt_energy,
    "energy " + PP.game_state.get_variable("energy")
  );

}

function collision_kill_zone(s, player, kill_zone) {
  PP.scenes.start("game_over_1");

}

function destroy(s) {

}

PP.scenes.add("level3", preload, create, update, destroy);