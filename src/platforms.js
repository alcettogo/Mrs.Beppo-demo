// every platform on level 1 is here
// Platforms will now also have falling objects

let img_platform_1;
let img_platform_2;
let img_platform_3;
let img_platform_5;

let platform_1;
let platform_2;
let platform_3;
let platform_4;
let platform_9;


function preload_platforms(s) {
    img_platform_1 = PP.assets.image.load(s, "assets/platform1.png"); // Regular not moving platforms
    img_platform_2 = PP.assets.image.load(s, "assets/platform2.png"); // Horiziontal Zipper, must add background
    img_platform_3 = PP.assets.image.load(s, "assets/platform3.png"); // Vertical moving platform
    img_platform_5 = PP.assets.image.load(s, "assets/platform5.png"); // Trampoline platform
}
    
function create_platforms(s) {
    // Platforms placed in order of the path that the player is supposed to follow

    // If need to change platform collision hitbox
    //PP.physics.set_collision_rectangle(platform_2, x, y, x, y);

    // Static 
    let platform = PP.assets.image.add(s, img_platform_1, 500, 450, 0, 0);
    PP.physics.add(s, platform, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform, collision_platform);

    // falling object somewhere here

    // Static
    platform_1 = PP.assets.image.add(s, img_platform_1, 1200, 300, 0, 0);
    PP.physics.add(s, platform_1, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_1, collision_platform);

    // Trampoline
    platform_5 = PP.assets.image.add(s, img_platform_5, 1800, 50, 0, 0); 
    PP.physics.add(s, platform_5, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_5, collision_platform_bounce);
    platform_5.geometry.flip_x = true; // in this case
    PP.physics.set_collision_rectangle(platform_5, 200, 70, 0, 130);

    // Static,
    platform_6 = PP.assets.image.add(s, img_platform_1, 900, -195, 0, 0);
    PP.physics.add(s, platform_6, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_6, collision_platform);

    // falling object here too (same one)
    
    // Moving Vertical, goes up to -80
    platform_3 = PP.assets.image.add(s, img_platform_3, 400, -220, 0, 0);
    PP.physics.add(s, platform_3, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(platform_3, true);
    PP.physics.set_allow_gravity(platform_3, false);    
    PP.physics.add_collider_f(s, player, platform_3, collision_platform);
    PP.physics.set_velocity_y(platform_3, 100); // Initial velocity, it will be changed later in update function
    PP.physics.set_collision_rectangle(platform_3, 327, 100, 0, 26);

    // Static, where NPC and Checkpoint are
    platform_interact = PP.assets.image.add(s, img_platform_1, -100, -500, 0, 0);
    PP.physics.add(s, platform_interact, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_interact, collision_platform);

    // Static
    platform_7 = PP.assets.image.add(s, img_platform_1, -650, -670, 0, 0);
    PP.physics.add(s, platform_7, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_7, collision_platform);

    // Trampoline
    platform_8 = PP.assets.image.add(s, img_platform_5, -1050, -1000, 0, 0); 
    PP.physics.add(s, platform_8, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_8, collision_platform_bounce);
    PP.physics.set_collision_rectangle(platform_8, 200, 70, 0, 130);

    // Static Final platform with item
    platform_9 = PP.assets.image.add(s, img_platform_1, -350, -1350, 0, 0);
    PP.physics.add(s, platform_9, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform_9, collision_platform);

    }

        // normal platform collision
    function collision_platform(s, player, platform) {
    if( player.geometry.x >= platform.geometry.x &&
        player.geometry.x <= platform.geometry.x + platform.geometry.display_width) {
            player.is_on_platform = true;
    }
}

        // Bounce platform
    function collision_platform_bounce(s, player, platform_5) {
        if( player.geometry.x >= platform_5.geometry.x &&
        player.geometry.x <= platform_5.geometry.x + platform_5.geometry.display_width) {
            player.is_on_platform = true;
        }
        if(collision_platform_bounce=true){
            PP.physics.set_velocity_y(player, -jump_init_speed*1.5);
        } 
    }


function update_platforms(s) {

    // Moving vertical
    if(platform_3.geometry.y >= -150) {
        PP.physics.set_velocity_y(platform_3, -100);
    }
    else if(platform_3.geometry.y <= -550) {
        PP.physics.set_velocity_y(platform_3, 100);
    }     
}


    

    

    

