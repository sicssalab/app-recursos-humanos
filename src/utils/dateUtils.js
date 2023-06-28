
const timeEstimation = (date) => {
    var nacimiento = new Date(date)
    var hoy = new Date()

    var tiempoPasado = hoy - nacimiento
    var segs = 1000;
    var mins = segs * 60;
    var hours = mins * 60;
    var days = hours * 24;
    var months = days * 30.416666666666668;
    var years = months * 12;

    //calculo 
    var anos = Math.floor(tiempoPasado / years);

    tiempoPasado = tiempoPasado - (anos * years);
    var meses = Math.floor(tiempoPasado / months)

    tiempoPasado = tiempoPasado - (meses * months);
    var dias = Math.floor(tiempoPasado / days)

    tiempoPasado = tiempoPasado - (dias * days);
    var horas = Math.floor(tiempoPasado / hours)

    tiempoPasado = tiempoPasado - (horas * hours);
    var minutos = Math.floor(tiempoPasado / mins)

    // tiempoPasado = tiempoPasado - (minutos * mins);
    // var segundos = Math.floor(tiempoPasado / segs)

    if(anos > 0 || meses > 1)
        return `Más de un mes`;
    else if (meses == 1)
        return `Un mes${dias == 0 ? ''
        : ` y ${dias == 1 ? "día" : "dias"}`}`;
    else if(dias > 0)
        return `Hace ${dias} ${dias == 1 ? "día" : "dias"}`
    else if (horas < 1 && minutos < 1)
        return `Hace un momento`;
    else if (horas < 1)
        return `Hace ${minutos} ${minutos == 1 ? "minuto" : "minutos"}`
    else
        return `${horas} horas, y ${minutos} ${minutos == 1 ? "minuto" : "minutos"}`
}

const dateUtils = {
    timeEstimation
}

export default dateUtils;