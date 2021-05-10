class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null;
    }
    
    addClock (alarmTimeText, callback, id) {
        if (!id) throw new Error('Не передан параметр Id будильника!');
        this.alarmCollection.forEach((entry) => {if (entry.id == id) throw new Error('такой Id будильника уже есть!')});
        this.alarmCollection.push({id: id, time: alarmTimeText, callback: callback});
    }

    removeClock (id) {
        var result = this.alarmCollection.filter(rem => id !== rem.id)
        if (result.length !== this.alarmCollection.length) {
            this.alarmCollection = result;
            return `Будильник c id ${id} удален!`;
        }
        else return `Будильника c id ${id} не существует. Ничего не удалено!`;
    }

    getCurrentFormattedTime () {
        let currenTime = new Date();
        let minutes = currenTime.getMinutes();
        let hours = currenTime.getHours();
        if (minutes < 10) minutes = `0${minutes}`;
        if (hours < 10) hours = `0${hours}`;
        return `${hours}:${minutes}`;
    }
    
    checkClock = (ring) => {
        if (this.getCurrentFormattedTime() == ring.time) return ring.callback();
    }

    start() {
        if (!this.timerId) {
            this.timerId = setInterval( () => {this.alarmCollection.forEach((entry) => this.checkClock(entry))}, 2000);
        }         
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    
    printAlarms() {
        this.alarmCollection.forEach((entry) => {console.log(`Будильник ${entry.id} установлен на ${entry.time}`)});  
    }; 

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}