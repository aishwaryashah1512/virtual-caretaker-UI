import * as actionTypes from '../actionTypes';

export const profile_update = (age,gender,systolic,diastolic,sugar,bpresult,sugarresult) => {
    return {
        type: actionTypes.PROFILE_UPDATE,
        age,
        gender,
        systolic,
        diastolic,
        sugar,
        bpresult,
        sugarresult
    };
};

export const cred_update=(username,password)=>{
    
    return{
        type:actionTypes.CRED_UPDATE,
        username:username,
        password:password
    }
}
