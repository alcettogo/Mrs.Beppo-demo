let img_platform_1_lvl3;
let img_platform_2_lvl3;
let img_platform_3_lvl3;
let img_platform_4_lvl3;
let img_platform_5_lvl3;
let img_ladder_lvl3;

let ladder_lvl3;
let platform_11_c;


function preload_platforms_3(s) {
    img_platform_1_lvl3 = PP.assets.image.load(s, "assets/platform1.png"); // Regular not moving platforms
    img_platform_2_lvl3 = PP.assets.image.load(s, "assets/platform2.png"); // Horiziontal Zipper, must add background
    img_platform_zip_bg = PP.assets.image.load(s, "assets/moving_plat_bg.png"); // Zipper bg
    img_platform_3_lvl3 = PP.assets.image.load(s, "assets/platform3.png"); // Vertical moving platform
    img_platform_4_lvl3 = PP.assets.sprite.load_spritesheet(s, "assets/platform4.png", 288, 144); // Trampoline platform
    img_platform_5_lvl3 = PP.assets.image.load(s, "assets/platform5.png"); // Collapsing platform
    img_ladder_lvl3 = PP.assets.image.load(s, "assets/ladder.png"); // ladder
}

function create_platforms_3(s) {

    // 1) piattaforma su cui cadi subito
    let first_platform_c = PP.assets.image.add(s, img_platform_1_lvl3, 0, 620, 0, 0); // position ok
    PP.physics.add(s, first_platform_c, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, first_platform_c, collision_platform);

    // piattaforma NPC (trigger cutscene)
    let second_platform_c = PP.assets.image.add(s, img_platform_1_lvl3, 373, 620, 0, 0);
    PP.physics.add(s, second_platform_c, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, second_platform_c, collision_platform);

    // remember to add create_collaps. etc function for those

    // collapse (3)
    // 900, 450, 0, 0
    create_collapsable_platform_c (s);

    // ladder (4)

    let ladder = PP.assets.image.add(s, img_ladder_lvl3, 1730, -120, 0, 0);
    PP.physics.add(s, ladder, PP.physics.type.STATIC); 
    PP.physics.add_overlap_f(s, player, ladder, collision_ladder);
    PP.physics.set_collision_rectangle(ladder, 150, 488, 60, 0);
    //PP.layers.add_to_layer(layer_plats, ladder);

    // collapse (5)
    // 1227, -260, 0, 0
    create_collapsable_platform_d (s);

    // bounce (6)
    platform_6_c = PP.assets.image.add(s, img_platform_5_lvl3, 620, -440, 0, 0);
    PP.physics.add(s, platform_6_c, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_6_c, collision_platform_bounce_lvl3);
    PP.physics.set_collision_rectangle(platform_6_c, 200, 70, 0, 130);

    // collapse (7)
    // -80, -760, 0, 0
    create_collapsable_platform_e (s);

    // bounce (8)
    platform_8_c = PP.assets.image.add(s, img_platform_5_lvl3, -730, -960, 0, 0);
    PP.physics.add(s, platform_8_c, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_8_c, collision_platform_bounce_lvl3);
    PP.physics.set_collision_rectangle(platform_8_c, 200, 70, 0, 130);

    // static (9) 
    platform_9_c = PP.assets.image.add(s, img_platform_1_lvl3, 0, -1320, 0, 0);
    PP.physics.add(s, platform_9_c, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform_9_c, collision_platform);

    // zipper 10
    let zipper_bg = PP.assets.image.add(s, img_platform_zip_bg, 700, -1500, 0, 0);
  // mobile orizzontale / Zipper
    platform_10_c = PP.assets.image.add(s, img_platform_2_lvl3, 700, -1500, 0, 0);
    PP.physics.add(s, platform_10_c, PP.physics.type.DYNAMIC);
    PP.physics.set_immovable(platform_10_c, true);
    PP.physics.set_allow_gravity(platform_10_c, false);
    PP.physics.add_collider_f(s, player, platform_10_c, collision_platform);
    PP.physics.set_velocity_x(platform_10_c, 100);
    //PP.layers.add_to_layer(layer_plats, platform_10_c);

    // moving vertical 11
    platform_11_c = PP.assets.image.add(s, img_platform_3_lvl3, 1800, -2240, 0, 0);
    PP.physics.add(s, platform_11_c, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(platform_11_c, true);
    PP.physics.set_allow_gravity(platform_11_c, false);    
    PP.physics.add_collider_f(s, player, platform_11_c, collision_platform);
    PP.physics.set_velocity_y(platform_11_c, 100);
    PP.physics.set_collision_rectangle(platform_11_c, 327, 100, 0, 26);

    // collapse 12
    // 1300, -2360, 0, 0
    create_collapsable_platform_f(s);

    // static 13
    platform_13_c = PP.assets.image.add(s, img_platform_1_lvl3, 700, -2520, 0, 0);
    PP.physics.add(s, platform_13_c, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform_13_c, collision_platform);

    // zipper 14
    let zipper_bg_2 = PP.assets.image.add(s, img_platform_zip_bg, -420, -2650, 0, 0);
  // mobile orizzontale / Zipper
    platform_14_c = PP.assets.image.add(s, img_platform_2_lvl3, -420, -2650, 0, 0);
    PP.physics.add(s, platform_14_c, PP.physics.type.DYNAMIC);
    PP.physics.set_immovable(platform_14_c, true);
    PP.physics.set_allow_gravity(platform_14_c, false);
    PP.physics.add_collider_f(s, player, platform_14_c, collision_platform);
    PP.physics.set_velocity_x(platform_14_c, 100);
    //PP.layers.add_to_layer(layer_plats, platform_14_c);

    // static (item)
    platform_16_c = PP.assets.image.add(s, img_platform_1_lvl3, -1040, -2730, 0, 0);
    PP.physics.add(s, platform_16_c, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, platform_16_c, collision_platform);
}

function collision_ladder(s) {
      player.is_on_ladder = true;
}

   function create_collapsable_platform_c (s){
        platform_3_c = PP.assets.sprite.add(s, img_platform_4_lvl3, 900, 450, 0, 0);
        PP.physics.add(s, platform_3_c, PP.physics.type.STATIC); 
        PP.physics.add_collider_f(s, player, platform_3_c, collision_breakable_platform_c);
        first_touch = false;
    }

    function create_collapsable_platform_d (s){
        platform_5_c = PP.assets.sprite.add(s, img_platform_4_lvl3, 1227, -260, 0, 0);
        PP.physics.add(s, platform_5_c, PP.physics.type.STATIC); 
        PP.physics.add_collider_f(s, player, platform_5_c, collision_breakable_platform_d);
        first_touch = false;
    }

    function create_collapsable_platform_e (s){
        platform_7_c = PP.assets.sprite.add(s, img_platform_4_lvl3, -80, -760, 0, 0);
        PP.physics.add(s, platform_7_c, PP.physics.type.STATIC); 
        PP.physics.add_collider_f(s, player, platform_7_c, collision_breakable_platform_e);
        first_touch = false;
    }

    function create_collapsable_platform_f (s){
        platform_12_c = PP.assets.sprite.add(s, img_platform_4_lvl3, 1300, -2360, 0, 0);
        PP.physics.add(s, platform_12_c, PP.physics.type.STATIC); 
        PP.physics.add_collider_f(s, player, platform_12_c, collision_breakable_platform_f);
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
    function collision_breakable_platform_c(s, player, platform_3_c) {
        if( player.geometry.x >= platform_3_c.geometry.x &&
        player.geometry.x <= platform_3_c.geometry.x + platform_3_c.geometry.display_width) {
            player.is_on_platform = true;}
        if(first_touch == false){
                PP.timers.add_timer(s, 500, break_platform, false);
                //PP.timers.add_timer(s, 1, break_platform_animation, false);
                PP.timers.add_timer(s, 2500, create_collapsable_platform_c, false)
                first_touch = true;
                collapsable_platform = platform_3_c;
                }
             }

    function collision_breakable_platform_d(s, player, platform_5_c) {
      if( player.geometry.x >= platform_5_c.geometry.x &&
        player.geometry.x <= platform_5_c.geometry.x + platform_5_c.geometry.display_width) {
            player.is_on_platform = true;}
        if(first_touch == false){
                PP.timers.add_timer(s, 500, break_platform, false);
                //PP.timers.add_timer(s, 1, break_platform_animation, false);
                PP.timers.add_timer(s, 2500, create_collapsable_platform_d, false)
                first_touch = true;
                collapsable_platform = platform_5_c;
                }
    }

    function collision_breakable_platform_e(s, player, platform_7_c) {
      if( player.geometry.x >= platform_7_c.geometry.x &&
        player.geometry.x <= platform_7_c.geometry.x + platform_7_c.geometry.display_width) {
            player.is_on_platform = true;}
        if(first_touch == false){
                PP.timers.add_timer(s, 500, break_platform, false);
                //PP.timers.add_timer(s, 1, break_platform_animation, false);
                PP.timers.add_timer(s, 2500, create_collapsable_platform_e, false)
                first_touch = true;
                collapsable_platform = platform_7_c;
                }
    }

    function collision_breakable_platform_f(s, player, platform_12_c) {
      if( player.geometry.x >= platform_12_c.geometry.x &&
        player.geometry.x <= platform_12_c.geometry.x + platform_12_c.geometry.display_width) {
            player.is_on_platform = true;}
        if(first_touch == false){
                PP.timers.add_timer(s, 500, break_platform, false);
                //PP.timers.add_timer(s, 1, break_platform_animation, false);
                PP.timers.add_timer(s, 2500, create_collapsable_platform_f, false)
                first_touch = true;
                collapsable_platform = platform_12_c;
                }
    }

    function break_platform(s) {
        PP.assets.destroy(collapsable_platform);
    }

    
    function collision_platform_bounce_lvl3(s, player, platform_6_c) {
        if( player.geometry.x >= platform_6_c.geometry.x &&
        player.geometry.x <= platform_6_c.geometry.x + platform_6_c.geometry.display_width) {
            player.is_on_platform = true;
        }
        if(collision_platform_bounce=true){
            PP.physics.set_velocity_y(player, -jump_init_speed*1.5);
        } 
    }
        

function update_platforms_3(s) {

  // zipper 1
  if (platform_10_c.geometry.x >= 1440) {
    PP.physics.set_velocity_x(platform_10_c, -100);
  } else if (platform_10_c.geometry.x <= 700) {
    PP.physics.set_velocity_x(platform_10_c, 100);
  }

  // vertical 1
  if (platform_11_c.geometry.y >= -1700) { 
    PP.physics.set_velocity_y(platform_11_c, -82);
  } else if (platform_11_c.geometry.y <= -2360) {
    PP.physics.set_velocity_y(platform_11_c, 82);
  } 

  // zipper 2
  if (platform_14_c.geometry.x >= 360) {
    PP.physics.set_velocity_x(platform_14_c, -100);
  } else if (platform_14_c.geometry.x <= -420) {
    PP.physics.set_velocity_x(platform_14_c, 100);
  }
}