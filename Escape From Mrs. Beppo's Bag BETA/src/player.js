// !!! WHEN PLAYER ON VERTICAL PLATFORM, STILL HAVE MOST RECENT ANIMATION

let player;

let player_speed    = 250;
let jump_init_speed = 300;
let floor_height    = 620; // set proper number once platform is placed

// player image/spritesheet is in the levels

// For game over screen and energy
let player_on_level1 = true;
let player_on_level2 = false;
let player_on_level3 = false;


let curr_anim = "stop";
let interaction_start = false;
let end_interaction = false;

function configure_player_animations(s) {
    PP.assets.sprite.animation_add_list(player, "run", [1, 2, 3, 4], 10, -1);
    PP.assets.sprite.animation_add(player, "jump_up", 5, 7, 10, 0); 
    PP.assets.sprite.animation_add(player, "jump_down", 7, 9, 20, 0); 
    PP.assets.sprite.animation_add(player, "stop", 0, 0, 10, 0);
    PP.assets.sprite.animation_play(player, "stop");
}

function manage_player_update(s, player) {
    let next_anim = curr_anim;

    if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
        PP.physics.set_velocity_x(player, + player_speed);
        next_anim = "run";
}
    else if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT) ) {
        PP.physics.set_velocity_x(player, - player_speed);
        next_anim = "run"; }
            else {
        PP.physics.set_velocity_x(player, 0);
        next_anim = "stop";
    }

    if(player.geometry.y>=floor_height-1 || player.is_on_platform) {
        if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE) )  {
            PP.physics.set_velocity_y(player, -jump_init_speed);}
    }


    if(player.is_on_ladder) {
        if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
        PP.physics.set_velocity_x(player, + player_speed);
        // Add "climb" animation

    } else if (PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT) ) {
        PP.physics.set_velocity_x(player, - player_speed);
        next_anim = "run"; }

        if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
        PP.physics.set_velocity_x(player, + player_speed);

    }else if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT) ) {
    PP.physics.set_velocity_x(player, - player_speed);}

        if(PP.interactive.kb.is_key_down(s, PP.key_codes.UP) || PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
    PP.physics.set_velocity_y(player, - player_speed)
        } else if(PP.interactive.kb.is_key_down(s, PP.key_codes.DOWN)) {
    PP.physics.set_velocity_y(player, player_speed)
        }

    }

    

    player.is_on_platform = false;
    player.is_on_ladder = false;

    if(PP.physics.get_velocity_y(player) < 0) {
        next_anim = "jump_up";
    }
    else if(PP.physics.get_velocity_y(player) > 0){
        next_anim = "jump_down"
    }

    if(next_anim != curr_anim) {
        PP.assets.sprite.animation_play(player, next_anim);
        curr_anim = next_anim;
    }

    if (PP.physics.get_velocity_x(player) < 0) {
        player.geometry.flip_x = true;
    }
    else if (PP.physics.get_velocity_x(player) > 0) {
        player.geometry.flip_x = false;
    }

}

function increase_lvl() {
  PP.game_state.set_variable("lvl progression", PP.game_state.get_variable("lvl progression")+1);
  console.log("lvl progressed")
}