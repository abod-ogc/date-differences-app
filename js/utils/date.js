function calcDiff(startDate, endDate, inclusive = false) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (inclusive)
        end.setDate(end.getDate() + 1);

    const totalMilliseconds = end - start;
    const seconds = Math.floor(totalMilliseconds / 1000);
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        months--;

        const previousMonth = new Date(
            end.getFullYear(),
            end.getMonth(),
            0
        ).getDate();

        days += previousMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return {
        seconds,
        totalDays,
        weeks,
        years,
        months,
        days
    };
}

function formatDate(date){
    if(!date)
        return null;
    
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });
}

function setDate(date){
    const [year, month, day] = date.split("-");
    return new Date(year, month - 1, day);
}

function isFutureDate(date){
    return date > new Date();
}

const dateUtil = {
    calcDiff,
    formatDate,
    setDate,
    isFutureDate
}

export default dateUtil;