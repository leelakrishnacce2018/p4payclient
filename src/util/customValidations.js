export function onlyNumeric(e) {
    //console.log("first method called");
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  export function OnlyAlphabic(e) {
    
    //const re = /[a-zA-Z "'&-><)(\`)+|]+/g;

    const re =/[^0-9~!@#$%^_=*?.,\\;:}{\[\]\}]/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  //does't allow white spaces
  export function OnlyAlphabicW(e) {
    //const re = /[a-zA-Z"'&-><)(\`)+|'\']+/g;
    const re =/[^0-9 ~!@#$%^_=*?.,\\;:}{\[\]\}]/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  export function OnlyalphaNumeric(e) {
    const re = /[0-9a-zA-Z ]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  export function fourthMethod(e) {
    const re = /[a-fA-F]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  export function positionIdKeyPress(e) {
    const re = /[.0-9a-zA-Z]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  export function charactersWithWhiteSpace(e) {
    const re = /[a-zA-Z ]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }



  export function checkMimeType(event){
    //getting file object
    let files = event.target.files 
    //define message container
    let err = ''
    // list allow mime type
   const types = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    // loop access array
    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container   
         err += files[x].type+' is not a supported format\n';
       }
     };
  
   if (err !== '') { // if message not same old that mean has error 
        event.target.value = null // discard selected file
        console.log(err)
         return false; 
    }
   return true;
  
  }

  export function excellValidation(event){
    //getting file object
    var validExts = new Array(".xlsx", ".xls");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      alert("Invalid file selected, valid files are of " +
               validExts.toString() + " types.");
      return false;
    }
    else return true;
  
  }

  export function upperCaseF(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}

// allow special characters for countries
export function OnlyAlphabicuns(e) {
    
  const re = /[a-zA-Z "'&-><)()+|'\']+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}


export function ForOnlyuseName(e) {
    
  const re = /[u-u0-9]/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

//allow characters and numbers
export function OnlyAlphabic2(e) {
    
  //const re = /[a-zA-Z "'&-><)(\`)+|]+/g;

  const re =/[^~!@#$%^_=*?.,\\;:}{\[\]\}]/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}
