function Toxic_Mushrooms2 (num: number) {
    for (let index = 0; index < num; index++) {
        Mushrooms = sprites.create(img`
            . . . . . . b b b b . . . . . . 
            . . . . b b 2 2 2 2 b b . . . . 
            . . . c b 2 2 2 2 1 1 b c . . . 
            . . c b 2 2 2 2 2 1 1 1 b c . . 
            . c c 1 1 1 2 2 2 2 1 1 2 c c . 
            c c 3 1 1 1 2 2 2 2 2 2 2 b c c 
            c b 3 3 1 2 2 2 2 2 1 1 1 b b c 
            c b b b 2 2 1 1 2 2 1 1 3 3 b c 
            c b b b b 3 3 1 1 2 b 3 3 3 b c 
            . c b b b b 3 3 b b b b b b c . 
            . . c c b b b b b b b b c c . . 
            . . . . c c c c c c c c . . . . 
            . . . . . . b 1 1 b . . . . . . 
            . . . . . . b 1 1 b b . . . . . 
            . . . . . b b 7 1 d b . . . . . 
            . . . . . b 7 d 1 1 b . . . . . 
            `, SpriteKind.Enemy)
        Mushrooms.setVelocity(randint(-40, 40), randint(-40, 40))
        Mushrooms.setPosition(randint(0, 10), randint(0, 10))
        Mushrooms.setStayInScreen(true)
        Mushrooms.setBounceOnWall(true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite, effects.hearts, 100)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
    sprites.destroy(Mushrooms, effects.fire, 100)
})
let AllFlowers: Sprite[] = []
let Mushrooms: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
let Gardener = sprites.create(assets.image`myImage`, SpriteKind.Player)
controller.moveSprite(Gardener)
Gardener.setStayInScreen(true)
info.setScore(0)
info.startCountdown(30)
game.splash("You work as a gardener in a mansion, find flowers to beautify the garden!")
game.splash("Remember to keep away from the toxic mushrooms, you don't want to get hurt!")
Toxic_Mushrooms2(game.askForNumber("How many mushrooms?"))
game.onUpdateInterval(5000, function () {
    for (let value of AllFlowers) {
        value.vx = value.vx * -1
    }
})
game.onUpdateInterval(500, function () {
    Gardener = sprites.createProjectileFromSide(assets.image`forestFlowers1`, 50, 0)
    Gardener.setPosition(0, randint(0, 120))
    AllFlowers = sprites.allOfKind(SpriteKind.Projectile)
})
