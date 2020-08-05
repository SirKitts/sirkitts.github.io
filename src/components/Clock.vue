<template>
    <div>{{ time }}</div>
</template>

<script>


export default {
    name: 'clock',
    data: () => ({
        time: ''
    }),
    methods: {
        setAMPM (h) {
            return h >= 12 ? 'pm' : 'am'
        },
        addLeadingZero (num) {
            return (parseInt(num, 10) >= 10 ? '' : '0') + num
        },
        displayTime(hh, mm, ss) {
            const ampm = ' ' + this.setAMPM(hh)
            return  (hh % 12 || 12) + ':' + this.addLeadingZero(mm) + ':' + this.addLeadingZero(ss) + ampm
        },
        updateTime() {
            let d = new Date();
            this.time = this.displayTime(d.getHours(), d.getMinutes(), + d.getSeconds());
        }
    },
    mounted () {
        this.timer = setInterval(this.updateTime, 1000);
    },
    beforeDestroy () {
        clearInterval(this.timer);
    }
}
</script>
