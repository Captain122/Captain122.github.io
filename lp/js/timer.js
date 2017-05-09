function dig(){
        var now = new Date();
        var finDate = new Date("Mar,27,2019 12:25:00 ");
        var totalRemains = (finDate.getTime() - now.getTime());
        if (totalRemains > 1){
            var RemainsSec = (parseInt(totalRemains / 1000));
            var RemainsFullDays = (parseInt(RemainsSec/(24 * 60 * 60)));
            if (RemainsFullDays < 10){
                RemainsFullDays = "0" + RemainsFullDays
            };
            var secInLastDay = RemainsSec-RemainsFullDays * 24 * 3600;
            var RemainsFullHours = (parseInt(secInLastDay / 3600));
            if (RemainsFullHours < 10){
                RemainsFullHours = "0" + RemainsFullHours
            };
            var secInLastHour = secInLastDay - RemainsFullHours * 3600;
            var RemainsMinutes = (parseInt(secInLastHour / 60));
            if (RemainsMinutes < 10){
                RemainsMinutes = "0" + RemainsMinutes
            };
            var lastSec = secInLastHour - RemainsMinutes * 60;
            if (lastSec < 10){
                lastSec = "0" + lastSec
            };
            
           // $(".dig .hours").html(RemainsFullHours);//
            $(".dig .minutes").html(RemainsMinutes);
            $(".dig .seconds").html(lastSec);
        }
        else {
            $(".dig").html("Время вышло.");
        }
    };
    setInterval(dig, 1000);