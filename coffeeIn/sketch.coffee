logoFont = null


logoHitbox = null
mouseHitbox = null

# use await not preload()
setup = ->
    createCanvas 960, 540

    await logoFont = loadFont("assets/bluunext-bold.ttf")
    logoHitbox = new Hitbox("CENTER", "rectangle", width/2, height/2, 585, 80)

    mouseHitbox = new Hitbox("CENTER", "rectangle", width/2, height/2, 1, 1)

draw = ->
    background 25

    mouseHitbox.update(mouseX, mouseY)

    logoHitbox.update(width/2, height/2-10)

    
    fill("white")
    textFont(logoFont)
    textSize(100)
    textAlign(CENTER, MIDDLE)

    text("voidlearning", width/2, height/2)

    if checkCollision(logoHitbox, mouseHitbox)
        cursor(HAND)
    else
        cursor("default")
        
