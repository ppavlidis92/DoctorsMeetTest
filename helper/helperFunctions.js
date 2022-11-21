
function RedirectAuthUser(role,res){

    if(role ==='ADMIN'){
            res.render('home', {
                title: 'Welcome Admin',              
                admin: true             
            });
    }else if(role ==='DOCTOR'){
            res.render('home', {
                title: 'Welcome Doctor',              
                admin: true             
            });
    }else if(role ==='SECRETARY'){
            res.render('home', {
                title: 'Welcome Secretary',              
                admin: true             
            });
    }
};

function getGreeceTime(){

	// create Date object for current location
	var date = new Date();

	// convert to milliseconds, add local time zone offset and get UTC time in milliseconds
	var utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

	// time offset for Greece is +12
	var timeOffset = 4;

	// create new Date object for a different timezone using supplied its GMT offset.
	var greeceTime = new Date(utcTime + (3600000 * timeOffset));
    return greeceTime
}

function getGreeceTimeOneYear(){

    var timeOffset = 4;
	var oneYear =new Date(new Date().setFullYear(new Date().getFullYear() + 1))
	var utcTimeOneYear = oneYear.getTime() + (oneYear.getTimezoneOffset() * 60000);
	var greeceTimeOneYear = new Date(utcTimeOneYear + (3600000 * timeOffset));
    return greeceTimeOneYear
}


//name the functions you export
module.exports = { RedirectAuthUser,getGreeceTime,getGreeceTimeOneYear };
