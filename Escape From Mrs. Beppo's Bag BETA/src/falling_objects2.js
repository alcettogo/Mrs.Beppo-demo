/*

let img_fall_obj_2;
let falling_object_2;

function l2_preload_fall_object(s) {
    //temporary, will change once have a proper spritesheet with all the objects.
    img_fall_obj_2 = PP.assets.sprite.load_spritesheet(s, "assets/fall_obj_2.png", 100, 100);

}

function invulnerability () {
    vulnerable = false;
}

function set_vulnerable () {
    vulnerable = true;
}

function take_damage(s, p1, p2) {
    if(vulnerable == true){
        vulnerable = false;
        PP.game_state.set_variable("HP", PP.game_state.get_variable("HP")-1);
        console.log("damage");
        if(PP.game_state.get_variable("HP")<=0){
            PP.scenes.start("game_over_1")
        }
    PP.timers.add_timer(s, 1000, set_vulnerable, false);
    PP.assets.destroy(falling_object);
    }
} 

// Add GUI here'?????

function object_not_fall() {
    can_object_fall = false
}

function object_fall (s) {
    can_object_fall = true;
    l2_create_fall_object (s, player)
}
// Level 2
function l2_create_fall_object(s, player) {
    if (can_object_fall == true){
    falling_object_2 = PP.assets.sprite.add(s, img_fall_obj_2, 700, -1905, 0.5, 1);
    // for level 2, b4 first platform, b4 1st bounce, during zipper
    PP.physics.add(s, falling_object_2, PP.physics.type.DYNAMIC);
    PP.physics.set_immovable(falling_object_2, true);
    PP.physics.set_allow_gravity(falling_object_2, false);
    PP.physics.add_overlap_f(s, player, falling_object_2, take_damage);
    can_object_fall = false;
    PP.timers.add_timer(s, 7000, object_fall, false)
    }
}

function update_fall_object_2(s) {
    falling_object_2.geometry.y += 8;
}*/