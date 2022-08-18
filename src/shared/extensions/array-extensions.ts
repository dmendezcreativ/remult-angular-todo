Array.prototype.remove = function(o) {
    this.splice(this.indexOf(o), 1);
    return this;
}