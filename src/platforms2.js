// ok quindi qua sopra scrivere SEMPRE piattaforme mobili perché deve essere variabile globale

let img_platform_1_lvl2;
let img_platform_2_lvl2;
let img_platform_3_lvl2;
let img_platform_4_lvl2;
let img_platform_5_lvl2;
let img_ladder;

let platform_2_b;
let ladder
let l2_move_h;

let first_touch = false;
let collapsable_platform;

let curr_plat_c = "normal";

function preload_platforms_2(s) {
    img_platform_1_lvl2 = PP.assets.image.load(s, "assets/platform1.png"); // Regular not moving platforms
    img_platform_2_lvl2 = PP.assets.image.load(s, "assets/platform2.png"); // Horiziontal Zipper, must add background
    img_platform_zip_bg = PP.assets.image.load(s, "assets/moving_plat_bg.png"); // Zipper bg
    img_platform_3_lvl2 = PP.assets.image.load(s, "assets/platform3.png"); // Vertical moving platform
    img_platform_4_lvl2 = PP.assets.sprite.load_spritesheet(s, "assets/platform4.png", 288, 144); // Trampoline platform
    img_platform_5_lvl2 = PP.assets.image.load(s, "assets/platform5.png"); // Collapsing platform
    img_ladder_lvl2 = PP.assets.image.load(s, "assets/ladder.png"); // ladder
}

function create_platforms_2(s) {

    // 1) piattaforma su cui cadi subito
    let first_platform_b = PP.assets.image.add(s, img_platform_1_lvl2, 0, 620, 0, 0); // position ok
    PP.physics.add(s, first_platform_b, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, first_platform_b, collision_platform);

    // piattaforma NPC (trigger cutscene)
    let second_platform_b = PP.assets.image.add(s, img_platform_1_lvl2, 373, 620, 0, 0);
    PP.physics.add(s, second_platform_b, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, second_platform_b, collision_platform);

    // Static
    let platform_1_b = PP.assets.image.add(s, img_platform_1_lvl2, 900, 450, 0, 0);
    PP.physics.add(s, platform_1_b, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_1_b, collision_platform);

    let layer_plats = PP.layers.create(s);
    let layer_player = PP.layers.create(s);

    
    // Ladder
    let ladder = PP.assets.image.add(s, img_ladder_lvl2, 1730, -120, 0, 0);
    PP.physics.add(s, ladder, PP.physics.type.STATIC); 
    PP.physics.add_overlap_f(s, player, ladder, collision_ladder);
    PP.physics.set_collision_rectangle(ladder, 150, 488, 60, 0);
    PP.layers.add_to_layer(layer_plats, ladder);
    

    /*
    // Vertical moving platform
    
    platform_2_b = PP.assets.image.add(s, img_platform_3_lvl2, 1600, -100, 0, 0);
    PP.physics.add(s, platform_2_b, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(platform_2_b, true);
    PP.physics.set_allow_gravity(platform_2_b, false);    
    PP.physics.add_collider_f(s, player, platform_2_b, collision_platform);
    PP.physics.set_velocity_y(platform_2_b, 100); // Initial velocity, it will be changed later in update function
    PP.physics.set_collision_rectangle(platform_2_b, 327, 100, 0, 26);
   */ // Add this if no climb animation

    // Static
    let platform_3_b = PP.assets.image.add(s, img_platform_1_lvl2, 1227, -260, 0, 0);
    PP.physics.add(s, platform_3_b, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform_3_b, collision_platform);

    //Collapsable
    create_collapsable_platform (s);

    // Bounce
    platform_4_b = PP.assets.image.add(s, img_platform_5_lvl2, -10, -540, 0, 0); 
    PP.physics.add(s, platform_4_b, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_4_b, collision_platform_bounce_lvl2);
    PP.physics.set_collision_rectangle(platform_4_b, 200, 70, 0, 130);

  // bg zipper platform graphics
    let zipper_bg = PP.assets.image.add(s, img_platform_zip_bg, 300, -900, 0, 0);
  // mobile orizzontale / Zipper
    l2_move_h = PP.assets.image.add(s, img_platform_2_lvl2, 300, -900, 0, 0);
    PP.physics.add(s, l2_move_h, PP.physics.type.DYNAMIC);
    PP.physics.set_immovable(l2_move_h, true);
    PP.physics.set_allow_gravity(l2_move_h, false);
    PP.physics.add_collider_f(s, player, l2_move_h, collision_platform);
    PP.physics.set_velocity_x(l2_move_h, 120);
    PP.layers.add_to_layer(layer_plats, l2_move_h);

    // static
    let platform_5_b = PP.assets.image.add(s, img_platform_1_lvl2, 1425, -1000, 0, 0);
    PP.physics.add(s, platform_5_b, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform_5_b, collision_platform);

    // bounce
    platform_6_b = PP.assets.image.add(s, img_platform_5_lvl2, 2100, -1300, 0, 0); 
    PP.physics.add(s, platform_6_b, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_6_b, collision_platform_bounce_lvl2);
    PP.physics.set_collision_rectangle(platform_6_b, 200, 70, 0, 130);
    platform_6_b.geometry.flip_x = true;

    // collapse
    create_collapsable_platform_b(s);

    // static + end
    let platform_8_b = PP.assets.image.add(s, img_platform_1_lvl2, 905, -1700, 0, 0);
    PP.physics.add(s, platform_8_b, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform_8_b, collision_platform);

    // For graphics, at the end of create
    PP.layers.add_to_layer(layer_player, player);

    PP.layers.set_z_index(layer_plats, 1);
    PP.layers.set_z_index(layer_player, 2);
}

