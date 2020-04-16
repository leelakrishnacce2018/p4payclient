
//export const API_BASE_URL = 'http://localhost:8082/api';

export const API_BASE_URL = location.protocol+'//'+location.host+'/api'


//export const API_BASE_URL = 'http://192.168.0.97:8080/sam/api'
//export const API_BASE_URL = 'http://192.168.0.14:8080/sam/api';

//client ipaddress
//export const API_BASE_URL = 'http://10.160.15.9:8080/sam/api'

export const ACCESS_TOKEN = 'accessToken';
export const crole = '';


 export const POLL_LIST_SIZE = 30;
export const MAX_CHOICES = 6;
export const POLL_QUESTION_MAX_LENGTH = 140;
export const POLL_CHOICE_MAX_LENGTH = 40;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const colordboarder = {
    borderColor : 'red'
  };
  export const defaultboarder = {
    borderColor : '#e4e6eb'
  };

  
 export  const containerStyle = {
    top: 55
  };

  export const loadertype = "line-scale"       
  export const loaderMsg = "Loading, Please Wait"

export const defaultRegex = /[0-9~!{}\[\]\@#$%^_=*?.,\\;:]/g
export const defaultRegexW = /[0-9~! {}\[\]\@#$%^_=*?.,\\;:]/g

export const onlyChrRegex = /[^u-u0-9]/g


export const spregex = /^[^a-zA-Z0-9]+$/

export const brandColor = '#46beed';

export const defaultStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? 0 : 0,
    borderColor:'#E4E6EB',
    '&:hover': {
      borderColor: '#E4E6EB'
    }
   
  })
};

export const reddefaultStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? 0 : 0,
    borderColor:'red',
    '&:hover': {
      borderColor:'red'
    }
    
  })
};



