let img_energy;

let energy_x;
let energy_y;

// for values across levels
let energy_end1;
let energy_end2;
let energy_final;

function preload_energy (s) {
    img_energy = PP.assets.image.load(s, "assets/energy_ball_1.png")
}

function create_energy (s) {
    let energy = PP.assets.image.add(s, img_energy, 1230, 200, 0, 0); //1200, 300, 0, 0
        PP.physics.add(s, energy, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, energy, collision_energy);

    let energy_2 = PP.assets.image.add(s, img_energy, 1470, 200, 0, 0);
        PP.physics.add(s, energy_2, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, energy_2, collision_energy);
}

function create_energy_balls(s) {

        let energy = PP.assets.image.add(s, img_energy, 1800, -550, 0, 0); 
        PP.physics.add(s, energy, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, energy, collision_energy);

        let energy_2 = PP.assets.image.add(s, img_energy, 1900, -550, 0, 0);
        PP.physics.add(s, energy_2, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, energy_2, collision_energy);

        let energy_3 = PP.assets.image.add(s, img_energy, 400, -220, 0, 0);
        PP.physics.add(s, energy_3, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, energy_3, collision_energy);

        let energy_4 = PP.assets.image.add(s, img_energy, 510, -220, 0, 0);
        PP.physics.add(s, energy_4, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, energy_4, collision_energy);

        let energy_5 = PP.assets.image.add(s, img_energy, -320, -770, 0, 0);
        PP.physics.add(s, energy_5, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, energy_5, collision_energy);

        let energy_6 = PP.assets.image.add(s, img_energy, -620, -770, 0, 0);
        PP.physics.add(s, energy_6, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, energy_6, collision_energy);
}

function collision_energy(s, player, energy) {

    if (energy.geometry) {
        energy_x = energy.geometry.x;
        energy_y = energy.geometry.y;
    }

    PP.game_state.set_variable("energy", PP.game_state.get_variable("energy")+1);

    PP.assets.destroy(energy);
}


function destroy_energy () {

}
