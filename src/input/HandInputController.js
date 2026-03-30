class HandInputController {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;

    isShooting = false;
    isReloading = false;

    update({ x, y, shoot, reload }) {
        this.x = x;
        this.y = y;
        this.isShooting = shoot;
        this.isReloading = reload;
    }
}

export default new HandInputController();