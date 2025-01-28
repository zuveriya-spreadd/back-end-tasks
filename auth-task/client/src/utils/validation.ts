export function validateForm(email: string, password: string): boolean {
    if (!email || !password ) {
      return false;
    }
  
    if (!email.includes("@") || !email.includes(".")) {
      return false;
    }
  
    if (password.length < 6 || password.length > 12) {
      console.log("Password should be between 6 to 12 characters");
      return false;
    }
  
    return true;
  }
  