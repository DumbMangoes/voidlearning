function clampValue(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

class Hitbox {

    // Initializing class properpopo
    constructor(rectMode, hitboxType, x, y, width/* or diameter */, height) {
        this.type = hitboxType;
        this.x = x;
        this.y = y;
        this.radius = width/2;
        this.width = width;
        this.height = height;
        this.angle = 0
        this.rectMode = rectMode
    }
        
    // Updates the hitbox position
    update(x, y) {
        push() // Do not know the current reason why these are here
        this.x = x;
        this.y = y;
        pop()
    }

    // Shows the shape and position of the hitbox
    debug() {
        fill("rgba(246, 148, 239, 0.25)")
        stroke("black")
        if (this.type === "circle") {
            circle(this.x, this.y, this.radius*2);
        }

        if (this.type === "rectangle") {
            if (this.rectMode === "CENTER") {
                rectMode(CENTER)
            }
            if (this.rectMode === "CORNER") {
                rectMode(CORNER)
            }
                
            rect(this.x, this.y, this.width, this.height);
        }
    }



}

closeX = 0
closeY = 0

function checkCollision(hitbox1, hitbox2) {
    // Circle to circle collision
    if(hitbox1.type === "circle" && hitbox2.type === "circle") {
        return (dist(hitbox1.x, hitbox1.y, hitbox2.x, hitbox2.y) <= hitbox1.radius+hitbox2.radius)
    }

    // Rect to rect collision
    if(hitbox1.type === "rectangle" && hitbox2.type === "rectangle") {
        let r1x = hitbox1.x;
        let r1y = hitbox1.y;
        let r1w = hitbox1.width;
        let r1h = hitbox1.height;
        let r2x = hitbox2.x;
        let r2y = hitbox2.y;
        let r2w = hitbox2.width;
        let r2h = hitbox2.height;

        if (hitbox1.rectMode === "CENTER") {
            r1x = hitbox1.x - hitbox1.width / 2;
            r1y = hitbox1.y - hitbox1.height / 2;
        }
        if (hitbox2.rectMode === "CENTER") {
            r2x = hitbox2.x - hitbox2.width / 2;
            r2y = hitbox2.y - hitbox2.height / 2;
        }

        if (r1x + r1w >= r2x &&
            r1x <= r2x + r2w &&
            r1y + r1h >= r2y &&
            r1y <= r2y + r2h) {
            return true;
        } else {
            return false;
        }
    }

    // Rect to circle collision
    if (hitbox1.type === "rectangle" && hitbox2.type === "circle") {

        // closeX = clamp(hitbox2.x, hitbox1.x, hitbox1.x + hitbox1.width);

        if (hitbox1.rectMode === "CORNER") {
            closeX = clampValue(hitbox2.x, hitbox1.x, hitbox1.x + hitbox1.width);
            closeY = clampValue(hitbox2.y, hitbox1.y, hitbox1.y + hitbox1.height);
            return (dist(hitbox2.x, hitbox2.y, closeX, closeY) < hitbox2.radius)
        }

        if (hitbox1.rectMode === "CENTER") {
            closeX = clampValue(hitbox2.x, hitbox1.x-hitbox1.width/2, hitbox1.x-hitbox1.width/2 + hitbox1.width);
            closeY = clampValue(hitbox2.y, hitbox1.y-hitbox1.height/2, hitbox1.y-hitbox1.height/2 + hitbox1.height);
            return (dist(hitbox2.x, hitbox2.y, closeX, closeY) < hitbox2.radius)
        }
        

    }

    // Rect to circle collision (alt)
    if (hitbox1.type === "circle" && hitbox2.type === "rectangle") {

        if (hitbox2.rectMode === "CORNER") {
            closeX = clampValue(hitbox1.x, hitbox2.x, hitbox2.x + hitbox2.width);
            closeY = clampValue(hitbox1.y, hitbox2.y, hitbox2.y + hitbox2.height);
            return (dist(hitbox1.x, hitbox1.y, closeX, closeY) < hitbox2.radius)
        }

        if (hitbox2.rectMode === "CENTER") {
            closeX = clampValue(hitbox1.x, hitbox2.x-hitbox2.width/2, hitbox2.x-hitbox2.width/2 + hitbox2.width);
            closeY = clampValue(hitbox1.y, hitbox2.y-hitbox2.height/2, hitbox2.y-hitbox2.height/2 + hitbox2.height);
            return (dist(hitbox1.x, hitbox1.y, closeX, closeY) < hitbox2.radius)
        }
        
    }
}