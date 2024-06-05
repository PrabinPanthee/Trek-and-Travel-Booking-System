

function bookingValidation(booking) {
 const errors = {}
 const phone = booking.phone.trim();
 const guestSize = parseInt(booking.guestSize);
if (!/^\d{10}$/.test(phone)) {
    errors.phone=('Please enter a valid 10-digit Phone Number');
}
if(booking.bookAt ===""){
    errors.bookAt=('select a date')
}
if (guestSize < 1 || guestSize >= 25 || isNaN(guestSize) || guestSize ==="") {
    errors.guestSize=('Guest Size must be a positive number less than 25');
}
return errors;
}

export default bookingValidation
