let img_fall_obj;

let falling_object;

let vulnerable = true;
let can_object_fall = true;

function preload_fall_object(s) {
    img_fall_obj = PP.assets.sprite.load_spritesheet(s, "assets/fall_obj_1.png", 100, 100);
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
        // GUI animations here?
        if(PP.game_state.get_variable("HP")<=0){
            PP.scenes.start("game_over_1")
        }
    PP.timers.add_timer(s, 1000, set_vulnerable, false);
    PP.assets.destroy(falling_object);
    }
}

function object_fall (s) {
    can_object_fall = true;
    create_fall_object (s, player)
}

function create_fall_object(s, player) {
    if (can_object_fall == true){
        falling_object = PP.assets.sprite.add(s, img_fall_obj, 900, -1005, 0.5, 1);
        // for level 1, first platform and before vertical
    PP.physics.add(s, falling_object, PP.physics.type.DYNAMIC);
    PP.physics.set_immovable(falling_object, true);
    PP.physics.set_allow_gravity(falling_object, false);
    PP.physics.add_overlap_f(s, player, falling_object, take_damage);
    can_object_fall = false;
    PP.timers.add_timer(s, 7000, object_fall, false)
    }
}

function update_fall_object(s) {
    falling_object.geometry.y += 8;
}