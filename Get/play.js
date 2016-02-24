function Point(x, y) {
        this.x = x;
        this.y = y;
        this.test = function(){
            var z = 5;
        }
        this.dist = function () {
            return Math.sqrt((this.x*this.x)+(this.y*this.y));
        };
        this.toString = function () {
            return "("+this.x+", "+this.y+")";
        };
    }


    var p = new Point(1, 2);
    console.log(p.z);
    p.test();
    console.log(p.z);
//


