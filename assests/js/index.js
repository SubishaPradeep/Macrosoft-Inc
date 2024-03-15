const submitBtn = document.getElementById('btn-submit')

const elements ={
    fullName : document.getElementById('full-name'),
    email : document.getElementById('email'),
    userName : document.getElementById('user-name'),
    password : document.getElementById('password'),
    repeatPassword : document.getElementById('repeat-password'),
    policy : document.getElementById('terms-policy'),
}


/**
 * Common method to remove error message
 * @param id - selected id
 * @param  child - child input element 
 */
function removeElement(id , child){
    const error = elements[id].children?.[child]
    if(error){
        elements[id].removeChild(error)
    }
}

/**
 * Method to remove error message for fullname and username
 * @param  e - selected element 
 * @param id - selected id
 */
function validateName(e , id){
    if(e.value  !== ""){
        removeElement(id , 2)
    }
}

/**
 * Method to remove error message for email
 * @param  e - selected element 
 * @param id - selected id
 */
function validateEmail(e , id){
    if(e.value  !== "" && emailvalidation(e.value) ){
        removeElement(id , 2)
    }
}

/**
 * Method to remove error message for password
 * @param  e - selected element 
 * @param id - selected id
 */
function validatePassword(e , id){
    if(e.value  !== "" && e.value.length >= 7 ){
        removeElement(id , 2)
    }
}

/**
 * Method to remove error message for confirm password
 * @param  e - selected element
 * @param id - selected id
 * @param  oldPwdID - previous password field
 */
function validateConfirmPwd(e , id , oldPwdID){
    const oldPwd = elements[id].children[1].value
    if(e.value  !== "" && oldPwd === e.value ){
        removeElement(id , 2)
    }
}

/**
 * Method to remove error message for terms-policy
 * @param  e - selected element 
 * @param id - selected id
 */
function validatePolicy(e , id){
    if(e.checked){
        removeElement(id , 2)
    }
}

/**
 * Method to create error message
 * @param text - error text
 * @param className - custom class name
 * @returns -returns the error element
 */
function createErrorElement(text , className){
    let error = document.createElement("span")
    if(className){
    error.className = className
    }
    error.innerText = text
    return error
}

/**
 * Method to append the error message element
 * @param element - parent formgroup element
 * @param input - child input
 * @param text - error text
 * @returns - returns false if validation fails
 */
const appendError = (element , input , text)=>{
    input.focus();
    const error = element.children?.[2]
    if(!error){
        element.appendChild(createErrorElement(text))
    }else{
        error.innerText = text
    }
    return false;

}

/**
 * Method to check Email pattern
 * @param email - email to validate
 * @returns - true if the email is valid 
 */
const emailvalidation = (mail) =>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return true
    }
    return false
}

const validate = (e) => {
  e.preventDefault();

/**To validate fullname */
  const fullName = elements.fullName
  const inputName = fullName.children[1]
  if (inputName.value === "") {
    return appendError(fullName , inputName , 'Full Name is Mandatory')
  }
/**To validate Email */
  const email = elements.email
  const inputemail = email.children[1]
  if (inputemail.value === "") {
    return appendError(email , inputemail , 'Email is Mandatory')
  }else if(!emailvalidation(inputemail.value)){
    return appendError(email , inputemail , 'Please enter a valid Email')
  }

/**To validate user */
  const userName = elements.userName
  const inputUser = userName.children[1]
  if (inputUser.value === "") {
    return appendError(userName , inputUser , 'User Name is Mandatory')
  }

  /**To validate Password */
  const password = elements.password
  const inputPwd = password.children[1]
  if (inputPwd.value === "") {
    return appendError(password , inputPwd , 'Password is Mandatory')
  }else if(inputPwd.value.length < 8){
    return appendError(password , inputPwd , 'Password Should contain 8 character')
  }

  /**To validate Confirm Password */
  const repeatPassword = elements.repeatPassword
  const inputRepPwd = repeatPassword.children[1]
  if (inputRepPwd.value === "") {
    return appendError(repeatPassword , inputRepPwd , 'Repeat Password is Mandatory')
  }else if(inputPwd.value != inputRepPwd.value){
    return appendError(repeatPassword , inputPwd , 'Both passwords should be same')
  }

  /**To validate Checkbox*/
  const policy = elements.policy
  const inputPolicy = policy.children[0]
  if (!inputPolicy.checked) {
    return appendError(policy , inputPolicy , 'This Field is Mandatory')
  }
  

  /**To display success message*/
  const form = document.getElementById('form')
  form.appendChild(createErrorElement('Form Submitted Successfully' , 'form-error'))
  setTimeout(()=>{
      const formError = document.getElementsByClassName('form-error')?.[0]
      formError.remove()
  } , 2000)
  return true;
}

submitBtn.addEventListener('click', validate);