function collision_ladder(s) {
      player.is_on_ladder = true;
}

    function create_collapsable_platform (s){
        platform_4 = PP.assets.sprite.add(s, img_platform_4_lvl2, 460, -340, 0, 0);
        PP.physics.add(s, platform_4, PP.physics.type.STATIC); 
        PP.physics.add_collider_f(s, player, platform_4, collision_breakable_platform);
        first_touch = false;
    }

    function create_collapsable_platform_b (s){
        platform_7_b = PP.assets.sprite.add(s, img_platform_4_lvl2, 1640, -1650, 0, 0);
        PP.physics.add(s, platform_7_b, PP.physics.type.STATIC); 
        PP.physics.add_collider_f(s, player, platform_7_b, collision_breakable_platform_b);
        first_touch = false;
    }


    /*function configure_platform2_animations (s) {
      let next_plat_c = curr_plat_c;

      PP.assets.sprite.animation_add(platform_4, "normal", 0, 0, 10, 0);
      PP.assets.sprite.animation_add(platform_4, "break", 1, 8, 10, 0);
      PP.assets.sprite.animation_play(platform_4, "normal");
    }
      */ // Bro I give up

    
    // breakable platform collision
    function collision_breakable_platform(s, player, platform_4) {
        if( player.geometry.x >= platform_4.geometry.x &&
        player.geometry.x <= platform_4.geometry.x + platform_4.geometry.display_width) {
            player.is_on_platform = true;}
        if(first_touch == false){
                PP.timers.add_timer(s, 500, break_platform, false);
                //PP.timers.add_timer(s, 1, break_platform_animation, false);
                PP.timers.add_timer(s, 2500, create_collapsable_platform, false)
                first_touch = true;
                collapsable_platform = platform_4;
                }
             }

    function collision_breakable_platform_b(s, player, platform_7_b) {
      if( player.geometry.x >= platform_7_b.geometry.x &&
        player.geometry.x <= platform_7_b.geometry.x + platform_7_b.geometry.display_width) {
            player.is_on_platform = true;}
        if(first_touch == false){
                PP.timers.add_timer(s, 500, break_platform, false);
                //PP.timers.add_timer(s, 1, break_platform_animation, false);
                PP.timers.add_timer(s, 2500, create_collapsable_platform_b, false)
                first_touch = true;
                collapsable_platform = platform_7_b;
                }
    }

    function break_platform(s) {
        PP.assets.destroy(collapsable_platform);
    }

    function collision_platform_bounce_lvl2(s, player, platform_4_b) {
        if( player.geometry.x >= platform_4_b.geometry.x &&
        player.geometry.x <= platform_4_b.geometry.x + platform_4_b.geometry.display_width) {
            player.is_on_platform = true;
        }
        if(collision_platform_bounce=true){
            PP.physics.set_velocity_y(player, -jump_init_speed*1.5);
        } 
    }

function update_platforms_2(s) {
  /*
  // vertical 1
  if (platform_2_b.geometry.y >= 420) {
    PP.physics.set_velocity_y(platform_2_b, -100);
  } else if (platform_2_b.geometry.y <= -280) {
    PP.physics.set_velocity_y(platform_2_b, 100);
  }  */

  // zipper horizontal 1
  if (l2_move_h.geometry.x >= 980) {
    PP.physics.set_velocity_x(l2_move_h, -100);
  } else if (l2_move_h.geometry.x <= 240) {
    PP.physics.set_velocity_x(l2_move_h, 100);
  }
}