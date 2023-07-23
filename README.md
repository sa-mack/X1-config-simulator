This is a ship configuration simulator for Space Traders. Start with a frame, then swap engines and reactors and attach mounts and modules while keeping an eye on the power/crew requirements of your selections.

SpaceTraders is a space exploration and mining game that you interact with via a REST API. Also described as "headless fleet management." Some players are making GUIs, others are running scripts or console apps. As a mining script player, I wanted a way to design a hypothetical fleet that was more pleasant than staring at JSON. As SpaceTraders is still under development, these are hypothetical ship configurations until we can swap parts other than mounts.

Buggy: if a module occupies more than one slot, you will not be able to select anything from the subsequent selection menus as the module is (invisibly) occupying them. If you then click on those unclickable dropdowns a bunch you might break something. Toggle a frame to start over, or just be very deliberate when attaching multislot modules.

TODO
- Add buttons to start with a default ship configuration (ORE_HOUND, HEAVY_FREIGHTER, etc).
- Better handling of multislot module attachment

Will make the improvements when this stuff is fully implemented in-game.

Need data for:

MOUNT_GAS_SIPHON_I
MOUNT_GAS_SIPHON_II
MOUNT_SENSOR_ARRAY_I	
MOUNT_SENSOR_ARRAY_III
MOUNT_MISSILE_LAUNCHER_I	
MOUNT_TURRET_I

MODULE_MICRO_REFINERY_I
MODULE_FUEL_REFINERY_I
MODULE_JUMP_DRIVE_II
MODULE_JUMP_DRIVE_III
MODULE_WARP_DRIVE_III
MODULE_SHIELD_GENERATOR_II

FRAME_RACER
FRAME_CARRIER
FRAME_CRUISER
FRAME_DESTROYER
FRAME_FIGHTER
FRAME_TRANSPORT

ENGINE_HYPER_DRIVE_I
REACTOR_ANTIMATTER_I