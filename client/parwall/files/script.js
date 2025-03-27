function yyyy() {
    var mydate = new Date()
    mydate.setDate(mydate.getDate());
    var year = mydate.getYear()
    if (year < 1000)
        year += 1900
    return  year + "";
}

