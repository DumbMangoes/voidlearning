logoFont = null


logoHitbox = null

# use await not preload()
setup = ->
    createCanvas 960, 540

    await logoFont = loadFont("assets/bluunext-bold.ttf")
    logoHitbox = new Hitbox("CENTER", "rectangle", width/2, height/2, 100, 100)

draw = ->
    background 25

    logoHitbox.update(width/2, height/2)
    logoHitbox.debug()
    
    fill("white")
    textFont(logoFont)
    textSize(100)
    textAlign(CENTER, MIDDLE)

    text("voidmath", width/2, height/2)
