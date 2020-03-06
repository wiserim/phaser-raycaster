/**
* @author       Marcin Walczak <mail@marcinwalczak.pl>
* @copyright    2020 Marcin Walczak
* @license      {@link https://github.com/wiserim/phaser-raycaster/blob/master/LICENSE|MIT License}
*/

//set ray
export function setRay(x, y, angle, range = Phaser.Math.MAX_SAFE_INTEGER) {
    this.origin.setTo(x, y);
    this.angle = Phaser.Math.Angle.Normalize(angle);
    this.range = range;

    Phaser.Geom.Line.SetToAngle(this._ray, this.origin.x, this.origin.y, this.angle, this.range);
    this.detectionRangeCircle.setTo(this.origin.x, this.origin.y,this.detectionRange);
    return this;
}
