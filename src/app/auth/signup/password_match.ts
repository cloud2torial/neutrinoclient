import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        if(!AC.get('password').value||!AC.get('confirmpassword').value){
            return null
        }
       let password = AC.get('password').value;
       let confirmPassword = AC.get('confirmpassword').value;
        if(password != confirmPassword) {
            console.log('false');
            AC.get('confirmpassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            AC.get('confirmpassword').setErrors(null);
        }
    }
}